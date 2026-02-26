import { useRef, useEffect } from 'react'

interface GuessInputProps {
  onGuess: (guess: string) => void
  disabled: boolean
  letterCount: number
  value: string
  onChange: (val: string) => void
}

export default function GuessInput({ onGuess, disabled, letterCount, value, onChange }: GuessInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!disabled) inputRef.current?.focus()
  }, [disabled])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (value.trim()) {
      onGuess(value.toUpperCase())
      onChange('')
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const cleaned = e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, letterCount)
    onChange(cleaned)
  }

  return (
    <form className="guess-form" onSubmit={handleSubmit} onClick={() => inputRef.current?.focus()}>
      <div className="letter-slots-input">
        {Array.from({ length: letterCount }).map((_, i) => (
          <span
            key={i}
            className={`letter-slot-input${i === value.length && !disabled ? ' letter-slot-cursor' : ''}`}
          >
            {value[i]?.toUpperCase() ?? ''}
          </span>
        ))}
        <input
          ref={inputRef}
          className="guess-input-hidden"
          type="text"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          autoFocus
        />
      </div>
      <button className="guess-button" type="submit" disabled={disabled || value.length === 0}>
        Guess
      </button>
    </form>
  )
}
