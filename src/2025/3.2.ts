function getFirstBiggest(line: string): number[] {
  let index = 0
  let tens = Number(line[index])

  for (let i = 1; i < line.length; i++) {
    if (Number(line[i]) > tens) {
      tens = Number(line[i])
      index = i
    }
    if (tens === 9) break
  }
  return [tens, index]
}

export default function run(input: string): number {
  let sum = 0
  input.split('\r\n').forEach(line => {
    let lastIndex = 0
    const arr = []
    for (let p = 2; p > 0; p--) {
      const [num, index] = getFirstBiggest(
        line.substring(lastIndex, line.length - lastIndex - p)
      )
      arr.push(num.toString())
      lastIndex = lastIndex + index + 1
    }
    sum += Number(arr.join(''))
  })

  return sum
}
