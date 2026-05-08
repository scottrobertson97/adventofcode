function part1(input) {
  let sum = 0
  input.split('\r\n').forEach(game => {
    game = game.split(': ')
    const id = +game[0].substring(5)
    const rounds = game[1].split('; ')
    let possible = true
    rounds.forEach(round => {
      let blue = 0
      let red = 0
      let green = 0
      round.split(', ').forEach(item => {
        item = item.split(' ')
        if (item[1] === 'blue') blue += +item[0]
        else if (item[1] === 'red') red += +item[0]
        else if (item[1] === 'green') green += +item[0]
      })
      if (red > 12 || green > 13 || blue > 14) possible = false
    })
    if (possible) sum += id
  })
  return sum
}

function part2(input) {
  let sum = 0
  input.split('\r\n').forEach(game => {
    game = game.split(': ')
    const rounds = game[1].split('; ')
    let blue = 0
    let red = 0
    let green = 0
    rounds.map(round => {
      round.split(', ').forEach(item => {
        item = item.split(' ')
        if (item[1] === 'blue' && +item[0] > blue) blue = +item[0]
        else if (item[1] === 'red' && +item[0] > red) red = +item[0]
        else if (item[1] === 'green' && +item[0] > green) green = +item[0]
      })
    })
    sum += blue * red * green
  })
  return sum
}

export { part1, part2 }
