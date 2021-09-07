/*
* Values and Variables lesson
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
*/

/*
* Data types lesson
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
*/

/*
 * let, const, and var
 */
/*
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
*/

/*
 * Basic Operators
 */
/*
// Math Operators
const currentYear = 2021;
const ageJeremy = currentYear - 1990;
const ageSarah = currentYear - 2018;
console.log(ageSarah, ageJeremy);

// 2 ** 3 means 2 to the power of 3
console.log(ageJeremy * 2, ageJeremy / 10, 2 ** 3);

const firstName = 'Jeremy';
const lastName = 'Outinen';
console.log(firstName + ' ' + lastName);

//Assigment operators
let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25
x *= 4; // x = x * 4 = 100;
x++; // x = x + 1 = 101;
x--;
x--;
console.log(x);

// Comparison Operators
console.log(ageJeremy > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);
*/

/*
Operator Precedence
*/
const currentYear = 2021;
const ageJeremy = currentYear - 1990;
const ageSarah = currentYear - 2018;

console.log(currentYear - 1990 > currentYear - 2018);

let x, y;
x = y = 25 - 10 - 5;
console.log(x, y);

const avgAge = (ageJeremy + ageSarah) / 2;
console.log(avgAge);
console.log(ageJeremy, ageSarah);