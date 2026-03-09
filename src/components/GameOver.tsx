interface GameOverProps {
  correctWord: string
  attemptsUsed: number
  onRestart: () => void
  canRestart?: boolean
}

export default function GameOver({ correctWord, attemptsUsed, onRestart, canRestart = false }: GameOverProps) {
  return (
    <div className="game-over">
      <h2>Game Over</h2>
      <p>
        The answer was <strong>{correctWord}</strong>
      </p>
      <p className="game-over-level">Used all {attemptsUsed} attempts</p>
      {canRestart ? (
        <button className="restart-button" onClick={onRestart}>
          Try Again
        </button>
      ) : (
        <p className="streak-next">Come back tomorrow for a new puzzle.</p>
      )}
    </div>
  )
}
