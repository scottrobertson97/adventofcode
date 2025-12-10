export default function run(input: string): number {
  let biggestArea = 0
  const points = input.split('\r\n').map(l => {
    const [x, y] = l.split(',').filter(Boolean)
    return { x: Number(x), y: Number(y) }
  })
  for (let i = 0; i < points.length; i++) {
    const pointA = points[i]
    for (let j = i + 2; j < points.length; j += 2) {
      const pointB = points[j]
      if (
        !(
          (pointA.x >= pointB.x && pointA.y <= pointB.y) ||
          (pointA.x <= pointB.x && pointA.y >= pointB.y)
        )
      )
        continue // skip if not diagonal
      const area =
        (Math.abs(pointA.x - pointB.x) + 1) *
        (Math.abs(pointA.y - pointB.y) + 1)
      if (area > biggestArea) biggestArea = area
    }
  }
  return biggestArea
}
