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
