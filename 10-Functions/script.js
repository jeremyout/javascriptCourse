'use strict';

/*
Default parameters
*/

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
