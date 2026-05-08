function parseGroups(input) {
  const arr = [0]
  input.split('\r\n').forEach(e => {
    if (e === '') return arr.push(0)
    arr[arr.length - 1] += +e
  })
  return arr
}

function part1(input) {
  return Math.max(...parseGroups(input))
}

function part2(input) {
  const arr = parseGroups(input)
  const a = Math.max(...arr)
  arr.splice(arr.indexOf(a), 1)
  const b = Math.max(...arr)
  arr.splice(arr.indexOf(b), 1)
  const c = Math.max(...arr)
  return a + b + c
}

export { part1, part2 }
