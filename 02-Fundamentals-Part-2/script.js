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
/*
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
*/

/*
Introduction to Objects
*/
/*
const jonasArray = [
    'Jonas',
    'Schmedtmann',
    2037 - 1991,
    'teacher',
    ['Michael, Peter', 'Steven']
];

// Object literal syntax
const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    age: 2037 - 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven']
};
console.log(jonas);
console.log(jonas.lastName); // dot notation
console.log(jonas['lastName']); // bracket notation

// Not sure why you'd do this but more a demonstration that it's possible I guess?
const nameKey = 'Name';
console.log(jonas['first' + nameKey]);
console.log(jonas['last' + nameKey]);

const interestedIn = prompt(`What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends`);
if (jonas[interestedIn]) {
    console.log(jonas[interestedIn]);
} else {
    console.log('Wrong request, Choose between firstName, lastName, age, job, and friends');
}

jonas.location = 'Portugal';
jonas['twitter'] = '@jonasschmedtmann'
console.log(jonas);

// Challenge
// "Jonas has 3 friends and his best friend is called Michael"
console.log(`${jonas.firstName} has ${jonas.friends.length} friends and his best friend is ${jonas.friends[0]}`);
*/

/*
Object Methods
*/
/*
const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: true,
    // calcAge: function (birthYear) {
    //     return 2037 - birthYear;
    // }

    // calcAge: function () {
    //     // console.log(this); // prints the whole object
    //     return 2037 - this.birthYear;
    // }

    calcAge: function () {
        //Store the calculation in the object
        this.age = 2037 - this.birthYear;
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()} year old ${this.job} and he has ${this.hasDriversLicense ? 'a' : 'no'} driver's license`;
    }
};

// console.log(jonas.calcAge(1991));
// console.log(jonas['calcAge'](1991));
console.log(jonas.calcAge());

console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);

// Challenge
// "Jonas is a 46 year old teacher. and he has a/no driver's license"

console.log(jonas.getSummary());
*/

/*
Iteration: The for loop
*/
/*
// console.log('Lifting weights repitition 1 🏋️‍♂️');
// console.log('Lifting weights repitition 2 🏋️‍♂️');
// console.log('Lifting weights repitition 3 🏋️‍♂️');
// console.log('Lifting weights repitition 4 🏋️‍♂️');
// console.log('Lifting weights repitition 5 🏋️‍♂️');
// console.log('Lifting weights repitition 6 🏋️‍♂️');
// console.log('Lifting weights repitition 7 🏋️‍♂️');
// console.log('Lifting weights repitition 8 🏋️‍♂️');
// console.log('Lifting weights repitition 9 🏋️‍♂️');
// console.log('Lifting weights repitition 10 🏋️‍♂️');

// Keeps running while the condition is true
for (let rep = 1; rep <= 10; rep++) {
    console.log(`Lifting weights repitition ${rep} 🏋️‍♂️`);
}
*/

/*
Looping arrays, breaking, and continuing
*/

const jonasArray = [
    'Jonas',
    'Schmedtmann',
    2037 - 1991,
    'teacher',
    ['Michael', 'Peter', 'Steven'],
    true
];

const types = [];

for (let i = 0; i < jonasArray.length; i++) {
    // reading from jonasArray
    console.log(jonasArray[i]);

    // Filling types array
    // types[i] = typeof (jonasArray[i]);
    types.push(typeof (jonasArray[i]));
}
console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let j = 0; j < years.length; j++) {
    ages.push(2037 - years[j]);
}
console.log(ages);

// continue and break
// continue is to exit the current iteration of the loop and go to the next one
// break is to completely terminate and exit the loop
console.log(`--- ONLY STRINGS ---`);
for (let i = 0; i < jonasArray.length; i++) {
    if (typeof (jonasArray[i]) !== 'string') continue;
    console.log(jonasArray[i]);
}

console.log(`--- BREAK WITH NUMBER ---`);
for (let i = 0; i < jonasArray.length; i++) {
    if (typeof (jonasArray[i]) === 'number') break;
    console.log(jonasArray[i]);
}