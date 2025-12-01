export default function run(input: string): number {
  const grid = input.split('\r\n').map(s => s.split(''))
  let y = 73
  let x = 41
  grid[y][x] = 'X'

  const directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ]
  let direction = 0
  while (true) {
    const nextY = y + directions[direction].y
    const nextX = x + directions[direction].x
    if (
      nextY < 0 ||
      nextY >= grid.length ||
      nextX < 0 ||
      nextX >= grid[0].length
    )
      break
    const nextSpace = grid[nextY][nextX]
    if (nextSpace === '#') {
      direction++
      if (direction > 3) direction = 0
      continue
    }
    y = nextY
    x = nextX
    grid[y][x] = 'X'
  }

  return grid.map(r => r.filter(c => c === 'X').length).reduce((a, c) => a + c)
}
