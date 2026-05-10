function parseMachine(line) {
  const diagramEnd = line.indexOf(']')
  const diagram = line.slice(1, diagramEnd)
  const requirements = line
    .match(/\{([^}]*)\}/)[1]
    .split(',')
    .map(Number)
  const target = [...diagram].reduce((mask, light, index) => {
    return light === '#' ? mask | (1 << index) : mask
  }, 0)

  const buttonCounters = [...line.matchAll(/\(([^)]*)\)/g)].map(match => {
    if (match[1] === '') return []

    return match[1]
      .split(',')
      .map(Number)
  })
  const buttons = buttonCounters.map(counters => {
    return counters.reduce((mask, index) => mask | (1 << index), 0)
  })

  return {
    lightCount: diagram.length,
    requirements,
    buttonCounters,
    target,
    buttons,
  }
}

function parseMachines(input) {
  if (input === '') return []
  return input.split(/\r?\n/).map(parseMachine)
}

function fewestPresses(machine) {
  const stateCount = 1 << machine.lightCount
  const distances = Array(stateCount).fill(-1)
  const queue = [0]
  distances[0] = 0

  for (let i = 0; i < queue.length; i++) {
    const state = queue[i]
    if (state === machine.target) return distances[state]

    for (const button of machine.buttons) {
      const nextState = state ^ button
      if (distances[nextState] !== -1) continue

      distances[nextState] = distances[state] + 1
      queue.push(nextState)
    }
  }

  throw new Error(`No button combination can produce target ${machine.target}`)
}

function part1(input) {
  return parseMachines(input)
    .map(fewestPresses)
    .reduce((total, presses) => total + presses, 0)
}

function reduceEquations(matrix) {
  const pivotColumns = []
  let row = 0

  for (let column = 0; column < matrix[0].length - 1 && row < matrix.length; column++) {
    const pivot = matrix.findIndex((values, index) => {
      return index >= row && Math.abs(values[column]) > Number.EPSILON
    })
    if (pivot === -1) continue

    ;[matrix[row], matrix[pivot]] = [matrix[pivot], matrix[row]]

    const divisor = matrix[row][column]
    for (let i = column; i < matrix[row].length; i++) {
      matrix[row][i] /= divisor
    }

    for (let i = 0; i < matrix.length; i++) {
      if (i === row) continue

      const factor = matrix[i][column]
      if (Math.abs(factor) <= Number.EPSILON) continue

      for (let j = column; j < matrix[i].length; j++) {
        matrix[i][j] -= factor * matrix[row][j]
      }
    }

    pivotColumns.push(column)
    row++
  }

  return pivotColumns
}

function joltagePresses(machine) {
  const variableCount = machine.buttonCounters.length
  const matrix = machine.requirements.map((requirement, counter) => {
    const coefficients = machine.buttonCounters.map(button => {
      return button.includes(counter) ? 1 : 0
    })

    return [...coefficients, requirement]
  })

  const pivotColumns = reduceEquations(matrix)
  const pivotColumnSet = new Set(pivotColumns)
  const freeColumns = []
  for (let i = 0; i < variableCount; i++) {
    if (!pivotColumnSet.has(i)) freeColumns.push(i)
  }

  for (const row of matrix) {
    const hasCoefficient = row.slice(0, variableCount).some(value => Math.abs(value) > 1e-9)
    if (!hasCoefficient && Math.abs(row[variableCount]) > 1e-9) {
      throw new Error('No button combination can produce joltage requirements')
    }
  }

  const buttonMaxes = machine.buttonCounters.map(button => {
    if (button.length === 0) return 0
    return Math.min(...button.map(counter => machine.requirements[counter]))
  })
  const solution = Array(variableCount).fill(0)
  let best = Infinity

  function testSolution() {
    for (let i = 0; i < pivotColumns.length; i++) {
      const column = pivotColumns[i]
      const value = matrix[i][variableCount] - freeColumns.reduce((total, freeColumn) => {
        return total + matrix[i][freeColumn] * solution[freeColumn]
      }, 0)
      const rounded = Math.round(value)

      if (Math.abs(value - rounded) > 1e-7 || rounded < 0) return
      solution[column] = rounded
    }

    const presses = solution.reduce((total, value) => total + value, 0)
    if (presses < best) best = presses
  }

  function search(index) {
    if (index === freeColumns.length) {
      testSolution()
      return
    }

    const column = freeColumns[index]
    for (let value = 0; value <= buttonMaxes[column]; value++) {
      solution[column] = value
      search(index + 1)
    }
  }

  search(0)

  if (best === Infinity) {
    throw new Error('No nonnegative integer button counts can produce joltage requirements')
  }

  return best
}

function part2(input) {
  return parseMachines(input)
    .map(joltagePresses)
    .reduce((total, presses) => total + presses, 0)
}

export { part1, part2 }
