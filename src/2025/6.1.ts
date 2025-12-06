export default function run(input: string): number {
  let sum = 0
  let lines = input.split('\r\n').map(l => l.split(' ').filter(Boolean))
  console.log(lines)
  let operations = lines[lines.length - 1]
  let nums = lines.slice(0, lines.length - 1).map(l => l.map(Number))
  for (let i = 0; i < operations.length; i++) {
    let addNotMultiply = operations[i] === '+'
    let subSum = addNotMultiply ? 0 : 1
    for (let j = 0; j < nums.length; j++) {
      if (addNotMultiply) subSum += nums[j][i]
      else subSum *= nums[j][i]
    }
    sum += subSum
  }
  return sum
}
