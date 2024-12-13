"use strict";

// test case
// const data = ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
//   'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
//   'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
//   'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
//   'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'];

const data = require('fs').readFileSync('../../resource/2023/2.txt').toString().split('\r\n');

let sum = 0;
data.forEach(game => {
  game = game.split(': ');
  const id = +game[0].substring(5);
  const rounds = game[1].split('; ');
  let possible = true;
  rounds.forEach(round => {
    let blue = 0;
    let red = 0;
    let green = 0;
    round.split(', ').forEach(item => {
      item = item.split(' ');
      if (item[1] === 'blue') blue += +item[0];
      else if (item[1] === 'red') red += +item[0];
      else if (item[1] === 'green') green += +item[0];
    });
    if (red > 12 || green > 13 || blue > 14) possible = false;
  });
  if (possible) sum += id;
});

console.log(sum);
