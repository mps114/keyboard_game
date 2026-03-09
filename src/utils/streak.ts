export interface StreakState {
  lastSolvedDate: string | null
  currentStreak: number
  maxStreak: number
}

const DEFAULT_STATE: StreakState = {
  lastSolvedDate: null,
  currentStreak: 0,
  maxStreak: 0,
}

function getKey(prefix: string, key: string): string {
  return `${prefix}${key}`
}

export function loadStreak(prefix: string): StreakState {
  if (typeof window === 'undefined') return { ...DEFAULT_STATE }
  const storage = window.localStorage
  const lastSolvedDate = storage.getItem(getKey(prefix, 'lastSolvedDate'))
  const currentStreak = Number(storage.getItem(getKey(prefix, 'currentStreak')) || 0)
  const maxStreak = Number(storage.getItem(getKey(prefix, 'maxStreak')) || 0)

  return {
    lastSolvedDate: lastSolvedDate || null,
    currentStreak: Number.isFinite(currentStreak) ? currentStreak : 0,
    maxStreak: Number.isFinite(maxStreak) ? maxStreak : 0,
  }
}

export function saveStreak(prefix: string, state: StreakState): void {
  if (typeof window === 'undefined') return
  const storage = window.localStorage
  if (state.lastSolvedDate) {
    storage.setItem(getKey(prefix, 'lastSolvedDate'), state.lastSolvedDate)
  }
  storage.setItem(getKey(prefix, 'currentStreak'), String(state.currentStreak))
  storage.setItem(getKey(prefix, 'maxStreak'), String(state.maxStreak))
}

export function applySolveToStreak(
  state: StreakState,
  todayKey: string,
  yesterdayKey: string,
): StreakState {
  if (state.lastSolvedDate === todayKey) {
    return state
  }

  const nextStreak = state.lastSolvedDate === yesterdayKey ? state.currentStreak + 1 : 1
  const nextMax = Math.max(state.maxStreak, nextStreak)

  return {
    lastSolvedDate: todayKey,
    currentStreak: nextStreak,
    maxStreak: nextMax,
  }
}
