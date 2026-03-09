import { useMemo, useState, useCallback, useEffect } from 'react'
import Keyboard, { DotMode } from './components/Keyboard'
import GuessInput from './components/GuessInput'
import GameOver from './components/GameOver'
import { pickChallengeWord, pickDailyWord } from './data/words'
import { daysSinceEpochLocal, getLocalDateKey, getLocalYesterdayKey } from './utils/dailyWord'
import { loadProgress, saveProgress } from './utils/progress'
import { applySolveToStreak, loadStreak, saveStreak } from './utils/streak'
import './App.css'

const MAX_ATTEMPTS = 3

const DOT_OPTIONS: { value: DotMode; label: string }[] = [
  { value: 'first', label: 'First dot' },
  { value: 'last', label: 'Last dot' },
  { value: 'first-last', label: 'Both dots' },
  { value: 'none', label: 'No dots' },
]

const STREAK_PREFIX = 'kg:'
const DEV_STREAK_PREFIX = 'kg:dev:'
const PROGRESS_KEY_PREFIX = 'progress:'
const DEV_PROGRESS_KEY = 'progress'

function isDevMode(): boolean {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  const value = params.get('dev')
  return value === '1' || value === 'true'
}

function pickWordForMode(devMode: boolean): string {
  if (devMode) return pickChallengeWord()
  const dayIndex = daysSinceEpochLocal()
  return pickDailyWord(dayIndex)
}

export default function App() {
  const devMode = useMemo(() => isDevMode(), [])
  const todayKey = useMemo(() => getLocalDateKey(), [])
  const progressPrefix = devMode ? DEV_STREAK_PREFIX : STREAK_PREFIX
  const progressKey = devMode ? DEV_PROGRESS_KEY : `${PROGRESS_KEY_PREFIX}${todayKey}`
  const initialProgress = useMemo(
    () => loadProgress(progressPrefix, progressKey),
    [progressPrefix, progressKey],
  )

  const [word, setWord] = useState(() => {
    if (devMode && initialProgress?.word) return initialProgress.word
    return pickWordForMode(devMode)
  })
  const [attempts, setAttempts] = useState<string[]>(() => initialProgress?.attempts ?? [])
  const [solved, setSolved] = useState(() => initialProgress?.solved ?? false)
  const [dotMode, setDotMode] = useState<DotMode>(devMode ? 'first-last' : 'none')
  const [guess, setGuess] = useState<string[]>([])
  const [streakMessage, setStreakMessage] = useState<string | null>(null)
  const [showIntro, setShowIntro] = useState(true)

  const gameOver = !devMode && !solved && attempts.length >= MAX_ATTEMPTS
  const remaining = MAX_ATTEMPTS - attempts.length

  useEffect(() => {
    saveProgress(progressPrefix, progressKey, {
      word,
      attempts,
      solved,
    })
  }, [progressPrefix, progressKey, word, attempts, solved])

  const handleGuess = useCallback(
    (fullGuess: string) => {
      if (fullGuess === word) {
        setSolved(true)
        const prefix = devMode ? DEV_STREAK_PREFIX : STREAK_PREFIX
        const todayKey = getLocalDateKey()
        const yesterdayKey = getLocalYesterdayKey()
        const current = loadStreak(prefix)
        const next = applySolveToStreak(current, todayKey, yesterdayKey)
        saveStreak(prefix, next)
        setStreakMessage(`You've added to your ${next.currentStreak}-day streak.`)
      } else {
        setAttempts((prev) => [...prev, fullGuess])
      }
    },
    [devMode, word],
  )

  const handleRestart = useCallback(() => {
    if (!devMode) return
    setWord(pickChallengeWord())
    setAttempts([])
    setSolved(false)
    setGuess([])
    setStreakMessage(null)
  }, [devMode])

  const handleCloseIntro = useCallback(() => {
    setShowIntro(false)
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>Keyboard Game</h1>
        {!solved && !gameOver && !devMode && (
          <span className="attempts-badge">
            {remaining} / {MAX_ATTEMPTS}
          </span>
        )}
        {devMode && <span className="attempts-badge">DEV MODE</span>}
      </header>

      <Keyboard word={word} dotMode={devMode ? dotMode : 'none'} />

      {devMode && (
        <div className="dot-options">
          {DOT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`dot-option-btn${dotMode === opt.value ? ' active' : ''}`}
              onClick={() => setDotMode(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {attempts.length > 0 && (
        <div className="attempts-history">
          {attempts.map((attempt, i) => (
            <div key={i} className="history-row">
              {word.split('').map((ch, j) =>
                ch === ' ' ? (
                  <span key={j} className="history-slot-space" />
                ) : (
                  <span key={j} className="history-slot">
                    {attempt[j]}
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      )}

      {gameOver ? (
        <GameOver correctWord={word} attemptsUsed={attempts.length} onRestart={handleRestart} canRestart={devMode} />
      ) : solved ? (
        <div className="solved-feedback">
          <p>
            Correct! Got it in {attempts.length + 1}{' '}
            {attempts.length + 1 === 1 ? 'try' : 'tries'}!
          </p>
          {devMode ? (
            <button className="restart-button" onClick={handleRestart}>
              Play Again
            </button>
          ) : (
            <p className="streak-next">Come back tomorrow for a new puzzle.</p>
          )}
        </div>
      ) : (
        <GuessInput
          onGuess={handleGuess}
          disabled={false}
          wordTemplate={word}
          slots={guess}
          onSlotsChange={setGuess}
        />
      )}

      {streakMessage && (
        <div className="streak-modal-backdrop" role="dialog" aria-live="polite">
          <div className="streak-modal">
            <h2>Streak Updated</h2>
            <p>{streakMessage}</p>
            <button className="streak-close" onClick={() => setStreakMessage(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {showIntro && (
        <div className="intro-modal-backdrop" role="dialog" aria-live="polite">
          <div className="intro-modal">
            <h2>How to play</h2>
            <p>
              Guess the word or phrase by following the connected letters on the keyboard.
            </p>
            <div className="intro-demo" aria-hidden="true">
              <Keyboard word="dog" dotMode="first-last" />
            </div>
            <p className="intro-example">For example: this word would be dog.</p>
            <button className="intro-close" onClick={handleCloseIntro}>
              Let&apos;s play
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
