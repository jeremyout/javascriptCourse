'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-03-01T17:01:17.194Z',
    '2022-03-03T23:36:17.929Z',
    '2022-03-07T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDates = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // // Get datestamp elements
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // // Set as Month/day/year
    // return `${month}/${day}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDates(date, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatCurr(
          mov,
          acc.locale,
          acc.currency
        )}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCurr(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurr(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurr(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCurr(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  const tick = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to the UI
    labelTimer.textContent = `${minutes}:${seconds}`;

    // When the time is at 0, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      // Display UI and message
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    // Decrease timer by 1 second
    time--;
  };
  // Set the time to 5 minutes
  let time = 120;
  // Call the timer every second
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // other options: long, 2-digit
      year: 'numeric',
      // weekday: 'long',
    };
    const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hours =
    //   now.getHours() > 12
    //     ? `${now.getHours() - 12}`.padStart(2, 0)
    //     : `${now.getHours()}`.padStart(2, 0);
    // const minutes = `${now.getMinutes()}`.padStart(2, 0);
    // const timeOfDay = now.getHours() > 12 ? 'pm' : 'am';
    // // Set as Month/day/year
    // labelDate.textContent = `${month}/${day}/${year}, ${hours}:${minutes} ${timeOfDay}`;

    // Start logout timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update the movement dates array
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
    // Reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
Converting and checking numbers
*/
/*
console.log(23 === 23.0);

// Base 10 -> 0 - 9 // 1/10 = 0.1 // 3/10 = 3.333
// Binary -> 0 - 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

// Can't do really precise scientific or financial calculations in js

// Conversion
console.log(Number('23'));
console.log(+'23'); // type coercion - automatically converts to a number

// Parsing
// tries to get rid of unnecessary symbols that aren't numbers. Especially useful
// if you get a unit from CSS and need to get rid of the unit
// Integer
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23 ', 10)); // string needs to start with a number to work
// parseInt accepts a second argument - radix - base of the numeral system being used

// floats
console.log(Number.parseFloat('2.5rem'));
console.log(Number.parseInt('2.5rem')); // Only returns the integer, stops at decimal point

// parseInt and parseFloat are global - don't need the 'Number.' part
console.log(parseFloat('   2.5rem   ')); // More traditional way

// Now-a-days it is preferred to use the Number object because it
// provides the Number namespace

// isNaN
// Checking if value is NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0)); // 23/0 = Infinity

// isNaN is not a perfect way for checking if a value is a number

// there is a better method, isFinite
// Checking if value is a number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0)); // 23/0 = Infinity

// isFinite is the ultimate method you should use to determine if
// a value is a number at least when you are working with floating point
// numbers.

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));

// Summary
// - isFinite is the go-to for checking if a value is a number
// - parseFloat is the go-to for reading a value out of a string,
//   for example coming from CSS
*/

/*
Math and rounding
*/
/*
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2)); // same result as sqrt
console.log(8 ** (1 / 3)); // calculate a cubic root

// get the maximum value
console.log(Math.max(5, 18, 23, 11, 2));
// (does type coercion)
console.log(Math.max(5, 18, '23', 11, 2));
// (does not parse)
console.log(Math.max(5, 18, '23px', 11, 2)); // output: NaN

// get the minimum value
console.log(Math.min(5, 18, 23, 11, 2));

// constants
console.log(Math.PI);
// calculate the area of a circle (10px is radius)
console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// Math.random() gives a value between 0...1
// In this example, we will get a value between 0...(max-min)
// If we add 1(min value), we get a number between min...(max-min+min)
// min...(max-min+min) simplifies to min...max
console.log(randomInt(10, 20));

// Rounding integers
console.log(Math.trunc(23.3)); // Output: 23

console.log(Math.round(23.3)); // Output: 23
console.log(Math.round(23.9)); // Output: 24

console.log(Math.ceil(23.3)); // Output: 24
console.log(Math.round(23.9)); // Output: 24

console.log(Math.floor(23.3)); // Output: 23
console.log(Math.floor(23.9)); // Output: 23

// all of these methods also do type coercion
console.log(Math.trunc('23.9'));
console.log(Math.round('23.3'));
console.log(Math.ceil('23.3'));
console.log(Math.floor('23.8'));

// floor an trunc are both basically the same thing when dealing
// with positive numbers. Negative numbers
console.log(Math.trunc(-23.3)); // Output: -23
console.log(Math.floor(-23.3)); // Output: -24

// Rounding decimals (floats)
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
// If we want to get a number instead of a sting, add a +
console.log(+(2.345).toFixed(2));

// The parentheses around the 2.7 in `(2.7).toFixed(0)` works similar to
// string methods. 2.7 is a primitive and primitives don't have methods.
// Behind the scenes, js performs boxing. Boxing transforms the 2.7 into
// a number object, calls the method, once finished it is converted back to
// a primitive.
*/

/*
The remainder operator
*/
/*
console.log(5 % 2); // 1
console.log(5 / 2); // 5 = 2*2 + 1

console.log(8 % 3); // 2
console.log(8 / 3); // 8 = 2*3 + 2

// Checking for an even number
console.log(6 % 2);
console.log(6 / 2);

// Odd number
console.log(7 % 2);
console.log(7 / 2);

const isEven = num => num % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row ')].forEach(function (row, i) {
    //0, 2, 4, 6,... (every second time)
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9,... (every third time)
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

//  Whenever you need to do something every nth time, that is a good use
// of the remainder
*/

/*
Numeric serparators
*/
/*
// 287,460,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

// Both of these represent the same value
const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.14_15; // not really useful
console.log(PI);

// Cannot place the '_' before decimal, after decimal, or at the end of the number
// Also cannot place two underscores in a row

// When we try to convert strings that contain underscores to a number,
// that will not work as expected.
console.log(Number('230000'));
console.log(Number('230_000')); // Output: NaN

// If you need to store a number as a string in an API,
// or get a number from an API, you should not use underscores there
// because then js will not be able to parse the number correctly
// out of the string and introduce bugs.

// Same is true  for the parseInt function, everything after underscore is ignored
console.log(parseInt('230_000')); // Output: 230
*/

/*
Working with BigInt
*/
/*
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

// Sometimes we need to work with numbers bigger than 9007199254740991
// For example, database IDs or when interacting with real 60 bit numbers

// Starting with ES2020, a new primitive was added called BigInt
// can use it to store numbers as large as we want, no matter how big

console.log(489073948798723465902997823423423424n); // use n to use big int
console.log(BigInt(489073948798723465902997823423423424));

// Operations
console.log(10000n + 10000n);
console.log(2034982039846128726487698274n * 10000000n);
// console.log(Math.sqrt(16n)); // error

// Cannot mix big int with regular numbers
const huge = 9872385476827978234767242n;
const num = 23;
// console.log(huge * num); // error: cannot mix bigint and other types
// need to convert regular number
console.log(huge * BigInt(num));

// however there are 2 exceptions to this, which are the comparison operators
// and the + operator when working with strings
console.log(20n > 15); // works
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == 20);
console.log(20n == '20');

console.log(huge + ' is really big');

// Division
console.log(10n / 3n); // returns the closest big int
console.log(10 / 3);

// This new primitive type adds some new capabilities to js
// In practice you probably won't use it very much but is still good
// to know it exists and how it works
*/

/*
Creating Dates
*/
/*
// Create a date
// there are 4 ways, all using the same constructor
const now = new Date();
console.log(now);

// Parse the date from a date string
console.log(new Date('Mar 08 2022 11:07:23'));
console.log(new Date('December 24 2015')); // Not a good idea to do this
console.log(new Date(account1.movementsDates[0]));

// Pass year, month, day, hour, minute, and secong
console.log(new Date(2037, 10, 19, 15, 23, 5)); // outputs: Thu Nov 19 2037 15:23:05
// month in javascript is zero-based
// Javascript automatically corrects dates
console.log(new Date(2037, 10, 33));

// Pass the amount of ms since beginning of unix time
console.log(new Date(0));
// 3 days after the above example
console.log(new Date(3 * 24 * 60 * 60 * 1000));

// 3 * 24 * 60 * 60 * 1000 is called a timestamp (timestamp of the day #3)

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // DON'T USE getYear!
console.log(future.getMonth()); // zero-based
console.log(future.getDate());
console.log(future.getDay()); // gets day of week, 0 = Sunday
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
// Get a nicely formatted string
console.log(future.toISOString());
// ISO string is useful for converting a date object to a string for storing

// Get the timestamp (milliseconds passed since Jan 1 1970)
console.log(future.getTime());

console.log(new Date(2142278580000));

// Get timestamp for right npw
console.log(Date.now());

// There are set versions of all of the above methods
future.setFullYear(2040);
console.log(future);
// there also exists setMonth, setDate, setDay, setHours, ...
future.setDate(3);
console.log(future);
*/

/*
Adding Dates to bankist app
*/

// Everything done above in the application section

/*
Operations with dates
*/
/*
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future));

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1);
*/

/*
Internationalizing Numbers (Intl)
*/
/*
const num = 876782.23;
const options = {
  style: 'currency', // also tried percent and unit
  unit: 'mile-per-hour', // also tried celsius
  currency: 'USD',
  // useGrouping: false,
};
console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);
*/

/*
Timers: setTimeout and setInterval
*/
/*
// Can use setTimeout to execute some code at some point in the future
// callback function is only executed once
const ingredients = ['pepperoni', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) =>
    console.log(`Here is your pizza with ${ing1} and ${ing2}! 🍕`),
  3000,
  ...ingredients
);
console.log('Waiting');
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);

// Log a real clock to the console
setInterval(function () {
  const now = new Date();

  // Clock from dividing the full date into spearate parts
  // const hours = `${now.getHours()}`.padStart(2, 0);
  // const minutes = `${now.getMinutes()}`.padStart(2, 0);
  // const seconds = `${now.getSeconds()}`.padStart(2, 0);
  // console.log(`${hours}:${minutes}:${seconds}`);

  // Clock using the Intl API
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const time = new Intl.DateTimeFormat('en-US', options).format(now);

  console.log(time);
}, 1000);
*/

/*
Implementing a countdown timer
*/
