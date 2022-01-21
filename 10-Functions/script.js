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
