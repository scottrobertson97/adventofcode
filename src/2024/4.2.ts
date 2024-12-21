export default function run(input: string): number {
  return input
    .split('\r\n')
    .map(a => a.split(''))
    .map((r, y, arr) =>
      r.map((_, x) =>
        [
          arr[y][x],
          arr[y]?.[x + 2],
          arr?.[y + 1]?.[x + 1],
          arr?.[y + 2]?.[x],
          arr?.[y + 2]?.[x + 2],
        ].join('')
      )
    )
    .flat()
    .filter(r => ['MMASS', 'SSAMM', 'MSAMS', 'SMASM'].includes(r)).length
}
