'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const hours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
  // Using a template literal to compute a property name
  // [`day-${2 + 4}`]: {
  //   open: 0, // Open 24 hours
  //   close: 24,
  // },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  //Pre-ES6 -- needed to specify even if the name is the same
  // openingHours: openingHours,
  //ES6 Enhanced Object literals -- don't need to specify if name is the same
  hours,

  // Pre-ES6 -- needed the function to specify methods
  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },
  //ES6 enhancement -- don't need the 'function' keyword
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
  },
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/*
Destructuring Arrays
*/
/*
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// Split the array into individual parameters
const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

// Only take specific elements out of the categories array
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// How to swap without destructuring (need a temp variable)
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// Swapping with destructuring
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receive 2 return values from a function and put into their own variables
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8];
console.log(p, q, r);
*/

/*
Object destructuring
*/
/*
const { name, openingHours, categories } = restaurant;
console.log(name);
console.log(openingHours);
console.log(categories);

// Rename the parameter from its object name
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName);
console.log(hours);
console.log(tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu);
console.log(starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b);

// Nested Objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

//
restaurant.orderDelivery({
  time: '23:30',
  address: 'Via del sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

// uses default values specified in the function declaration
restaurant.orderDelivery({
  address: 'Via del sole, 21',
  starterIndex: 1,
});
*/

/*
The spread operator
*/
/*
const arr = [7, 8, 9];
const badNewArray = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArray);

const newArr = [1, 2, ...arr];
console.log(newArr);

// logs the elements of the array individually
console.log(...newArr);
// the above line provides the same result as this
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// The spread operator takes all the elements out of an array
// without making new variables. Can only use it in places
// where you would otherwise create new values separated by commas

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join two or more arrays together
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// The spread operator works on all iterables.
// (arrays, strings, maps or sets)
// but not objects!

const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);
// The following is not allowed
// console.log(`${...str} Schmedtmann`); // error: unexpected token '...'

// Can only use the spread operator when building an array
// or passing values into a function

// const ingredients = [
//   prompt("Let's make some pasta, ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];

// // Old way
// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// // New way using spread
// restaurant.orderPasta(...ingredients);

// Since ES2018, the spread operator also works on objects
// even though objects are not iterables
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
// Doesn't set the name for the old restaurant like previous examples
restaurantCopy.name = 'Ristoraunte Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
*/

/*
Rest pattern and parameters
*/
/*
// 1) Destructuring

// Spread because used on the right side of the equal sign
const arr = [1, 2, ...[3, 4]];

// Rest because used on the left side of the equal sign
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

// The Rest operator always has to be last in the assignment
// There can only be one Rest in any destructuring assignment
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Rest with Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

// 2.) Functions
const add = function (...numbers) {
  let sum = 0;
  console.log(numbers);
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onions', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
*/

/*
Short circuiting (&& and ||)
*/
/*
console.log('------ OR ------');
// Can use ANY data type
// Can return ANY data type
// Can short circuit
// - (If the first value is truthy, it will immediately return)
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// restaurant.numGuests = 23;
const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guest1);

const guest2 = restaurant.numGuests || 10;
console.log(guest2);

console.log('------ AND ------');
// short circuits with the falsy value
// If the first value is falsy, it means the entire result will be
// false anyways so there is no need to look at other operands
console.log(0 && 'Jonas');
// Because first value is truthy,
// evaluation continues and the last value is returned
console.log(7 && 'Jonas'); // returns Jonas

// short circuits the rest of the evaluation when it reaches null
console.log('Hello' && 23 && null && 'Jonas');

// Order pizza if the function exists
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
// Alternate way of doing this with short circuiting
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
*/

/*
The Nullish Coalescing Operator (??)
*/
/*
restaurant.numGuests = 0;
const guest = restaurant.numGuests || 10;
console.log(guest);

// Nullish values: null and undefined (NOT 0 and '')
// Only nullish values short circuit the operation
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
*/

/*
Logical assignment operators
*/
/*
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// OR assignment operator
// The logical OR assignment (x ||= y) operator only assigns if x is falsy.
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// In this case, if rest1.numGuests = 0, rest1.numGuests will get set to 10
// rest2.numGuests doesn't exist, so it gets added and set to 10.
// If rest1.numGuests = 20, it will use that value instead of 10.
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// Nullish coalescing assignment operator (null or undefined)
// The logical nullish assignment (x ??= y) operator only assigns if x is nullish (null or undefined).
// In this case, with rest1.numGuests = 0, rest1.numGuests will remain zero
// but rest2 doesn't have a numGuests property so it adds the property
// and sets the value to 10
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

//AND assignment operator
// The logical AND assignment (x &&= y) operator only assigns if x is truthy.
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
// In this case, owner is not part of rest1, so nothing happens
// but rest2 has an owner property so it gets set to anonymous
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);
*/

/*
Looping arrays: The for-of loop
*/
/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

for (const item of menu) console.log(item);

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

// console.log([...menu.entries()]);
*/

/*
Enhanced object literals
*/

// See modifications to the objects at the top

// This lecture was regarding ES6 object enhancements
// 1. If you want to add an object to another object using the same name you can just
//    use the name of the object being imported.
//    (Example -- Don't need to do openingHours: openingHours with ES6)
// 2. Don't need to use the 'function' keyword when creating methods with ES6
// 3. You can compute property names
