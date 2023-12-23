"use strict";

// test case
// const data = ['1000', '2000', '3000', '', '4000', '', '5000', '6000', '', '7000', '8000', '9000', '', '10000'];

const data = require('fs').readFileSync('../../resource/2022/1.txt').toString().split('\r\n');

const arr = [0];
data.forEach(e => {
  if(e === '') return arr.push(0);
  arr[arr.length-1] += +e; 
});
console.log(Math.max(...arr));
