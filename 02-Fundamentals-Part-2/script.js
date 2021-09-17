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