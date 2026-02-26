import keyPositions, {
  KEYBOARD_ROWS,
  ROW_OFFSETS,
  KEY_WIDTH,
  KEY_GAP,
  KEYBOARD_WIDTH,
  KEYBOARD_HEIGHT,
  SPACEBAR_WIDTH,
} from '../utils/keyboardLayout'
import './Keyboard.css'

export type DotMode = 'all' | 'first' | 'first-last' | 'none'

interface KeyboardProps {
  word: string
  dotMode?: DotMode
}

export default function Keyboard({ word, dotMode = 'all' }: KeyboardProps) {
  const letters = word.toUpperCase().split('')
  const points = letters.map((l) => keyPositions[l]).filter(Boolean)

  return (
    <div className="keyboard-container">
      <div className="keyboard" style={{ width: KEYBOARD_WIDTH, height: KEYBOARD_HEIGHT }}>
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="keyboard-row"
            style={{ paddingLeft: ROW_OFFSETS[rowIndex] * (KEY_WIDTH + KEY_GAP) }}
          >
            {row.split('').map((key) => (
              <div key={key} className="key">
                {key}
              </div>
            ))}
          </div>
        ))}

        <div
          className="keyboard-row"
          style={{ paddingLeft: (KEYBOARD_WIDTH - SPACEBAR_WIDTH) / 2 }}
        >
          <div className="key key-spacebar" />
        </div>

        <svg
          className="keyboard-svg"
          width={KEYBOARD_WIDTH}
          height={KEYBOARD_HEIGHT}
          viewBox={`0 0 ${KEYBOARD_WIDTH} ${KEYBOARD_HEIGHT}`}
        >
          {points.length >= 2 &&
            points.map((pos, i) => {
              if (i === 0) return null
              const prev = points[i - 1]
              return (
                <line
                  key={i}
                  x1={prev.x}
                  y1={prev.y}
                  x2={pos.x}
                  y2={pos.y}
                  className="path-line"
                />
              )
            })}

          {points.map((pos, i) => {
            const isFirst = i === 0
            const isLast = i === points.length - 1

            if (dotMode === 'none') return null
            if (dotMode === 'first' && !isFirst) return null
            if (dotMode === 'first-last' && !isFirst && !isLast) return null

            return (
              <circle
                key={i}
                cx={pos.x}
                cy={pos.y}
                r={isFirst ? 16 : 11}
                className={isFirst ? 'path-dot path-dot-start' : 'path-dot'}
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
}
