'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
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
  openingHours,

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

/*
Optional chaining (?.)
*/
/*
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// WITH optional chaining
// If a certain property does not exist then undefined is returned immediately
console.log(restaurant.openingHours.mon?.open);
// Without optional chaining will generate an error
// console.log(restaurant.openingHours.mon.open);
// Can have multiple optional chainings
console.log(restaurant.openingHours?.mon?.open);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  if (typeof open === 'number') {
    console.log(`On ${day}, we open at ${open}`);
  } else {
    console.log(`On ${day}, we're ${open}`);
  }
}

// Methods - can check if a method exists before using
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];

console.log(users[0]?.name ?? 'User array empty');
console.log(users[1]?.name ?? 'User array empty');
*/

/*
Looping Objects: Object keys, values, and entries
*/
/*
// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);
let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) openStr += `${day}, `;
console.log(openStr);

// Propert VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
console.log(entries);

// Immediately destrucure the object within the for loop
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}
*/

/*
Sets
*/
/*
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
// Only shows unique entries, Doesn't show duplicates
console.log(ordersSet);
// Just like arrays, sets are iterables
// Order is irrelevant in a set

// Strings are also iterables (will split the string into individual elements)
console.log(new Set('Jonas'));

// Methods available within a set
console.log(ordersSet.size);
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
console.log(ordersSet);
// ordersSet.clear();
// console.log(ordersSet);

// In a set, there are no indeces. No way to get values out of a set
// there is no need to get data out of a set. Just use an array in that case

for (const order of ordersSet) {
  console.log(order);
}

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);
// Get how many different(unique) letters there are in a string
console.log(new Set('jonasschmedtmann').size);

// Conclusion: Sets are not intended to replace arrays at all. Whenever you need
// to store values in order that might contain duplicates always just use arrays.
// Also true when you need to manipulate data because arrays have access to a lot of methods
*/

/*
Maps: Fundamentals
*/
/*
// Much more useful than sets
// A map is a data structure that we can use to map values to keys
// Data is stored in key value pairs, keys can have any type

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
// The set method returns the updated map
console.log(rest.set(2, 'Lisbon, Portugal'));

// Can chain the set method
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 8;
// The result of the line below will result in a true or false return
// true and false are also keys in the map, so it will return the value
// for the true and false keys
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// Other methods available with Maps
console.log(rest.has('categories'));
rest.delete(2);
console.log(rest);
console.log(rest.size);
// rest.clear();
// console.log(rest);
// console.log(rest.size);

// Demonstrating that we can use arrays or objects as Map keys
rest.set([1, 2], 'Test');
console.log(rest);
// Not the same as the key [1,2]. Different objects in the heap
console.log(rest.get([1, 2]));
// Can get around this by making an array beforehand and using that array in the set and get
const arr = [1, 2];
rest.set(arr, 'Test2');
console.log(rest.get(arr));

// Very useful to use DOM elements as keys
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
*/

/*
Maps: Iteration
*/
/*
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again'],
]);
console.log(question);

// The above is the same array structure that is obtained from calling Object.entries()
console.log(Object.entries(openingHours));
// Convert object to map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Iteration is possible on Maps because Maps are also iterables. For loop is available for them
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
let answer;
do {
  answer = Number(prompt('Your answer'));
  // console.log(answer);
  console.log(question.get(answer === question.get('correct')));
} while (answer !== question.get('correct'));

// Sometimes we need to convert a map back to an array (use the spread operator on the map)
console.log([...question]);
// entries, keys, and values are also available
// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);
*/

/*
Summary: Which Data Structure to use?
*/

// Sources of Data
// 1. From the program itself: Data written directly in source code (status messages)
// 2. From the UI: Data input from the user or data written in DOM (Tasks in todo app)
// 3. From external sources: Data fetched for example from a web API (recipe objects)

// Collections of data -- Stored in data structures
// 4 built in data structures in javascript
// Simple list? --> Array or Set
// Key value pairs? --> Objects or Maps (keys allow us to describe values)

// Data from web APIs typically comes in JSON
// JSON can easily be converted into javascript objects because it uses the same formatting as
// javascript objects and arrays

// Other built in javascript data structures
// - WeakMap
// - WeakSet

// Non-built in
// - Stacks
// - Queues
// - Linked list
// - Trees
// - Hash tables

/*
Arrays vs Sets and Objects vs. Maps
*/
/*
// Arrays
// - Use when you need ordered list of values (might contain duplicates)
// - Use when you need to manipulate data
const taskArray = ['Code', 'Eat', 'Code'];
// ['Code', 'Eat', 'Code']

// Sets
// - Use when you need to work with unique values
// - Use when high-performance is really important
// - Use to remove duplicates
const taskSet = new Set(['Code', 'Eat', 'Code']);
// ['Code', 'Eat']

// Objects
// - More traditional key/value store ("abused objects")
// - Easier to write and access values with . and []
// - Use when you need to include functions (methods). Can use the this keyword
// to access properties of the same object which is impossible with Maps
// - Use when working with JSON (can convert to map)
const taskObject = {
  task: 'Code',
  date: 'today',
  repeat: true,
};

// Maps
// - Better performance
// - Keys can have any data type
// - Easy to iterate
// - Easy to compute size
// - Use when you simply need to map keys and values
// - Use when you need keys that are not strings
const taskMap = new Map([
  ['task', 'Code'],
  ['date', 'today'],
  [false, 'Start coding!'],
]);
*/

/*
Working with Strings - Part 1
*/
/*
const airline = 'TAP Air Portugal';
const plane = 'A320';

// Get individual elements of a string
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

// Get the length of a string
console.log(airline.length);
console.log('B737'.length);

// Methods
console.log(airline.indexOf('r')); // strings are 0 based
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal')); // case sensitive, will return -1 if not found

// Extract parts of a string with the slice method - returns a substring.
// Does not modify original
console.log(airline.slice(4)); //Air Portugal
console.log(airline.slice(4, 7)); //Air

// Extract the first word of airline
console.log(airline.slice(0, airline.indexOf(' ')));
// Extract the last word of airline
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// Can input negative numbers into the slice
console.log(airline.slice(-2)); // al
console.log(airline.slice(1, -1));

// Practice - Write a function that checks and airline seat to determine if its the middle seat
function checkMiddleSeat(seat) {
  // B and E are the middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log('You got the middle seat 😬');
  } else {
    console.log('You got lucky 🎉');
  }
}

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('16E');

// Whenever you call string methods on primitive strings, javascript converts
// the string primitive into a string object. This is called Boxing
console.log(new String('jonas'));
console.log(typeof new String('jonas'));
// Once complete, the object then gets converted back into a string primitive
console.log(typeof new String('jonas').slice(1));
*/

/*
Working with Strings - Part 2
*/
/*
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAs'; // Fix to be - Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Practice - Make a function to take any passenger name and correct it
function fixPassengerName(name) {
  // convert to lower case
  const lowercase = name.toLowerCase();
  return lowercase[0].toUpperCase() + lowercase.slice(1);
}
console.log(fixPassengerName('bONNiE'));
console.log(fixPassengerName('JESSIE'));
console.log(fixPassengerName('mAddIe'));

// Comparing email
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';
// When checking user input, the first step is to convert to lower case
// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// Simpler
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// Replacing parts of strings
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
// Only replaces first occurence
console.log(announcement.replace('door', 'gate'));
// console.log(announcement.replaceAll('door', 'gate')); // Does work for me

// create a regular expression (Use / instead of ' and add a 'g' at the end for global)
console.log(announcement.replace(/door/g, 'gate'));

// Booleans (includes, startsWith, endsWith)
const newPlane = 'Airbus A320neo';
console.log(newPlane.includes('A320'));
console.log(newPlane.includes('Boeing'));
console.log(newPlane.startsWith('Air'));

// Check if the current plane is part of the new airbus family
if (newPlane.startsWith('Airbus') && newPlane.endsWith('neo')) {
  console.log('Part of the new Airbus family');
}

// Practice
const checkBaggage = function (items) {
  // convert to lowercase
  const baggage = items.toLowerCase();

  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some Food, and a pocket Knife');
checkBaggage('Socks and a camera');
checkBaggage('I have some snacks and a gun for protection');
*/

/*
Working with Strings - Part 3
*/
/*
// Split method
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));
const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
// Join method
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.toLowerCase().split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding a string
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

// Example of masking a credit card number
const maskCreditCard = function (number) {
  // will automatically convert the number to a string because one of the operands is a string
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(87637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('34394873964873474747'));

// Repeat method
const message2 = 'Bad Weather... All departures Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
};

planesInLine(5);
planesInLine(3);
planesInLine(12);
*/

/*
String Methods Practice
*/

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Goal is to get the string above formatted like this:
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)
// console.log(flights.split('+'));

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.trim().startsWith('_Delayed') ? '🔴' : ''} ${type
    .replaceAll('_', ' ')
    .trim()} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(44);
  console.log(output);
}
