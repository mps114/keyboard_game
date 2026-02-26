interface GameOverProps {
  correctWord: string
  attemptsUsed: number
  onRestart: () => void
}

export default function GameOver({ correctWord, attemptsUsed, onRestart }: GameOverProps) {
  return (
    <div className="game-over">
      <h2>Game Over</h2>
      <p>
        The answer was <strong>{correctWord}</strong>
      </p>
      <p className="game-over-level">Used all {attemptsUsed} attempts</p>
      <button className="restart-button" onClick={onRestart}>
        Try Again
      </button>
    </div>
  )
}
