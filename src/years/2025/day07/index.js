function part1(input) {
  let sum = 0
  const grid = input.split('\r\n').map(l => l.split(''))

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const current = grid[y][x]
      if (current === 'S') {
        grid[y + 1][x] = '|'
      } else if (current === '|') {
        const below = grid?.[y + 1]?.[x]
        if (below === '.') grid[y + 1][x] = '|'
      } else if (current === '^') {
        const above = grid?.[y - 1]?.[x]
        const left = grid?.[y]?.[x - 1]
        const right = grid?.[y]?.[x + 1]
        if (above === '|') {
          sum++
          if (left === '.') grid[y][x - 1] = '|'
          if (right === '.') grid[y][x + 1] = '|'
        }
      } else {
        const above = grid?.[y - 1]?.[x]
        if (above === '|') grid[y][x] = '|'
      }
    }
  }
  return sum
}

function part2(input) {
  const grid = input.split(/\r?\n/).map(l => l.split(''))
  const width = grid[0].length
  let current = Array(width).fill(0)
  let exited = 0

  const startX = grid[0].indexOf('S')
  current[startX] = 1

  function addNext(next, x, count) {
    if (x < 0 || x >= width) {
      exited += count
    } else {
      next[x] += count
    }
  }

  for (let y = 0; y < grid.length; y++) {
    const next = Array(width).fill(0)

    for (let x = 0; x < width; x++) {
      const count = current[x]
      if (count === 0) continue

      if (grid[y][x] === '^') {
        addNext(next, x - 1, count)
        addNext(next, x + 1, count)
      } else if (y === grid.length - 1) {
        exited += count
      } else {
        addNext(next, x, count)
      }
    }

    current = next
  }

  return exited
}

export { part1, part2 }
