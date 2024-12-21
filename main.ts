import { solutions } from './index.ts'

const year = 2024
const day = 3
const part = 1

const input = await Deno.readTextFile(`./input/${year}.${day}.txt`)
const answer = solutions[year][day][part](input)
console.log(answer)
