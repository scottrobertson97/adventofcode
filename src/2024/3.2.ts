export default function run(input: string): number {
  let _do = true
  return input
    .matchAll(/(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g)
    .filter(([[a, _, b]]) => (a === 'm' ? _do : (_do = b === '(') && false))
    .map(([s]) => s.split(/\(|\)|,/))
    .map(([_, a, b]) => +a * +b)
    .reduce((a, c) => a + c)
}
