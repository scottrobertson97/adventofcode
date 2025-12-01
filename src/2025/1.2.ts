export default function run(input: string): number {
  let dial = 50
  let sum = 0
  input.split('\r\n').forEach(line => {
    const direction = line.substring(0, 1) === 'L' ? -1 : 1
    const amount = Number(line.substring(1))
    dial += direction * amount
    while (dial >= 100 || dial < 0) {
      sum++
      if (dial >= 100) dial -= 100
      if (dial < 0) dial += 100
    }
  })
  return sum
}
