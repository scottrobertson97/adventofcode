export default function run(input: string): number {
  let dial = 50
  let sum = 0
  input.split('\r\n').forEach(line => {
    const direction = line.substring(0, 1) === 'L' ? -1 : 1
    let amount = Number(line.substring(1))
    while (amount > 0) {
      dial += direction
      if (dial === -1) dial = 99
      if (dial === 100) dial = 0
      if (dial === 0) sum += 1
      amount -= 1
    }
  })
  return sum
}
