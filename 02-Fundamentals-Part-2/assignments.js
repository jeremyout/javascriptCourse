'use strict';

/*
Functions
*/
/*
1. Write a function called 'describeCountry' which takes three parameters:
'country', 'population' and 'capitalCity'. Based on this input, the
function returns a string with this format: 'Finland has 6 million people and its
capital city is Helsinki'
2. Call this function 3 times, with input data for 3 different countries. Store the
returned values in 3 different variables, and log them to the console
*/

function describeCountry(country, population, capitalCity) {
    const description = `${country} has ${population} million people and its capital city is ${capitalCity}`
    return description;
}

const us = describeCountry('United States', 328, 'Washington D.C.');
const finland = describeCountry('Finland', 6, 'Helsinki');
const portugal = describeCountry('Portugal', 10, 'Lisbon');

console.log(us);
console.log(finland);
console.log(portugal);