function compactRanges(ranges: [number, number][]): [number, number][] {
  const compactRanges: [number, number][] = []

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

export default function run(input: string): number {
  const [ranges] = input.split('\r\n\r\n')
  const parsedRanges = ranges
    .split('\r\n')
    .map(line => line.split('-').map(Number))

  let compactedRanges = parsedRanges as [number, number][]
  while (true) {
    const newCompact = compactRanges(compactedRanges)
    if (newCompact.length === compactedRanges.length) break
    compactedRanges = newCompact
  }

  return compactedRanges
    .map(([min, max]) => max - min + 1)
    .reduce((a, b) => a + b, 0)
}
