import { useState, useCallback } from 'react'
import Keyboard, { DotMode } from './components/Keyboard'
import GuessInput from './components/GuessInput'
import GameOver from './components/GameOver'
import { pickChallengeWord } from './data/words'
import './App.css'

const MAX_ATTEMPTS = 5

const DOT_OPTIONS: { value: DotMode; label: string }[] = [
  { value: 'all', label: 'All dots' },
  { value: 'first', label: 'First dot' },
  { value: 'first-last', label: 'First & last' },
  { value: 'none', label: 'No dots' },
]

export default function App() {
  const [word, setWord] = useState(() => pickChallengeWord())
  const [attempts, setAttempts] = useState<string[]>([])
  const [solved, setSolved] = useState(false)
  const [dotMode, setDotMode] = useState<DotMode>('all')
  const [guess, setGuess] = useState<string[]>([])

  const gameOver = !solved && attempts.length >= MAX_ATTEMPTS
  const remaining = MAX_ATTEMPTS - attempts.length

  const handleGuess = useCallback(
    (fullGuess: string) => {
      if (fullGuess === word) {
        setSolved(true)
      } else {
        setAttempts((prev) => [...prev, fullGuess])
      }
    },
    [word],
  )

  const handleRestart = useCallback(() => {
    setWord(pickChallengeWord())
    setAttempts([])
    setSolved(false)
    setGuess([])
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>Keyboard Game</h1>
        {!solved && !gameOver && (
          <span className="attempts-badge">
            {remaining} / {MAX_ATTEMPTS}
          </span>
        )}
      </header>

      <Keyboard word={word} dotMode={dotMode} />

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
        <GameOver correctWord={word} attemptsUsed={attempts.length} onRestart={handleRestart} />
      ) : solved ? (
        <div className="solved-feedback">
          <p>
            Correct! Got it in {attempts.length + 1}{' '}
            {attempts.length + 1 === 1 ? 'try' : 'tries'}!
          </p>
          <button className="restart-button" onClick={handleRestart}>
            Play Again
          </button>
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
    </div>
  )
}
