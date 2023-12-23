"use strict";

// test case
// const data = ['two1nine', 'eightwothree', 'abcone2threexyz', 'xtwone3four', '4nineeightseven2', 'zoneight234', '7pqrstsixteen'];
// const data = ['xtwone3four'];

const data = require('fs').readFileSync('../../resource/2023/1.txt').toString().split('\r\n');

const spelledNumsDict = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
};
const spelledNums = Object.keys(spelledNumsDict);

function v1() {
  const nums = [];
  for (const word of data) {
    let a, b;
    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      if (!isNaN(+c)) { a = c; break; }
      const found = spelledNums.find(e => e == word.substring(i, i + e.length));
      if (found) { a = spelledNumsDict[found]; break; }
    }
    for (let i = word.length - 1; i >= 0; i--) {
      const c = word[i];
      if (!isNaN(+c)) { b = c; break; }
      const found = spelledNums.find(e => e === word.substring(i, i + e.length));
      if (found) { b = spelledNumsDict[found]; break; }
    }
    nums.push(+(a + b));
  }
  const sum = nums.reduce((a, b) => a + b);
  return sum;
}

console.log(v1());
