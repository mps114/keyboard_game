import { useRef, useEffect, useState } from 'react'

interface GuessInputProps {
  onGuess: (guess: string) => void
  disabled: boolean
  wordTemplate: string
  slots: string[]
  onSlotsChange: (slots: string[]) => void
}

export default function GuessInput({ onGuess, disabled, wordTemplate, slots, onSlotsChange }: GuessInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const letterCount = wordTemplate.replace(/ /g, '').length
  const [cursorPos, setCursorPos] = useState(0)

  useEffect(() => {
    if (!disabled) inputRef.current?.focus()
  }, [disabled])

  useEffect(() => {
    setCursorPos(0)
  }, [wordTemplate])

  function getSlot(i: number): string {
    return slots[i] ?? ''
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (disabled) return

    if (/^[a-zA-Z]$/.test(e.key)) {
      e.preventDefault()
      const newSlots = Array.from({ length: letterCount }, (_, i) => getSlot(i))
      newSlots[cursorPos] = e.key.toUpperCase()
      onSlotsChange(newSlots)
      if (cursorPos < letterCount - 1) setCursorPos(cursorPos + 1)
    } else if (e.key === 'Backspace') {
      e.preventDefault()
      const newSlots = Array.from({ length: letterCount }, (_, i) => getSlot(i))
      if (newSlots[cursorPos]) {
        newSlots[cursorPos] = ''
        onSlotsChange(newSlots)
      } else if (cursorPos > 0) {
        newSlots[cursorPos - 1] = ''
        onSlotsChange(newSlots)
        setCursorPos(cursorPos - 1)
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setCursorPos(Math.max(0, cursorPos - 1))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setCursorPos(Math.min(letterCount - 1, cursorPos + 1))
    }
  }

  const canSubmit = slots.length === letterCount && slots.every((s) => s !== '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || disabled) return

    let letterIdx = 0
    const full = wordTemplate
      .split('')
      .map((ch) => (ch === ' ' ? ' ' : slots[letterIdx++]))
      .join('')

    onGuess(full)
    onSlotsChange(Array(letterCount).fill(''))
    setCursorPos(0)
  }

  let letterIdx = 0
  const slotElements = wordTemplate.split('').map((ch, i) => {
    if (ch === ' ') {
      return { isSpace: true, char: '', slotIdx: i, letterIdx: -1, isActive: false }
    }
    const li = letterIdx++
    return {
      isSpace: false,
      char: getSlot(li),
      slotIdx: i,
      letterIdx: li,
      isActive: li === cursorPos && !disabled,
    }
  })

  return (
    <form className="guess-form" onSubmit={handleSubmit} onClick={() => inputRef.current?.focus()}>
      <div className="letter-slots-input">
        {slotElements.map((slot) =>
          slot.isSpace ? (
            <span key={slot.slotIdx} className="letter-slot-space" />
          ) : (
            <span
              key={slot.slotIdx}
              className={`letter-slot-input${slot.isActive ? ' letter-slot-cursor' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setCursorPos(slot.letterIdx)
                inputRef.current?.focus()
              }}
            >
              {slot.char}
            </span>
          ),
        )}
        <input
          ref={inputRef}
          className="guess-input-hidden"
          type="text"
          value=""
          onChange={() => {}}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoFocus
        />
      </div>
      <button className="guess-button" type="submit" disabled={disabled || !canSubmit}>
        Guess
      </button>
    </form>
  )
}
