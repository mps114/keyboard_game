export interface ProgressState {
  word: string
  attempts: string[]
  solved: boolean
}

function getStorageKey(prefix: string, key: string): string {
  return `${prefix}${key}`
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

export function loadProgress(prefix: string, key: string): ProgressState | null {
  if (typeof window === 'undefined') return null
  const storageKey = getStorageKey(prefix, key)
  const raw = window.localStorage.getItem(storageKey)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    if (!parsed || typeof parsed !== 'object') return null
    if (!parsed.word || typeof parsed.word !== 'string') return null
    if (!isStringArray(parsed.attempts)) return null
    if (typeof parsed.solved !== 'boolean') return null
    return {
      word: parsed.word,
      attempts: parsed.attempts,
      solved: parsed.solved,
    }
  } catch {
    return null
  }
}

export function saveProgress(prefix: string, key: string, progress: ProgressState): void {
  if (typeof window === 'undefined') return
  const storageKey = getStorageKey(prefix, key)
  window.localStorage.setItem(storageKey, JSON.stringify(progress))
}
