import { solutions } from './index.ts'

const year = 2025
const day = 9
const part = 2

const input = await Deno.readTextFile(`./input/${year}.${day}.txt`)
const answer = solutions[year][day][part](input)
console.log(answer)
