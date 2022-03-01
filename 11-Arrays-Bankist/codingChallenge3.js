/*

Rewrite the 'calcAverageHumanAge' function from Challenge #2, 
but this time as an arrow function, and using chaining!

Test data:
- Data 1: [5,2,4,1,15,8,3] 
- Data 2: [16,6,10,5,6,1,4]

GOOD LUCK 😀
*/

/*
From coding challenge 2

const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAge);
  const adultDogs = humanAge.filter(age => age >= 18);
  console.log(adultDogs);
  const averageAge =
    adultDogs.reduce(function (acc, curr) {
      return acc + curr;
    }, 0) / adultDogs.length;
  return averageAge;
};
*/

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
