function parsePoints(input) {
  return input.split(/\r?\n/).map(line => line.split(',').map(Number))
}

function getDistances(points) {
  const distances = []

  for (let a = 0; a < points.length - 1; a++) {
    const [x1, y1, z1] = points[a]

    for (let b = a + 1; b < points.length; b++) {
      const [x2, y2, z2] = points[b]
      const dx = x1 - x2
      const dy = y1 - y2
      const dz = z1 - z2

      distances.push([dx * dx + dy * dy + dz * dz, a, b])
    }
  }

  return distances.sort((a, b) => a[0] - b[0])
}

function createCircuitTracker(points) {
  const parents = points.map((_, i) => i)
  const sizes = points.map(() => 1)

  function find(point) {
    while (parents[point] !== point) {
      parents[point] = parents[parents[point]]
      point = parents[point]
    }

    return point
  }

  function union(a, b) {
    const rootA = find(a)
    const rootB = find(b)

    if (rootA === rootB) return false

    if (sizes[rootA] < sizes[rootB]) {
      parents[rootA] = rootB
      sizes[rootB] += sizes[rootA]
    } else {
      parents[rootB] = rootA
      sizes[rootA] += sizes[rootB]
    }

    return true
  }

  return { find, sizes, union }
}

function part1(input) {
  const points = parsePoints(input)
  const distances = getDistances(points)
  const circuits = createCircuitTracker(points)

  const connections = points.length === 20 ? 10 : 1000

  for (let i = 0; i < connections; i++) {
    circuits.union(distances[i][1], distances[i][2])
  }

  return points
    .map((_, i) => (circuits.find(i) === i ? circuits.sizes[i] : 0))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((product, size) => product * size, 1)
}

function part2(input) {
  const points = parsePoints(input)
  const distances = getDistances(points)
  const circuits = createCircuitTracker(points)
  let circuitCount = points.length

  for (const [, a, b] of distances) {
    if (!circuits.union(a, b)) continue

    circuitCount--
    if (circuitCount === 1) {
      return points[a][0] * points[b][0]
    }
  }

  throw new Error('Unable to connect all junction boxes')
}

export { part1, part2 }
