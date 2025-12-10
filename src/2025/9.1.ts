export default function run(input: string): number {
  let biggestArea = 0
  const points = input.split('\r\n').map(l => {
    const [x, y] = l.split(',').filter(Boolean)
    return { x: Number(x), y: Number(y) }
  })
  for (let i = 0; i < points.length; i++) {
    const pointA = points[i]
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue
      const pointB = points[j]
      const area =
        (Math.abs(pointA.x - pointB.x) + 1) *
        (Math.abs(pointA.y - pointB.y) + 1)
      if (area > biggestArea) biggestArea = area
    }
  }
  return biggestArea
}
