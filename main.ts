import {solutions} from './index.ts'

const year = 2024
const day = 1
const problem = 1

solutions[year][day][problem](await Deno.readTextFile(`./input/${day}.txt`))