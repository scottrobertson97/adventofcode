function getFirstBiggest(line: string, start: number, place: number): number[] {
  let index = start
  let tens = Number(line[start])

  for (let i = start+1; i < line.length - (place-1); i++) {
    if (Number(line[i]) > tens) {
      tens = Number(line[i])
      index = i
    }
    if (tens === 9) break
  }
  return [tens, index]
}

export default function run(input: string): number {
  const numLength = 12
  let sum = 0
  input.split('\r\n').forEach(line => {
    let lastIndex = 0
    const arr = []
    for (let p = numLength; p > 0; p--) {
      const [num, index] = getFirstBiggest(line, lastIndex, p)
      arr.push(num)
      lastIndex = index + 1
    }
    sum += arr.map((n, i) => n * 10 ** (numLength - i - 1)).reduce((a, b) => a + b, 0)
  })

  return sum
}
