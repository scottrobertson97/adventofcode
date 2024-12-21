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

function isRowValidWithAnOopsie(row: number[]): number {
  if (isRowValid(row)) return 1
  const length = row.length
  for (let i = 0; i < length; i++) {
    const removed = row.splice(i, 1)
    if (isRowValid(row)) return 1
    row.splice(i, 0, ...removed)
  }
  return 0
}

export default function run(input: string): number {
  return input
    .split('\r\n')
    .map(s => s.split(' ').map(n => +n))
    .map(row => isRowValidWithAnOopsie(row))
    .reduce((p, c) => p + c)
}
