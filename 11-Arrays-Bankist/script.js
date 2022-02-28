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

// It's better to pass data to a function than it is to use global data
const displayMovements = function (movements, sort = false) {
  // Clear the current contents of the movements area
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
    // 'beforeend' would basically invert the order of transactions
  });
};

// console.log(containerMovements.innerHTML);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};

// console.log(accounts); // outputs the accounts array with the username property in each object
// console.log(JSON.parse(JSON.stringify(accounts))); // outputs the accounts array without the username property in each object
createUsernames(accounts);
// console.log(accounts);

const calcAndDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (mov, curr) {
    return (mov += curr);
  }, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = `${out}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcAndDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// EVENT HANDLERS
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  // if we can't find the account (currentAccount === undefined), then the line
  // below will error out because the pin property doesn't exist. We can use
  // optional chaining to correct this
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value.toLowerCase()
  );
  // clear the input fields
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    // recieverAccount && // replaced with optional chaining below
    currentAccount.balance >= amount &&
    recieverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
    // Clear the UI
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    console.log('verified');
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    // Delete the account
    accounts.splice(index, 1);
    // Hide the UI
    containerApp.style.opacity = 0;
    // clear the input fields
    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();
  } else {
    console.log('validation failed, pin provided:', inputClosePin.value);
  }
});

let currentlySorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !currentlySorted);
  currentlySorted = !currentlySorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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
/*
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
*/

/*
forEach with Maps and Sets
*/
/*
// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _, set) {
  console.log(`${_}: ${value}`);
});
// Sets don't have keys or indexes, so the second parameter in the callback function
// just gets set to the first parameter
// _ in js just means a throwaway variable
*/

/*
Project: 'Bankist' App
*/

// 4 account objects at the top of the file
// Each of the account objects get put into the accounts array
// Why not use a map instead? Pretending that all the data is coming from an API.
// Data from objects typically comes in the form of Objects
// Storing the objects in an array is one of the most common ways of organizing data in js applications

/*
Creating DOM elements
*/

// Work done above with the displayMovements function

/*
Data transformations: Map, filter, reduce
*/
/*
// The map method is yet another method that we can use to loop over arrays.
// - Map is similar to the forEach method but Map creates a
//   brand new array containing the results of applying an operation
//   on all original elements.

const arr = [3, 1, 4, 3, 2];
const map1 = arr.map(x => x * 2);
console.log(arr, map1);

// The filter method is used to filter for elements from the original
// array that satisfy a certain condition.
// - Creates a new array containing the elements that pass a specified
//   test condition

const filter1 = arr.filter(x => x > 2);
console.log(arr, filter1);

// The reduce method boil all array elements down to a single value
// (Example: adding all elements together)

const reduce1 = arr.reduce((previous, current) => previous + current);
console.log(arr, reduce1);
*/

/*
The map method
*/
/*
// The map method does not mutate the original method

const eurToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});

// Arrow function version
// const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (let mov of movements) {
  movementsUSDfor.push(mov * eurToUsd);
}
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(function (mov, i) {
  return `Movement ${
    i + 1
  }: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`;
});
console.log(movementsDescriptions);
*/

/*
Computing usernames
*/

// Done above

/*
The filter method
*/
/*
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);

// For of implementation to achieve the same result as the filter above
const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
console.log(depositsFor);

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals);
*/

/*
The reduce method
*/
/*
console.log(movements);

// acc means accumulator here, like a snowball
const balance = movements.reduce(function (acc, curr, i, arr) {
  console.log(i, acc);
  return acc + curr;
}, 0);
// Arrow function implementation
// const balance = movements.reduce((acc, curr) => acc + curr, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}
console.log(balance2);

// Maximum value
const maxValue = movements.reduce(function (acc, curr) {
  return acc > curr ? acc : curr;
}, movements[0]);
console.log(maxValue);
*/

/*
The magic of chaining methods
*/
/*
const eurToUsd = 1.1;
console.log(movements);

// Pipeline
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

// Can run into problems and want to examine the values at each step
// Use the extra parameters available on the map like shown above
// to access the array

// We should not overuse chaining. Chaining tons of methods one after the
// other can cause real performance issues if we have large arrays. Try to
// compress all the functionality that they do into as little methods as possible.
// For example, we sometimes create way more map methods than we need where we could
// just do it all in one map call.

// It is a bad practice in JavaScript to chain methods that mutate the
// original array. An example of that is the splice and reverse methods.
*/

/*
The find method
*/
/*
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

// Unlike the filter method, the find method will not return an array with
// all elements that match. The filter also returns a NEW array.

// The find method only returns the first element that satisfies the
// specified condition.

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// For of implementation of the find method
const accountForOf = function (accs) {
  for (const acc of accs) {
    if (acc.owner === 'Jessica Davis') {
      return acc;
    }
  }
};
console.log(accountForOf(accounts));
*/

/*
The findIndex method
*/

// Used in the close account feature setion above

/*
some and every methods
*/
/*
console.log(movements);
// .includes only checks for equality
console.log(movements.includes(-130));
// same thing using the some method (just for example, use includes for equality)
console.log(movements.some(mov => mov === -130));

// some method checks for a specific condition
const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

// Further changes located above for the loan feature

// every method
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

/*
flat and flatMap
*/
/*
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat());

// the flat method only goes one level deep as
// demonstrated with the flat call on arrDeep
// can take an input to specify depth, default is 1

console.log(arrDeep.flat(2));

// More realistic example, want to display the movement of all accounts

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// Can optimize the above functionality with function chaining
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// Creating a map and then flattening it is pretty common, and that's
// why the flatMap method exists. flatMap is also better for performance.

// flatMap needs to receive exactly the same input as the map method
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);

// flatMap only goes one level deep, so if you need to go deeper than one level
// you still need to tuse the flat method
*/

/*
Sorting arrays
*/

// Strings (alphabetical)
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
// sort mutates the original array, so you need to be careful
console.log(owners);

// Numbers
console.log(movements);
console.log(movements.sort());
// movements.sort() did not yield expected result. This is because
// the sort method converts everything to strings and then it sorts

// ASCENDING
// return < 0 -> A,B (keep order)
// return > 0 -> B,A (switch order)
// movements.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   }
//   if (a < b) {
//     return -1;
//   }
// });
// Can improve on this with math, if a > b then the result is a positive number
// if a < b, the result will be a negative number.
movements.sort((a, b) => a - b);
console.log(movements);

// DESCENDING
// return < 0 -> A,B (keep order)
// return > 0 -> B,A (switch order)
// movements.sort((a, b) => {
//   if (a > b) {
//     return -1;
//   }
//   if (a < b) {
//     return 1;
//   }
// });
// Can improve on this with math, if b > a then the result is a positive number
// if b < a, the result will be a negative number.
movements.sort((a, b) => b - a);
console.log(movements);
