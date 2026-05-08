import { readFile } from 'node:fs/promises'

function trimTrailingLineEndings(input) {
  return input.replace(/(?:\r?\n)+$/, '')
}

async function readInput(pathname) {
  const input = await readFile(pathname, 'utf8')
  return trimTrailingLineEndings(input)
}

export { readInput, trimTrailingLineEndings }
