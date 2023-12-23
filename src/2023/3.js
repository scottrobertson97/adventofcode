"use strict";

// test case
// const data =
//   `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`.split('\n').map(row => row.split(''));

const data = require('fs').readFileSync('../../resource/2023/3.txt').toString().split('\r\n').map(row => row.split(''));
// console.log(data);
const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const allNums = []
for (let i = 0; i < data.length; i++) {
  let readingNum = false;
  let numBuffer = [];
  let hasSymbol = false;
  for (let j = 0; j < data[i].length; j++) {
    const n = data[i][j];
    if (NUMS.find(num => num === n)) {
      readingNum = true;
      numBuffer.push(n);
      const adjacents = getAdjacents(j, i);
      if (adjacents.find(e => !(NUMS.find(num => num === e) || e === '.'))) hasSymbol = true;
    } else {
      if (readingNum && hasSymbol) allNums.push(+numBuffer.join(''));
      readingNum = false;
      numBuffer = [];
      hasSymbol = false;
    }
  }
}

const sum = allNums.reduce((a, b) => a + b);
console.log(sum);

function getAdjacents(x, y) {
  const arr = [];
  if (data[y - 1] !== undefined && data[y - 1][x - 1] !== undefined) arr.push(data[y - 1][x - 1]); //top left
  if (data[y - 1] !== undefined && data[y - 1][x] !== undefined) arr.push(data[y - 1][x]);     //top mid
  if (data[y - 1] !== undefined && data[y - 1][x + 1] !== undefined) arr.push(data[y - 1][x + 1]); //top right
  if (data[y] !== undefined && data[y][x - 1] !== undefined) arr.push(data[y][x - 1]); //mid left
  if (data[y] !== undefined && data[y][x + 1] !== undefined) arr.push(data[y][x + 1]); //mid right
  if (data[y + 1] !== undefined && data[y + 1][x - 1] !== undefined) arr.push(data[y + 1][x - 1]); //bottom left
  if (data[y + 1]  !== undefined&& data[y + 1][x] !== undefined) arr.push(data[y + 1][x]); //bottom mid
  if (data[y + 1] !== undefined && data[y + 1][x + 1] !== undefined) arr.push(data[y + 1][x + 1]); //bottom right
  return arr;
}