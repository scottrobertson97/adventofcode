function parsePoints(input) {
  return input.split(/\r?\n/).map(line => {
    const [x, y] = line.split(',').filter(Boolean)
    return { x: Number(x), y: Number(y) }
  })
}

function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0])

  const merged = []
  for (const [start, end] of intervals) {
    const last = merged[merged.length - 1]

    if (!last || start > last[1] + 1) {
      merged.push([start, end])
    } else if (end > last[1]) {
      last[1] = end
    }
  }

  return merged
}

function buildAllowedRows(points) {
  const verticalEdges = []
  const horizontalEdgesByY = new Map()
  const uniqueY = [...new Set(points.map(point => point.y))].sort((a, b) => a - b)

  for (let i = 0; i < points.length; i++) {
    const a = points[i]
    const b = points[(i + 1) % points.length]

    if (a.x === b.x) {
      verticalEdges.push({
        x: a.x,
        minY: Math.min(a.y, b.y),
        maxY: Math.max(a.y, b.y),
      })
    } else {
      const edges = horizontalEdgesByY.get(a.y) ?? []
      edges.push([Math.min(a.x, b.x), Math.max(a.x, b.x)])
      horizontalEdgesByY.set(a.y, edges)
    }
  }

  function getIntervals(y) {
    const intervals = horizontalEdgesByY.get(y)?.map(interval => [...interval]) ?? []
    const crossings = []

    for (const edge of verticalEdges) {
      if (edge.minY < y && y <= edge.maxY) crossings.push(edge.x)
    }

    crossings.sort((a, b) => a - b)
    for (let i = 0; i < crossings.length; i += 2) {
      intervals.push([crossings[i], crossings[i + 1]])
    }

    return mergeIntervals(intervals)
  }

  const rows = []
  for (let i = 0; i < uniqueY.length; i++) {
    const y = uniqueY[i]
    rows.push({ minY: y, maxY: y, intervals: getIntervals(y) })

    const nextY = uniqueY[i + 1]
    if (nextY !== undefined && nextY > y + 1) {
      rows.push({ minY: y + 1, maxY: nextY - 1, intervals: getIntervals(y + 1) })
    }
  }

  return rows
}

function containsInterval(intervals, minX, maxX) {
  return intervals.some(([start, end]) => start <= minX && maxX <= end)
}

function containsRectangle(rows, minX, maxX, minY, maxY) {
  for (const row of rows) {
    if (row.maxY < minY || row.minY > maxY) continue
    if (!containsInterval(row.intervals, minX, maxX)) return false
  }

  return true
}

function part1(input) {
  let biggestArea = 0
  const points = parsePoints(input)

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

function part2(input) {
  let biggestArea = 0
  const points = parsePoints(input)
  const rows = buildAllowedRows(points)

  for (let i = 0; i < points.length; i++) {
    const pointA = points[i]
    for (let j = i + 1; j < points.length; j++) {
      const pointB = points[j]
      const minX = Math.min(pointA.x, pointB.x)
      const maxX = Math.max(pointA.x, pointB.x)
      const minY = Math.min(pointA.y, pointB.y)
      const maxY = Math.max(pointA.y, pointB.y)
      const area =
        (maxX - minX + 1) *
        (maxY - minY + 1)

      if (area <= biggestArea) continue

      if (containsRectangle(rows, minX, maxX, minY, maxY)) biggestArea = area
    }
  }

  return biggestArea
}

export { part1, part2 }
