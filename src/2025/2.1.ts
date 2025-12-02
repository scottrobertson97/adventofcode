export default function run(input: string): number {
  let sum = 0
  input.split(',').forEach(line => {
    let [min, max] = line.split('-').map(Number)
    for (let num = min; num <= max; num++) {
      const str = num.toString()
      if (str.length % 2 !== 0) continue
      if (str.substring(0, str.length / 2) === str.substring(str.length / 2)) {
        sum += num
      }
    }
  })
  return sum
}
