const CHALLENGE_WORDS: string[] = [
  // Hard single words
  'RHYTHM', 'LYMPH', 'GLYPH', 'NYMPH', 'PYGMY', 'CRYPT', 'TRYST',
  'QUALM', 'THYME', 'PROXY', 'OXIDE', 'VORTEX', 'MATRIX', 'SYNTAX',
  'LYNX', 'ONYX', 'MINX', 'APEX', 'QUIRKY', 'ZEPHYR', 'WHIMSY',
  'JINXED', 'PIXIE', 'KLUTZ', 'JUMPY', 'PROWL', 'SQUAT', 'BLITZ',
  'SPHINX', 'VEXED', 'TWITCH', 'GAWKY', 'GRIMY', 'MUZAK', 'KVETCH',

  // One space phrases
  'HOT DOG', 'ZIP CODE', 'BOX JUMP', 'WOLF PACK', 'NIGHT OWL',
  'DRY RUN', 'ROAD TRIP', 'SKY HIGH', 'JAW DROP', 'POP QUIZ',
  'FOX TROT', 'GYM RAT', 'JET LAG', 'TOP GUN', 'CAT NAP',
  'LOW KEY', 'OWL EYE', 'RAW DEAL', 'FAT CAT', 'BIG TOP',
  'RIP CORD', 'WAX JOB', 'OLD BOY', 'DIG OUT', 'MIX DOWN',

  // Two space phrases
  'BIG BAD WOLF', 'ZIP LINE RUN', 'DIM SUM BAR',
  'OLD CROW BAR', 'HOT DOG BUN', 'POP GUN CAP',
  'CAT NAP ZEN', 'DRY ICE BAR', 'SKY TOP GUN',
]

export function pickChallengeWord(): string {
  return CHALLENGE_WORDS[Math.floor(Math.random() * CHALLENGE_WORDS.length)]
}
