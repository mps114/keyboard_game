interface GameOverProps {
  correctWord: string
  level: number
  onRestart: () => void
}

export default function GameOver({ correctWord, level, onRestart }: GameOverProps) {
  return (
    <div className="game-over">
      <h2>Wrong!</h2>
      <p>
        The word was <strong>{correctWord}</strong>
      </p>
      <p className="game-over-level">You reached level {level}</p>
      <button className="restart-button" onClick={onRestart}>
        Try Again
      </button>
    </div>
  )
}
