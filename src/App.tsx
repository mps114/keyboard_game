import { useState, useCallback } from 'react'
import Keyboard, { DotMode } from './components/Keyboard'
import GuessInput from './components/GuessInput'
import GameOver from './components/GameOver'
import { pickRandomWord } from './data/words'
import './App.css'

const DOT_OPTIONS: { value: DotMode; label: string }[] = [
  { value: 'all', label: 'All dots' },
  { value: 'first', label: 'First dot' },
  { value: 'first-last', label: 'First & last' },
  { value: 'none', label: 'No dots' },
]

export default function App() {
  const [level, setLevel] = useState(1)
  const [word, setWord] = useState(() => pickRandomWord(1))
  const [gameOver, setGameOver] = useState(false)
  const [correctFeedback, setCorrectFeedback] = useState(false)
  const [dotMode, setDotMode] = useState<DotMode>('all')
  const [guess, setGuess] = useState('')

  const handleGuess = useCallback(
    (guess: string) => {
      if (guess === word) {
        setCorrectFeedback(true)
        setTimeout(() => {
          const nextLevel = level + 1
          setLevel(nextLevel)
          setWord(pickRandomWord(nextLevel))
          setCorrectFeedback(false)
          setGuess('')
        }, 800)
      } else {
        setGameOver(true)
      }
    },
    [word, level],
  )

  const handleRestart = useCallback(() => {
    setLevel(1)
    setWord(pickRandomWord(1))
    setGameOver(false)
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>Keyboard Game</h1>
        <span className="level-badge">Level {level}</span>
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

      {gameOver ? (
        <GameOver correctWord={word} level={level} onRestart={handleRestart} />
      ) : (
        <>
          {correctFeedback && <p className="correct-feedback">Correct!</p>}
          <GuessInput
            onGuess={handleGuess}
            disabled={correctFeedback}
            letterCount={word.length}
            value={guess}
            onChange={setGuess}
          />
        </>
      )}
    </div>
  )
}
