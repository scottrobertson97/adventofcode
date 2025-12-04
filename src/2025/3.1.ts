export default function run(input: string): number {
  let sum = 0
  input.split('\r\n').forEach(line => {
    let index = 0
    let tens = Number(line[index])

    for (let i = 1; i < line.length - 1; i++) {
      if (Number(line[i]) > tens) {
        tens = Number(line[i])
        index = i
      }
      if (tens === 9) break
    }

    let ones = Number(line[index + 1])
    for (let j = index + 2; j < line.length; j++) {
      if (Number(line[j]) > ones) {
        ones = Number(line[j])
      }
      if (ones === 9) break
    }
    console.log(`Tens: ${tens}, Ones: ${ones}`)
    sum += tens * 10 + ones
  })
  return sum
}
