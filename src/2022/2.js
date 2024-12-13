"use strict";

// test case
// const data = ['A Y', 'B X', 'C Z'];

const data = require('fs').readFileSync('../../resource/2022/2.txt').toString().split('\r\n');

const types = { A: 'Rock', X: 'Rock', B: 'Paper', Y: 'Paper', C: 'Scissors', Z: 'Scissors' };
const points = { 'Rock': 1, 'Paper': 2, 'Scissors': 3 };
const score = {
  'Rock': {
    'Rock': 3,
    'Paper': 6,
    'Scissors': 0
  },
  'Paper': {
    'Rock': 0,
    'Paper': 3,
    'Scissors': 6
  },
  'Scissors': {
    'Rock': 6,
    'Paper': 0,
    'Scissors': 3
  }
};

let sum = 0;
data.forEach(e => {
  const opp = types[e[0]];
  const self = types[e[2]];
  sum += points[self];
  if (opp === self) return sum += 3;
  sum += score[opp][self];
});
console.log(sum);
