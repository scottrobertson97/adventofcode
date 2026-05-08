function part1(input) {
  return Array.from(input.matchAll(/mul\(\d+,\d+\)/g))
    .map(([s]) => s.split(/\(|\)|,/))
    .map(([_, a, b]) => +a * +b)
    .reduce((a, c) => a + c)
}

function part2(input) {
  let _do = true
  return Array.from(input.matchAll(/(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g))
    .filter(([[a, _, b]]) => (a === 'm' ? _do : (_do = b === '(') && false))
    .map(([s]) => s.split(/\(|\)|,/))
    .map(([_, a, b]) => +a * +b)
    .reduce((a, c) => a + c)
}

export { part1, part2 }
