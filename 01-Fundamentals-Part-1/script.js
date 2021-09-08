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
/*
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
*/

/*
Strings and Template Literals
*/
/*
const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const year = 2037;

const jonas = "I'm " + firstName + ', a ' + (year - birthYear) + ' year old ' + job + '!';
console.log(jonas);

const jonasNew = `I'm ${firstName}, a ${(year - birthYear)} year old ${job}!`;
console.log(jonasNew);

// Can use backticks for any regular strings
console.log(`Just a regular string...`);

console.log('String with \n\multiple \n\lines');

console.log(`String
with multiple
lines`);
*/

/*
Taking Decisions: if/else statements
*/
/*
const age = 15;

if (age >= 18) {
    console.log('Sarah can start driving license 🚗');
} else {
    const yearsLeft = 18 - age;
    console.log(`Sarah is too young, wait another ${yearsLeft} years`);
}

let century;
const birthYear = 2012;
if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(century);
*/

/*
Type conversion and coercion
*/
/*
//  Type conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear);
console.log(inputYear + 18);

console.log(Number('Jonas'));
console.log(typeof NaN);

console.log(String(23));

// Type coercion
// js converts all strings to numbers automatically
// '+' operator converts all numbers to strings
console.log('I am ' + 23 + ' years old');
console.log('23' - '10' - 3);
console.log('23' / '2');
console.log('23' > '18');

let n = '1' + 1; // '11'
n = n - 1; // 11 - 1 (- operator converts '11' to number 11)
console.log(n);
*/

/*
Truthy and Falsy values
*/
/*
// 5 falsy values: 0, '', undefined, null, and NaN
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas'));
console.log(Boolean({}));
console.log(Boolean(''));

const money = 0;

if (money) {
    console.log("Don't spend it all!");
} else {
    console.log('You should get a job!');
}

let height = 0;

if (height) {
    console.log('Yay, height is defined');
} else {
    console.log('height is undefined');
}
*/

/*
Equality operators
*/
/*
const age = '18';
if (age === 18) console.log('You just became and adult (strict)');
// == does type coercion, but === is strict equality. so '18' == 18 returns true, but '18' === 18 is false;
if (age == 18) console.log('You just became and adult (loose)');

const favorite = Number(prompt("What's your favorite number?"));

console.log(favorite);
console.log(typeof favorite);

if (favorite === 23) {
    console.log('Cool, 23 is an amazing number');
} else if (favorite === 7) {
    console.log('7 is also a cool number')
} else if (favorite === 9) {
    console.log('9 is also a cool number')
} else {
    console.log('Number is not 23, 7, or 9');
}

if (favorite !== 23) {
    console.log('Why not 23?');
}
*/

/*
Logical operators
*/

const hasDriversLicense = true; //A
const hasGoodVision = true; //B

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

// if (hasDriversLicense && hasGoodVision) {
//     console.log('Sarah is able to drive');
// } else {
//     console.log('Someone else should drive');
// }

const isTired = false; //C

console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
    console.log('Sarah is able to drive');
} else {
    console.log('Someone else should drive');
}