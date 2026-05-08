function part1(input) {
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
    sum += tens * 10 + ones
  })
  return sum
}

function getFirstBiggest(line, start, place) {
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

function part2(input) {
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

export { part1, part2 }
