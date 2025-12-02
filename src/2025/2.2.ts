function isInvalid(str: string): boolean {
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

export default function run(input: string): number {
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
