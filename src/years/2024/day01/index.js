const sort = (a, b) => a - b

function part1(input) {
  const inputArr = input.replaceAll('   ', '\r\n').split('\r\n')
  const left = []
  const right = []
  for (let i = 0; i < inputArr.length; i += 2) {
    left.push(+inputArr[i])
    right.push(+inputArr[i + 1])
  }
  left.sort(sort)
  right.sort(sort)
  let total = 0
  for (let i = 0; i < left.length; i++) {
    total += Math.abs(left[i] - right[i])
  }
  return total
}

function part2(input) {
  const inputArr = input.replaceAll('   ', '\r\n').split('\r\n')
  const left = new Map()
  const right = new Map()

  for (let i = 0; i < inputArr.length; i += 2) {
    left.set(+inputArr[i], (left.get(+inputArr[i]) || 0) + 1)
    right.set(+inputArr[i + 1], (right.get(+inputArr[i + 1]) || 0) + 1)
  }

  let total = 0
  for (const [key, value] of left) {
    total += (right.get(key) || 0) * key * value
  }

  return total
}

export { part1, part2 }
