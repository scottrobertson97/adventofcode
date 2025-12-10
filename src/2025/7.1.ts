export default function run(input: string): number {
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
    console.table(grid)
  }
  return sum
}
