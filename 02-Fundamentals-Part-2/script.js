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