// Activate strict mode (can be used for individual functions if desired)
'use strict';

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