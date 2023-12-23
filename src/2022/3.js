"use strict";

// test case
// const data = ['vJrwpWtwJgWrhcsFMMfFFhFp', 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'PmmdzqPrVvPwwTWBwg', 'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'ttgJtRGJQctTZtZT', 'CrZsJsPPZsGzwwsLwLmpwMDw'];

const data = require('fs').readFileSync('../../resource/2022/3.txt').toString().split('\r\n');

let sum = 0;

data.forEach(e => {
  const len = e.length / 2;
  const types = {};
  const commen = [];
  const a = e.substring(0, len).split('');
  const b = e.substring(len).split('');
  a.forEach(type => { types[type] = true });
  b.forEach(type => {
    if (types[type]) {
      commen.push(type);
      types[type] = false;
    }
  })
  commen.forEach(type => {
    if (type.toLowerCase() === type) sum += type.charCodeAt() - 96;
    else sum += type.charCodeAt() - 38;
  });
});

console.log(sum);
