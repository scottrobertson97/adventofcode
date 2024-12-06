const sort = (a: number, b: number) => a - b

export default function run(input: string) {
  const inputArr = input.replaceAll("   ", "\r\n").split("\r\n")
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
  console.log(total)
}
