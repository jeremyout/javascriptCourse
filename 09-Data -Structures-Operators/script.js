'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2}, and ${ing3}`
    );
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
