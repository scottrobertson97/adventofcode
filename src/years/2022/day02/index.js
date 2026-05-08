const types = { A: 'Rock', X: 'Rock', B: 'Paper', Y: 'Paper', C: 'Scissors', Z: 'Scissors' }
const points = { Rock: 1, Paper: 2, Scissors: 3 }
const score = {
  Rock: { Rock: 3, Paper: 6, Scissors: 0 },
  Paper: { Rock: 0, Paper: 3, Scissors: 6 },
  Scissors: { Rock: 6, Paper: 0, Scissors: 3 },
}
const lookup = {
  Rock: { Y: 'Rock', Z: 'Paper', X: 'Scissors' },
  Paper: { X: 'Rock', Y: 'Paper', Z: 'Scissors' },
  Scissors: { Z: 'Rock', X: 'Paper', Y: 'Scissors' },
}

function part1(input) {
  let sum = 0
  input.split('\r\n').forEach(e => {
    const opp = types[e[0]]
    const self = types[e[2]]
    sum += points[self]
    if (opp === self) return sum += 3
    sum += score[opp][self]
  })
  return sum
}

function part2(input) {
  let sum = 0
  input.split('\r\n').forEach(e => {
    const opp = types[e[0]]
    const self = lookup[opp][e[2]]
    sum += points[self]
    if (opp === self) return sum += 3
    sum += score[opp][self]
  })
  return sum
}

export { part1, part2 }
