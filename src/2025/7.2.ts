export default function run(input: string): number {
  let sum = 0

  const lines = input.split('\r\n').map(l => l.split(''))

  const inputs = []

  for (let x = 0; x < lines[0].length; x++) {
    let s = ''
    for (let y = 0; y < lines.length; y++) {
      s += lines[y][x]
    }
    inputs.push(s)
  }

  const groups = []
  let currentGroup: string[] = []

  for (const line of inputs) {
    if (line === '     ') {
      if (currentGroup.length) {
        groups.push(currentGroup)
        currentGroup = []
      }
    } else {
      currentGroup.push(line)
    }
  }
  groups.push(currentGroup)
  console.log(groups)

  const formatGroups = groups.map(group => {
    const op = group[0].substring(group[0].length - 1)
    group[0] = group[0].substring(0, group[0].length - 1)
    const nums = group.map(Number)
    let sum = op === '+' ? 0 : 1
    for (const num of nums) {
      if (op === '+') sum += num
      else sum *= num
    }
    return { op, nums, sum }
  })

  console.log(formatGroups)

  // const formatGroups = groups.forEach(group => {
  //   const op = group[0].substring(group[0].length - 1)
  //   group[0] = group[0].substring(0, group[0].length - 1)
  //   const addNotMultiply = op === '+'
  //   let subSum = addNotMultiply ? 0 : 1
  //   for (let i = 0; i < group.length; i++) {
  //     const num = Number(group[i].trim())
  //     if (addNotMultiply) subSum += num
  //     else subSum *= num
  //   }
  //   sum += subSum
  // })

  formatGroups.forEach(g => {
    sum += g.sum
  })

  return sum
}
