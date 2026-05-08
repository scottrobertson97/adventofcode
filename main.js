import { access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { readInput } from './src/utils/input.js'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

function usage() {
  console.error('Usage: npm run solve -- <year> <day> <part> [--sample]')
  console.error('Example: npm run solve -- 2025 9 2')
}

function parseArgs(argv) {
  const sample = argv.includes('--sample')
  const positional = argv.filter(arg => !arg.startsWith('--'))
  const [year, day, part] = positional

  if (!/^\d{4}$/.test(year ?? '') || !/^\d{1,2}$/.test(day ?? '') || !/^[12]$/.test(part ?? '')) {
    return null
  }

  return {
    year,
    day: String(Number(day)).padStart(2, '0'),
    part: `part${part}`,
    inputFile: sample ? 'sample.txt' : 'input.txt',
  }
}

async function exists(pathname) {
  try {
    await access(pathname)
    return true
  } catch {
    return false
  }
}

const args = parseArgs(process.argv.slice(2))

if (!args) {
  usage()
  process.exit(1)
}

const dayDir = path.join(rootDir, 'src', 'years', args.year, `day${args.day}`)
const modulePath = path.join(dayDir, 'index.js')
const inputPath = path.join(dayDir, args.inputFile)

if (!(await exists(modulePath))) {
  console.error(`Solution module not found: ${modulePath}`)
  process.exit(1)
}

if (!(await exists(inputPath))) {
  console.error(`Input file not found: ${inputPath}`)
  process.exit(1)
}

const module = await import(pathToFileURL(modulePath))
const solve = module[args.part]

if (typeof solve !== 'function') {
  console.error(`Export not found: ${args.part} in ${modulePath}`)
  process.exit(1)
}

const input = await readInput(inputPath)
console.log(solve(input))
