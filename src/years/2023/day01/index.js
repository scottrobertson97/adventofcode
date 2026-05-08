const spelledNumsDict = {
  one: '1', two: '2', three: '3', four: '4', five: '5',
  six: '6', seven: '7', eight: '8', nine: '9',
}
const spelledNums = Object.keys(spelledNumsDict)

function part1(input) {
  const nums = []
  for (const word of input.split('\r\n')) {
    const arr = word.split('')
    let a, b
    for (let i = 0; i < arr.length; i++) {
      if (!isNaN(+arr[i])) { a = arr[i]; break }
    }
    for (let i = arr.length - 1; i >= 0; i--) {
      if (!isNaN(+arr[i])) { b = arr[i]; break }
    }
    nums.push(+(a + b))
  }
  return nums.reduce((a, b) => a + b)
}

function part2(input) {
  const nums = []
  for (const word of input.split('\r\n')) {
    let a, b
    for (let i = 0; i < word.length; i++) {
      const c = word[i]
      if (!isNaN(+c)) { a = c; break }
      const found = spelledNums.find(e => e == word.substring(i, i + e.length))
      if (found) { a = spelledNumsDict[found]; break }
    }
    for (let i = word.length - 1; i >= 0; i--) {
      const c = word[i]
      if (!isNaN(+c)) { b = c; break }
      const found = spelledNums.find(e => e === word.substring(i, i + e.length))
      if (found) { b = spelledNumsDict[found]; break }
    }
    nums.push(+(a + b))
  }
  return nums.reduce((a, b) => a + b)
}

export { part1, part2 }
