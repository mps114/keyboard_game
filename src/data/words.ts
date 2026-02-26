const wordsByLength: Record<number, string[]> = {
  3: [
    'CAT', 'DOG', 'RUN', 'SUN', 'CUP', 'MAP', 'PEN', 'BIG', 'RED', 'TOP',
    'HAT', 'JAM', 'LOG', 'MIX', 'NUT', 'OWL', 'PIG', 'RAT', 'SIT', 'VAN',
    'WAX', 'YAK', 'ZIP', 'BAT', 'COW', 'DIG', 'FAN', 'GUM', 'HOP', 'JOB',
    'KIT', 'LIP', 'MOP', 'NAP', 'OAK', 'POP', 'RUG', 'SAP', 'TIN', 'URN',
    'VET', 'WIG', 'BOX', 'CRY', 'DRY', 'FLY', 'GYM', 'HUG', 'ICY', 'JOY',
  ],
  4: [
    'JUMP', 'WORD', 'FISH', 'BARK', 'COIN', 'DUST', 'FROG', 'GLOW', 'HIKE',
    'KNOB', 'LAMP', 'MELT', 'NEST', 'PLUM', 'QUIZ', 'ROPE', 'SNAP', 'TWIG',
    'VEST', 'WINK', 'YELL', 'ZOOM', 'BEND', 'CLAP', 'DRIP', 'FLAP', 'GRIP',
    'HUNT', 'JOLT', 'KING', 'LUCK', 'MINT', 'PALM', 'RAMP', 'SKIP', 'TRIM',
    'VENT', 'WRAP', 'BELT', 'CORK', 'DUSK', 'FAWN', 'GOLF', 'HAWK', 'INCH',
    'JERK', 'KELP', 'LINK', 'MUSK', 'NUMB',
  ],
  5: [
    'PLANT', 'WORLD', 'STORM', 'THINK', 'BRUSH', 'CLIMB', 'DRIFT', 'FLAME',
    'GRIND', 'HAUNT', 'JOKER', 'KNELT', 'LEMON', 'MANGO', 'PLANK', 'QUEST',
    'ROAST', 'STUMP', 'TRUNK', 'VIVID', 'WITCH', 'YOUTH', 'BLANK', 'CROWD',
    'DROWN', 'FLINT', 'GRASP', 'HUMID', 'JOINT', 'KIOSK', 'LUNCH', 'MOUNT',
    'NORTH', 'PIXEL', 'QUIRK', 'SAINT', 'THUMP', 'WALTZ', 'BRISK', 'CLAMP',
    'DWELT', 'FROST', 'GHOST', 'IVORY', 'JUMBO', 'KNACK', 'LYMPH', 'MOURN',
  ],
  6: [
    'BRIDGE', 'CANDLE', 'DRAGON', 'FRIGHT', 'GOLDEN', 'JUNGLE', 'KNIGHT',
    'MARBLE', 'PENCIL', 'QUARTZ', 'SILVER', 'THRONE', 'VELVET', 'WRAITH',
    'BRANCH', 'CACTUS', 'FLINCH', 'GRAVEL', 'JIGSAW', 'LAUNCH', 'MYSTIC',
    'PLUNGE', 'RIDDLE', 'SWITCH', 'TUMBLE', 'WALRUS', 'ABSORB', 'BLIGHT',
    'CRUNCH', 'FROLIC', 'GROWTH', 'IMPACT', 'KITTEN', 'MUFFLE', 'PLIGHT',
    'QUIVER', 'SCRIMP', 'THWART', 'UNWIND', 'ZENITH',
  ],
  7: [
    'BLANKET', 'CROUTON', 'DOLPHIN', 'FREIGHT', 'GIRAFFE', 'KINGDOM',
    'PILGRIM', 'QUICKEN', 'SPARROW', 'TRUMPET', 'VULTURE', 'WHISPER',
    'BLISTER', 'COMPLEX', 'DWINDLE', 'FLICKER', 'GRAPPLE', 'JOURNAL',
    'KETCHUP', 'MINDFUL', 'PLUMBER', 'RHUBARB', 'STUMBLE', 'TWINKLE',
    'WEDLOCK', 'BALCONY', 'CRIMSON', 'DUSTPAN', 'FURNISH', 'GRUMBLE',
  ],
}

export function getWordsForLevel(level: number): string[] {
  if (level <= 3) return wordsByLength[3]
  if (level <= 6) return wordsByLength[4]
  if (level <= 9) return wordsByLength[5]
  if (level <= 12) return wordsByLength[6]
  return wordsByLength[7]
}

export function pickRandomWord(level: number): string {
  const words = getWordsForLevel(level)
  return words[Math.floor(Math.random() * words.length)]
}
