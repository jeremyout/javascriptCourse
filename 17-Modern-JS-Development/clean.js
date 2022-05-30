'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);
// Object.freeze is not a deep freeze
budget[0].value = 10000; // this works
// budget[9] = 'jonas'; // this doesn't work
// There are third party libraries which implement a deep freeze

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 200;
// console.log(spendingLimits); // jay is not present

const getLimit = (user, limits) => limits?.[user] ?? 0;

// Shouldn't have more than 3 parameters being passed to a function, but
// sometimes its not a big deal
// We could instead pass in one object of options, but we're keeping it simple here
// This is now a pure function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();
  // spread operator creates a copy!
  return value <= getLimit(cleanUser, limits)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
console.log(newBudget1);
console.log(newBudget2);
console.log(newBudget3);
// In the real world, we would use some called composing and the technique called currying
// to create the chain of operations above.

// Transformed into a pure function (doesn't mutate anything) because the map method
// returns a brand new array and the spread operator creates a copy of the entry with a
// new property attached
const checkExpenses = function (state, limits) {
  // for (const entry of newBudget3)
  //   if (entry.value < -getLimit(entry.user, limits)) entry.flag = 'limit';
  return state.map(entry => {
    // spread operator creates a copy!
    return entry.value < -getLimit(entry.user, limits)
      ? { ...entry, flag: 'limit' }
      : entry;
  });
};
// Same function as above implemented as an arrow function
// const checkExpenses = (state, limits) =>
//   state.map(entry =>
//     entry.value < -getLimit(entry.user, limits)
//       ? { ...entry, flag: 'limit' }
//       : entry
//   );
const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// Impure because it uses console.log
const logBigExpenses = function (state, bigLimit) {
  // let output = '';
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);

  // The for loop was constantly manipulating the output variable (goes against immutability)
  // In functional code, you will probably never see the let variable. You are always trying
  // to compute a variable based on methods
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  // Instead of using map and join, we could have just used reduce:
  // const bigExpenses = state
  //   .filter(entry => entry.value <= -bigLimit)
  //   .reduce((str, curr) => `${str} / ${curr.description.slice(-2)}`, '');
  console.log(bigExpenses);
};

console.log(budget);
logBigExpenses(finalBudget, 500);

/*
Let's fix some bad code, part 2
*/

// We're going to focus on 3 big areas of functional js
// - Immutability
// - Side effects and pure functions
// - Making data transformations using pure functions (map, filter, reduce)

// Starting with immutability
// In js, there is a way to make a data structure(array, object) immutable
// See changes to spendingLimits above
// By using Object.freeze, spendingLimits is now immutable and we can no longer
// put any new properties into it

// Final note: Can use the npm start script or live-server
