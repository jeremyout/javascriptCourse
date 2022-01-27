'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
Simple array methods
*/
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// Slice
console.log(arr.slice(2));
// End is not included in the output, just like strings
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
// A way to always get the last element of an array
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
// Create a shallow copy of an array
console.log(arr.slice());
// Can accomplish the same result by making a new array and using the spread operator
console.log([...arr]);

// Splice - mutates the original array
arr.splice(1, 2);
console.log(arr);

console.log(arr.splice(2));
console.log(arr);
// Most of the time splice is used to delete from an array
// A common use case is to just remove the last element of an array
let lastElementArr = arr.splice(-1);
console.log(lastElementArr);
console.log(arr);

// Reverse - mutates the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// Concat
const letters = arr.concat(arr2);
console.log(letters);
console.log(arr);
console.log(arr2);
// We've done this before like this (doesn't mutate the original):
console.log([...arr, ...arr2]);

// Join
console.log(letters.join(' - '));
*/

/*
The new at method
*/
/*
const arr = [23, 11, 64];
console.log(arr[0]);
// Can replace the bracket notation above with the new at method:
console.log(arr.at(0));

// Getting the last element in an array
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1)); // Negative starts counting from the right

// Should you use the new at method or bracket notation?
// It depends. If you want the last element of an array, you should probably use the at method
// Also if you want to do method chaining, the at method is also great for that
// On the other hand, if you just want to quickly get a value from an array, you can keep
// using bracket notation

// The at method also works on strings
console.log('jonas'.at(0));
console.log('jonas'.at(-1));
*/

/*
Looping arrays: forEach
*/

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log('---- FOR OF ----');
// Old way
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---- FOR OF WITH ITERATOR ----');
// Getting the iterator
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---- FOR EACH ----');
// New
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(-400)
// ...

console.log('---- FOR EACH WITH ITERATOR ----');
movements.forEach(function (mov, i, array) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

// When to use forEach and when to use for of:
// - You cannot break out of a forEach loop (Can't use break or continue).
//   forEach will always loop over the whole array
// - Other than that, it is personal preference
