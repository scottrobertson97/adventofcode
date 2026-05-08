function part1(input) {
  let sum = 0
  input.split(',').forEach(line => {
    let [min, max] = line.split('-').map(Number)
    for (let num = min; num <= max; num++) {
      const str = num.toString()
      if (str.length % 2 !== 0) continue
      if (str.substring(0, str.length / 2) === str.substring(str.length / 2)) {
        sum += num
      }
    }
  })
  return sum
}

function isInvalid(str) {
  const half = str.length / 2
  for (let sectionLength = 1; sectionLength <= half; sectionLength++) {
    if (str.length % sectionLength !== 0) continue
    const section = str.substring(0, sectionLength)
    const sections = Math.floor(str.length / sectionLength)
    const copy = new Array(sections).fill(section).join('')
    if (copy === str) return true
  }
  return false
}

function part2(input) {
  let sum = 0
  input.split(',').forEach(line => {
    let [min, max] = line.split('-').map(Number)
    for (let num = min; num <= max; num++) {
      const str = num.toString()
      if (isInvalid(str)) sum += num
    }
  })
  return sum
}

export { part1, part2 }
