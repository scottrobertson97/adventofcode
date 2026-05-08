function part1(input) {
  return input
    .split('\r\n')
    .map(a => a.split(''))
    .map((row, y, arr) =>
      row
        .map((_, x) => [
          [
            arr?.[y]?.[x],
            arr?.[y]?.[x + 1],
            arr?.[y]?.[x + 2],
            arr?.[y]?.[x + 3],
          ].join(''),
          [
            arr?.[y]?.[x],
            arr?.[y + 1]?.[x],
            arr?.[y + 2]?.[x],
            arr?.[y + 3]?.[x],
          ].join(''),
          [
            arr?.[y]?.[x],
            arr?.[y + 1]?.[x + 1],
            arr?.[y + 2]?.[x + 2],
            arr?.[y + 3]?.[x + 3],
          ].join(''),
          [
            arr?.[y]?.[x + 3],
            arr?.[y + 1]?.[x + 2],
            arr?.[y + 2]?.[x + 1],
            arr?.[y + 3]?.[x],
          ].join(''),
        ])
        .flat()
    )
    .flat()
    .filter(r => r === 'XMAS' || r === 'SAMX').length
}

function part2(input) {
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

export { part1, part2 }
