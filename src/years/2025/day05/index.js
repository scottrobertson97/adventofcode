function part1(input) {
  let sum = 0
  const [ranges, ingredients] = input.split('\r\n\r\n')
  const parsedRanges = ranges
    .split('\r\n')
    .map(line => line.split('-').map(Number))
  const parsedIngredients = ingredients.split('\r\n').map(Number)

  for (const ingredient of parsedIngredients) {
    for (const [min, max] of parsedRanges) {
      if (ingredient >= min && ingredient <= max) {
        sum++
        break
      }
    }
  }
  return sum
}

function compactRanges(ranges) {
  const compactRanges = []

  for (const [min, max] of ranges) {
    let overlapping = false
    for (let i = 0; i < compactRanges.length; i++) {
      const [_min, _max] = compactRanges[i]
      if (max >= _min && _max >= min) {
        compactRanges[i][0] = Math.min(min, _min)
        compactRanges[i][1] = Math.max(max, _max)
        overlapping = true
        break
      }
    }
    if (!overlapping) compactRanges.push([min, max])
  }

  return compactRanges
}

function part2(input) {
  const [ranges] = input.split('\r\n\r\n')
  const parsedRanges = ranges
    .split('\r\n')
    .map(line => line.split('-').map(Number))

  let compactedRanges = parsedRanges
  while (true) {
    const newCompact = compactRanges(compactedRanges)
    if (newCompact.length === compactedRanges.length) break
    compactedRanges = newCompact
  }

  return compactedRanges
    .map(([min, max]) => max - min + 1)
    .reduce((a, b) => a + b, 0)
}

export { part1, part2 }
