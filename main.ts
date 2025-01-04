import { solutions } from './index.ts'

const year = 2024
const day = 5
const part = 2

const input = await Deno.readTextFile(`./input/${year}.${day}.txt`)
const answer = solutions[year][day][part](input)
console.log(answer)
