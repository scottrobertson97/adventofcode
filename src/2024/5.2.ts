export default function run(input: string): number {
  const _input = input.split('\r\n')
  const getLeft = new Map()
  const getRight = new Map()

  _input.slice(0, 1176).forEach(s => {
    const [left, right] = s.split('|').map(n => +n)
    if (getRight.has(left)) getRight.set(left, [...getRight.get(left), right])
    else getRight.set(left, [right])
    if (getLeft.has(right)) getLeft.set(right, [...getLeft.get(right), left])
    else getLeft.set(right, [left])
  })

  return _input
    .slice(1177)
    .map(s => {
      const pages = s.split(',').map(n => +n)
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        const leftRules = new Set(getLeft.get(page))
        const rightRules = new Set(getRight.get(page))
        const leftPages = new Set(pages.slice(0, i))
        const rightPages = new Set(pages.slice(i + 1))
        if (
          !rightPages.isDisjointFrom(leftRules) ||
          !leftPages.isDisjointFrom(rightRules)
        ) {
          pages.sort((a, b) => {
            if (getRight.get(b)?.includes(a) || getLeft.get(a)?.includes(b))
              return 1
            if (getRight.get(a)?.includes(b) || getLeft.get(b)?.includes(a))
              return -1
            return 0
          })
          return pages[Math.floor(pages.length / 2)]
        }
      }
      return 0
    })
    .reduce((a, c) => a + c)
}
