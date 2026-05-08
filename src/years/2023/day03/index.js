const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

function part1(input) {
  const data = input.split('\r\n').map(row => row.split(''))
  const allNums = []
  for (let i = 0; i < data.length; i++) {
    let readingNum = false
    let numBuffer = []
    let hasSymbol = false
    for (let j = 0; j < data[i].length; j++) {
      const n = data[i][j]
      if (NUMS.find(num => num === n)) {
        readingNum = true
        numBuffer.push(n)
        const adjacents = getAdjacents(data, j, i)
        if (adjacents.find(e => !(NUMS.find(num => num === e) || e === '.'))) hasSymbol = true
      } else {
        if (readingNum && hasSymbol) allNums.push(+numBuffer.join(''))
        readingNum = false
        numBuffer = []
        hasSymbol = false
      }
    }
  }
  return allNums.reduce((a, b) => a + b)
}

function part2() {
  throw new Error('2023 day 03 part 2 is not implemented')
}

function getAdjacents(data, x, y) {
  const arr = []
  if (data[y - 1] !== undefined && data[y - 1][x - 1] !== undefined) arr.push(data[y - 1][x - 1])
  if (data[y - 1] !== undefined && data[y - 1][x] !== undefined) arr.push(data[y - 1][x])
  if (data[y - 1] !== undefined && data[y - 1][x + 1] !== undefined) arr.push(data[y - 1][x + 1])
  if (data[y] !== undefined && data[y][x - 1] !== undefined) arr.push(data[y][x - 1])
  if (data[y] !== undefined && data[y][x + 1] !== undefined) arr.push(data[y][x + 1])
  if (data[y + 1] !== undefined && data[y + 1][x - 1] !== undefined) arr.push(data[y + 1][x - 1])
  if (data[y + 1] !== undefined && data[y + 1][x] !== undefined) arr.push(data[y + 1][x])
  if (data[y + 1] !== undefined && data[y + 1][x + 1] !== undefined) arr.push(data[y + 1][x + 1])
  return arr
}

export { part1, part2 }
