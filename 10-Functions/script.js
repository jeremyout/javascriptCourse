'use strict';

/*
Default parameters
*/
/*
const bookings = [];

//ES6 can specify default parameters in function definition
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5 way of implementing default parameters
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

// How to skip a parameter that we want to leave as default
createBooking('LH123', undefined, 1000);
*/

/*
How passing arguments works: Value vs Reference
*/
/*
const flight = 'LH234'; // primitive type
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};
const checkIn = function (flightNum, passenger) {
  // example only, shouldn't change passed data
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// When you pass a reference type into a function you only pass a reference to the object in
// the memory heap
// Passing a primitive is the same as creating a copy
// Passing a reference type, whatever changes in the copy will also happen to the original
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000000);
};

// example of a different function being passed the same object and modifying data
newPassport(jonas);
checkIn(flight, jonas);

// Javascript does not have passing by reference, only passing by value
// When passing an object, it passes the value of the address in memory
*/

/*
First class and high-order functions
*/
/*
// Javascript treats functions as first class citizens,
// meaning that functions are simply values
// Functions are just another type of object

// Since functions are objects/values that means you can
// - Store functions in variables or properties
const add = (a, b) => a + b;
const counter = {
  value: 23,
  inc: function () {
    this.value++;
  },
};
// - Pass functions as arguments to other functions
const btnClose = document.querySelector('button');
const greet = () => console.log('Hey Jonas');
btnClose.addEventListener('click', greet);
// - Return functions from functions
// - Call methods on functions
counter.inc.bind(someOtherObject);

// The fact that JavaScript has first class functions allows us to write
// higher order functions.
// Higher order functions:
// A function that recieves another function as an argument, that returns
// a new function, or both
// In this example, addEventListener is a higher order function and
// greet is a callback function:
btnClose.addEventListener('click', greet);
// This is only possible because of first class functions

// example of a function returning another function
function count() {
  let counter = 0;
  return function () {
    counter++;
  };
}

// First class functions are just a feature of the programming language
// all it means is that functions are values.

// There are such thing as higher order functions which are only possible with first class
// functions
*/

/*
Functions accepting callback functions
*/
/*
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher order function:
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best', upperFirstWord);
transformer('JavaScript is the best', oneWord);

const high5 = function () {
  console.log('✋');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);

// JS uses callbacks all the time
// Callback functions allow us to use abstraction (Hide the detail of code implementation)
*/

/*
Functions returning functions
*/
/*
const greet = function (greeting) {
  // This works with greeting getting passed into the returned function because of closures
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
// Re-written as arrow function:
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');
// Can also be written as the following:
greet('Hello')('Jonas');
// Call the arrow function
greetArrow('Hi')('Jonas');
*/

/*
The call and apply methods
*/
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}, // could do it this way instead
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// Creates a copy of the book method from lufthansa, but is now a function, not a method
const book = lufthansa.book;

// Could technically just do this too, this section is just to demonstrate the call mmethod
// const eurowingsJeremy = {
//   airline: 'EurowingsJeremy',
//   iataCode: 'EWJ',
//   bookings: [],
//   book: lufthansa.book,
// };

// book(23, 'Sarah Williams'); // Doesn't work as-is because the 'this' keyword is now undefined

// Call Method:

// Instead do the following. Using the call method, the first input is what we want the
// 'this' keyword to be
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// Apply method:
// Apply does not receive a list of arguments after the this keyword, it takes an array instead

const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// The apply method is not used much anymore in modern js because now we have a
// better way to do the exact same thing.. Use the spread operator and the call method
book.call(swiss, ...flightData);
console.log(swiss);

// The bind method
// bind also allows us to manually set the 'this' keyword for any function call
// The difference is that bind does not immediately call the function, instead it
// returns a new function where the 'this' keyword is bound

// Use the book function for eurowings all the time:
const bookEW = book.bind(eurowings);
bookEW(231, 'Steven Williams');

// Can bind once and then use the new functions
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

// Can also use bind to bind specific parameters
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');
console.log(eurowings);

// Applying part of the arguments beforehand, like in bookEW23, is a common pattern
// called partial application

// Bind is also useful with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();

// Doesn't work - In an event handler function, the 'this' keyword always points to the
// element on which the handler is attached to
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// Instead, use
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (taxRate, value) => value + value * taxRate;
console.log(addTax(0.1, 200));
const addVAT = addTax.bind(null, 0.23); // addVAT = value => value + value * 0.23;
console.log(addVAT(100));
console.log(addVAT(23));

// You could argue that addVAT could be done by setting default parameters, but this
// is creating a more specific function based on a more general function

// Challenge
const addTax2 = function (taxRate) {
  return function (value) {
    return value + value * taxRate;
  };
};
const addVAT2 = addTax2(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));
*/

/*
Immediately Invoked Function Expressions (IIFE)
*/
/*
// Sometimes in js we need a function that is only executed once and then never again
// basically a function that disappears after it is called once

const runOnce = function () {
  console.log('This function will never run again');
};
runOnce();

// IIFE
(function () {
  console.log('This function will never run again');
  const isPrivate = 23;
})();
// Also works for arrow functions
(() => console.log('This function will ALSO never run again'))();

// Why was this created?
// Functions create scopes. One scope does not have access to inner scope
// console.log(isPrivate); // error
// Variables declared with let or const create their own scope inside a block (Behind the scenes section)
{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate); // error
console.log(notPrivate); // works
*/

/*
Closures
*/

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

// A closure makes a function remember all the variables
// that existed at the functions birthplace

// Any function always has access to the vairable environment
// of the execution context in which the function was created

// booker was created in the execution context of secureBooking which
// was previously popped off the stack. Booker inherits the variable
// environment of secureBooking

// To reiterate:
// - A function has access to the variable environment of the
//   execution context in which it was created even after that
//   execution context is gone
// - The closure is the variable environment attached to the function, exactly as it was
//   when the function was created.
// - Scope chain is preserved through a closure, even when a scope has already been destroyed
// - Closure has priority over the scope chain. For example, if there was a global variable
//   called passengerCount set to 10, it would still use the one from the closure.

// Closure summary
// - A closure is the closed-over variable environment of the execution context in which
//   a function was created, even after that execution context is gone.
// - A closure gives a function access to all the variables of its parent function, even
//   after that parent function has returned. The function keeps a reference to its outer
//   scoppe, which preserves the scope chain throughout time.
// - A closure makes sure that a function doesn;t lose connection to variables that existed
//   at the functions birthplace.
// - A closure is like a backpack that a function carries around wherever it goes. The
//   backpack has all the variables that were present in the environment where the function
//   was created.
// - We do not have to manually create closures, this is a JavaScript feature that happens
//   automatically. We can't even access closed-over variables explicitly. A closure is NOT
//   a tangible JavaScript object.

console.dir(booker);

// Double square brackets in the console represent and internal property that we cannot access
