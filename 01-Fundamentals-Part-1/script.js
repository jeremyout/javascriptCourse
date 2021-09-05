/*
* Values and Variables lesson and assignment
*/
/* 
let js = 'amazing';
console.log(40 + 8 + 23 - 10);

console.log('Jeremy');
console.log(23);

let firstName = 'Jeremy';
console.log(firstName);

let myFirstJob = 'Programmer';
let myCurrentJob = 'Teacher';

console.log(myFirstJob, myCurrentJob);

let country = 'United States';
let continent = 'North America';
let population = 328;

console.log('Country: ' + country);
console.log('Continent: ' + continent);
console.log('Population: ' + population + ' million');
*/

/*
* Data types lesson and assignment
*/
/*
let javascriptIsFun = true;
console.log(javascriptIsFun);

// console.log(typeof true);
console.log(typeof javascriptIsFun);
// console.log(typeof 23);
// console.log(typeof 'Jeremy');

//dynamic typing example
javascriptIsFun = 'YES';
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1990;
console.log(year);
console.log(typeof year);

// Bug - shows up as an object
console.log(typeof null);

//new vars from this assignment
let isIsland = false;
let language;

// repeat vars from the first assigment
let population = 328;
let country = 'United States';

console.log('isIsland type: ' + typeof isIsland);
console.log('language type: ' + typeof language);
*/

/*
 * let, const, and var
 */
let age = 30;
age = 31;

const birthYear = 1990;
// Errors out because you cannot change the value of a const
// birthYear = 1991;

// Errors out because you need to assign a const value at declaration
// const job;

var job = 'programmer';
job = 'teacher';

console.log(job);

// Works but shouldn't be done
lastName = 'Outinen';
console.log(lastName);

// Assignment
const language = 'English';