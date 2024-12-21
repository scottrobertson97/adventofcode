function isRowValid(row: number[]): number {
  const firstDiff = row[1] - row[0]
  if (firstDiff === 0 || Math.abs(firstDiff) > 3) return 0
  const increasing = firstDiff > 0
  for (let i = 1; i < row.length - 1; i++) {
    const diff = row[i + 1] - row[i]
    if (diff === 0 || Math.abs(diff) > 3 || increasing !== diff > 0) return 0
  }
  return 1
}

export default function run(input: string): number {
  return input
    .split('\r\n')
    .map(s => s.split(' ').map(n => +n))
    .map(row => isRowValid(row))
    .reduce((p, c) => p + c)
}
