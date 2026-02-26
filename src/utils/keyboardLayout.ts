export interface KeyPosition {
  x: number
  y: number
}

const KEY_WIDTH = 54
const KEY_HEIGHT = 54
const KEY_GAP = 6
const ROW_HEIGHT = KEY_HEIGHT + KEY_GAP

const rows = [
  'QWERTYUIOP',
  'ASDFGHJKL',
  'ZXCVBNM',
]

const rowOffsets = [0, 0.5, 1.5]

const keyPositions: Record<string, KeyPosition> = {}

rows.forEach((row, rowIndex) => {
  const offsetX = rowOffsets[rowIndex] * (KEY_WIDTH + KEY_GAP)
  for (let i = 0; i < row.length; i++) {
    keyPositions[row[i]] = {
      x: offsetX + i * (KEY_WIDTH + KEY_GAP) + KEY_WIDTH / 2,
      y: rowIndex * ROW_HEIGHT + KEY_HEIGHT / 2,
    }
  }
})

export const KEYBOARD_ROWS = rows
export const ROW_OFFSETS = rowOffsets
export const KEYBOARD_WIDTH = 10 * (KEY_WIDTH + KEY_GAP) - KEY_GAP
export const KEYBOARD_HEIGHT = 3 * ROW_HEIGHT - KEY_GAP
export { KEY_WIDTH, KEY_HEIGHT, KEY_GAP, ROW_HEIGHT }
export default keyPositions
