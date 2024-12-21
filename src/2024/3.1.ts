export default function run(input: string): number {
  return input
    .matchAll(/mul\(\d+,\d+\)/g)
    .map(([s]) => s.split(/\(|\)|,/))
    .map(([_, a, b]) => +a * +b)
    .reduce((a, c) => a + c)
}
