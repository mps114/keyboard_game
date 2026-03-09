const DAY_MS = 24 * 60 * 60 * 1000
const DEFAULT_EPOCH = new Date(2024, 0, 1)

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function getLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getLocalYesterdayKey(date: Date = new Date()): string {
  const d = startOfLocalDay(date)
  d.setDate(d.getDate() - 1)
  return getLocalDateKey(d)
}

export function daysSinceEpochLocal(date: Date = new Date(), epoch: Date = DEFAULT_EPOCH): number {
  const todayStart = startOfLocalDay(date).getTime()
  const epochStart = startOfLocalDay(epoch).getTime()
  return Math.floor((todayStart - epochStart) / DAY_MS)
}
