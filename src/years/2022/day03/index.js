function priority(type) {
  if (type.toLowerCase() === type) return type.charCodeAt() - 96
  return type.charCodeAt() - 38
}

function part1(input) {
  let sum = 0
  input.split('\r\n').forEach(e => {
    const len = e.length / 2
    const types = {}
    const common = []
    const a = e.substring(0, len).split('')
    const b = e.substring(len).split('')
    a.forEach(type => { types[type] = true })
    b.forEach(type => {
      if (types[type]) {
        common.push(type)
        types[type] = false
      }
    })
    common.forEach(type => { sum += priority(type) })
  })
  return sum
}

function part2(input) {
  const data = input.split('\r\n')
  let sum = 0
  for (let i = 0; i < data.length; i += 3) {
    const a = data[i].split('')
    const b = data[i + 1].split('')
    const c = data[i + 2].split('')
    const types = {}
    a.forEach(type => { types[type] = 1 })
    b.forEach(type => { if (types[type] && types[type] === 1) types[type] = 2 })
    c.forEach(type => { if (types[type] && types[type] === 2) types[type] = 3 })
    for (const type in types) {
      if (types[type] === 3) sum += priority(type)
    }
  }
  return sum
}

export { part1, part2 }
