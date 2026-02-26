# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (Vite, localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview production build
```

There are no tests or linters configured. TypeScript strict mode (`noUnusedLocals`, `noUnusedParameters`) acts as the main correctness check — `npm run build` will catch type errors.

## Architecture

A React + TypeScript single-page app (Vite). No routing, no state management library.

### Game flow (`src/App.tsx`)
The root component owns all game state: the current `word`, `attempts: string[]` (previous wrong guesses), `solved`, `dotMode`, and `guess: string[]` (active input slots). On each guess, `handleGuess` compares the reconstructed string against `word`; wrong guesses append to `attempts` (max 5), a correct guess sets `solved`. Words are randomly picked from a flat list in `src/data/words.ts` via `pickChallengeWord()`.

### Keyboard visual (`src/components/Keyboard.tsx`)
Renders a CSS-layout keyboard (3 letter rows + spacebar) with an absolutely-positioned SVG overlay. The SVG draws lines between consecutive key centers for each letter in the word, plus dots at key positions filtered by `dotMode`. Key center coordinates come from `src/utils/keyboardLayout.ts`, which pre-computes `keyPositions` (including `' '` for the spacebar) as a `Record<string, {x, y}>`. Spaces in the word are skipped in the path (no key position for them → filtered by `.filter(Boolean)`).

### Slot-based input (`src/components/GuessInput.tsx`)
The input renders individual `<span>` slots (one per non-space character in `wordTemplate`) with a hidden `<input>` that captures focus and keyboard events. State: `cursorPos` (letter-slot index, not template index). Clicking any slot sets `cursorPos` there. `onKeyDown` handles all input manually with `e.preventDefault()` — letters overwrite the current slot and advance the cursor, backspace clears, arrow keys move. Parent holds `slots: string[]` (one entry per letter slot, `''` = empty). On submit, slots are reconstructed into the full word with spaces inserted at the correct template positions before calling `onGuess`.

### Space handling
Words can contain 1–2 spaces (e.g. `"HOT DOG"`, `"BIG BAD WOLF"`). Throughout the codebase, space positions are detected by checking `ch === ' '` against `wordTemplate`. Space slots render as narrow non-interactive gaps; `keyPositions[' ']` exists so the SVG path connects through the spacebar key center.
