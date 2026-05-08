# AGENTS.md

Guidance for coding agents working in this Advent of Code repository.

## Project Shape

- This repo uses plain Node.js with ESM JavaScript.
- Do not add TypeScript, Deno config, bundlers, transpilers, or test frameworks unless explicitly requested.
- The runner is `main.js`.
- Puzzle solutions live under `src/years/YYYY/dayNN/index.js`.
- Each day module should export named functions:

```js
function part1(input) {
  return 0
}

function part2(input) {
  return 0
}

export { part1, part2 }
```

## Running Solutions

Use the package scripts:

```sh
npm run solve -- 2025 7 1
npm run solve -- 2025 7 2
npm run solve -- 2025 7 1 --sample
```

The runner dynamically loads:

```txt
src/years/YYYY/dayNN/index.js
```

It reads `input.txt` by default and `sample.txt` when `--sample` is passed.

## Inputs

- Real Advent of Code inputs are private and should not be committed.
- Day-local `input.txt` files are ignored by `.gitignore`.
- Keep sample inputs as `sample.txt` beside the day solution when useful; these may be committed.
- Do not recreate a global `input/` directory.

## Code Style

- Prefer simple, direct JavaScript over abstractions.
- Prefer regular JavaScript numbers for puzzle math; use `BigInt` only when the expected answer can exceed `Number.MAX_SAFE_INTEGER`.
- Keep puzzle-specific parsing and helpers inside that day folder.
- Add shared utilities under `src/utils/` only when reused by multiple days.
- Do not leave debug output in solution functions. The runner should print only the final answer.
- Preserve puzzle input semantics. If trimming is needed, trim only trailing line endings unless a puzzle specifically requires more.

## Adding a New Day

Create:

```txt
src/years/YYYY/dayNN/
  index.js
  input.txt
  sample.txt
```

`input.txt` will be ignored. `sample.txt` is optional.

Use two-digit day folders, such as `day01`, `day09`, and `day25`.

## Validation

After changes, run at least:

```sh
npm run solve -- YYYY D 1
npm run solve -- YYYY D 2
```

For syntax-only validation, check JavaScript files with Node:

```sh
node --check main.js
node --check src/years/YYYY/dayNN/index.js
```

If a solution is incomplete, prefer returning a clear placeholder value or throwing a clear `Error` over silently producing misleading output.
