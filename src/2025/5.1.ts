export default function run(input: string): number {
  let sum = 0
  const [ranges, ingredients] = input.split('\r\n\r\n')
  const parsedRanges = ranges
    .split('\r\n')
    .map(line => line.split('-').map(Number))
  const parsedIngredients = ingredients.split('\r\n').map(Number)

  for (const ingredient of parsedIngredients) {
    for (const [min, max] of parsedRanges) {
      if (ingredient >= min && ingredient <= max) {
        sum++
        break
      }
    }
  }
  return sum
}
