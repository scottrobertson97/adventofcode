"use strict";

// test case
// const data = ['vJrwpWtwJgWrhcsFMMfFFhFp', 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'PmmdzqPrVvPwwTWBwg', 'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'ttgJtRGJQctTZtZT', 'CrZsJsPPZsGzwwsLwLmpwMDw'];

const data = require('fs').readFileSync('../../resource/2022/3.txt').toString().split('\r\n');

let sum = 0;

for (let i = 0; i < data.length; i += 3) {
  const a = data[i].split('');
  const b = data[i + 1].split('');
  const c = data[i + 2].split('');
  const types = {};
  a.forEach(type => {
    types[type] = 1;
  });
  b.forEach(type => {
    if(types[type] && types[type] === 1) types[type] = 2;
  });
  c.forEach(type => {
    if(types[type] && types[type] === 2) types[type] = 3;
  });
  const commen = [];
  for(const type in types) {
    if(types[type] === 3) commen.push(type)
  }
  commen.forEach(type => {
    if (type.toLowerCase() === type) sum += type.charCodeAt() - 96;
    else sum += type.charCodeAt() - 38;
  });
}
console.log(sum);
