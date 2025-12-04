function check8Around(grid: string[][], x: number, y: number): boolean {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ]

  let othersAround = 0
  for (const [dx, dy] of directions) {
    if (grid?.[x + dx]?.[y + dy] === '@') othersAround++
  }

  return othersAround < 4
}

export default function run(input: string): number {
  let sum = 0
  const grid = input.split('\r\n').map(line => line.split(''))

  while (true) {
    const oldSum = sum
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[0].length; y++) {
        if (grid[x][y] === '@' && check8Around(grid, x, y)) {
          sum++
          grid[x][y] = 'X'
        }
      }
    }
    if (oldSum === sum) break
  }

  return sum
}
