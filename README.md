# Keyboard Game

A word-guessing game where the clue is a path drawn on a keyboard.

Each round, lines are drawn between the keys of a hidden word in sequence. Figure out the word from the path — you have 5 attempts.

## How to play

1. Look at the path drawn on the keyboard
2. Type your guess letter by letter into the slots
3. Submit — wrong guesses are shown as history rows above the input
4. Solve the word in 5 tries or fewer

Words include single words (e.g. `SPHINX`) and multi-word phrases (e.g. `HOT DOG`, `BIG BAD WOLF`). Spaces appear as gaps in the slot input.

## Dot modes

Use the buttons below the keyboard to adjust how many dots appear on the path:

| Mode | What's shown |
|---|---|
| All dots | A dot on every key in the word |
| First dot | Only the starting key |
| First & last | Start and end keys |
| No dots | Lines only — no position hints |

## Development

```bash
npm install
npm run dev      # dev server at localhost:5173
npm run build    # type-check + production build
npm run preview  # preview production build
```

React + TypeScript, bundled with Vite. No external state management or routing.
