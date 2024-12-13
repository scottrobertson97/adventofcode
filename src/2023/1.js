"use strict";

// test case
// const data = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'];

const data = require('fs').readFileSync('../../resource/2023/1.txt').toString().split('\r\n');

function v1(data) {
  const nums = [];
  for (const word of data) {
    const arr = word.split('');
    let a, b;
    for (let i = 0; i < arr.length; i++) {
      if (!isNaN(+arr[i])) { a = arr[i]; break; }
    }
    for (let i = arr.length - 1; i >= 0; i--) {
      if (!isNaN(+arr[i])) { b = arr[i]; break; }
    }
    nums.push(+(a + b));
  }
  const sum = nums.reduce((a, b) => a + b);
  return sum;
}

function v2(data) {
  const nums = [];
  for (const word of data) {
    const arr = word.split('').filter(c => !isNaN(+c));
    const a = arr[0];
    const b = arr[arr.length - 1];
    nums.push(+(a + b));
  }
  const sum = nums.reduce((a, b) => a + b);
  return sum;
}

console.log(v1(data));
console.log(v2(data));
