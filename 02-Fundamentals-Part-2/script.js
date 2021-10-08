// Activate strict mode (can be used for individual functions if desired)
'use strict';
/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;

if (hasDriversLicense) console.log('I can drive');

/*
Not valid because of reserved words
*/
// const interface = 'Audio';
// const private = 534;
// const if = 23;


/*
Functions
*/
/*
function logger() {
    console.log('My name is Jonas');
}

// calling/running/ invoking the function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
// console.log(fruitProcessor(5, 0));
const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

const num = Number('23');
*/

/*
Function Declarations vs Expressions
*/
/*
const age1 = calcAge1(1991);

//Function Declaration (can be called before they are defined)
function calcAge1(birthYear) {
    return 2037 - birthYear;
}
// const age1 = calcAge1(1991);


//Function Expression (cannot be called before they are defined)
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}
const age2 = calcAge2(1991);

console.log(age1, age2);
*/

/*
Arrow Functions
*/
/*
//Arrow function
const calcAge3 = birthYear => 2037 - birthYear;

const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    // return retirement;
    return `${firstName} retires in ${retirement} years.`
}

console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1980, 'Bob'));
*/

/*
Functions calling other functions
*/
/*
function cutFruit(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruit(apples);
    const orangePieces = cutFruit(oranges);
    const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
    return juice;
}

console.log(fruitProcessor(2, 3));
*/

/*
Introduction to Arrays
*/
/*
const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

const y = new Array(1991, 1984, 2008, 2020);
console.log(y);

console.log(friends[0]);
console.log(friends[2]);
console.log(friends.length);
console.log(friends[friends.length - 1]);

// Can modify elements of an array despite being declared as const.
friends[2] = 'Scotty';
console.log(friends[2]);
console.log(friends);

// Cannot re-assign a const array, example:
// friends = ['Ann', 'Bob'];

const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];

console.log(jonas);
console.log(jonas.length);

// Exercise
const calcAge = function (birthYear) {
    return 2037 - birthYear;
}
const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

// Rather than doing the above, you can use the function calls within the array initialization
const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[years.length - 1])];
console.log(ages);
*/

/*
Basic Array Operations
*/
const friends = ['Michael', 'Steven', 'Peter'];
// Add elements
const newLength = friends.push('Jay'); // Adds to the end of the array
console.log(friends);
console.log(newLength);

friends.unshift('John'); // Adds to the beginning of the array
console.log(friends);

// Remove elements
friends.pop(); // Removes the last element of the array
const popped = friends.pop();
console.log(popped);
console.log(friends);

friends.shift(); // Removes the first element of the array
console.log(friends);

console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob')); // Not present, returns -1

// Includes uses strict equality
friends.push(23);
console.log(friends.includes('Steven'));
console.log(friends.includes('Bob'));
console.log(friends.includes(23));
console.log(friends.includes('23')); // False because includes is strict


if (friends.includes('Steven')) {
    console.log(`You have a friend named Steven`)
}