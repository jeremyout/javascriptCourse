console.log('Assignment Output starts here: ');

/*
Values and Variables assignment
*/
/*
 1. Declare variables called 'country', 'continent' and 'population' and
    assign their values according to your own country (population in millions)
 2. Log their values to the console
*/
const country = 'United States';
const continent = 'North America';
let population = 328;

console.log('Country: ' + country);
console.log('Continent: ' + continent);
console.log('Population: ' + population + ' million');

/*
* Data types assignment
*/
/*
1. Declare a variable called 'isIsland' and set its value according to your
country. The variable should hold a Boolean value. Also declare a variable
'language', but don't assign it any value yet
2. Log the types of 'isIsland', 'population', 'country' and 'language'
to the console
*/
const isIsland = false;
let language;

console.log('isIsland type: ' + typeof isIsland);
console.log('population type: ' + typeof population);
console.log('country type: ' + typeof country);
console.log('language type: ' + typeof language);

/*
 * let, const, and var assignment
 */
/*
1. Set the value of 'language' to the language spoken where you live (some
countries have multiple languages, but just choose one)
2. Think about which variables should be const variables (which values will never
change, and which might change?). Then, change these variables to const.
3. Try to change one of the changed variables now, and observe what happens
*/
language = 'English';

/*
 * Basic Operators assigment
 */
/*
1. If your country split in half, and each half would contain half the population,
then how many people would live in each half?
2. Increase the population of your country by 1 and log the result to the console
3. Finland has a population of 6 million. Does your country have more people than
Finland?
4. The average population of a country is 33 million people. Does your country
have less people than the average country?
5. Based on the variables you created, create a new variable 'description'
which contains a string with this format: 'Portugal is in Europe, and its 11 million
people speak portuguese'
*/
let avgPop = 33;
let finlandPop = 6;

// 1
console.log(population / 2);
// 2 
console.log(population + 1);
// 3
console.log(population > finlandPop);
//4
console.log(population > avgPop);
// 5
let description = country + ' is in ' + continent + ' and its ' + population + ' million peole speak ' + language;
console.log(description);

/*
Strings and Template Literals
*/
/*
1. Recreate the 'description' variable from the last assignment, this time 
using the template literal syntax
*/
description = `${country} is in ${continent} and its ${population} million people speak ${language}!`;
console.log(description);

/*
 Taking Decisions: if / else Statements
 */
/*
1. If your country's population is greater that 33 million, log a string like this to the
console: 'Portugal's population is above average'. Otherwise, log a string like
'Portugal's population is 22 million below average' (the 22 is the average of 33
minus the country's population)
2. After checking the result, change the population temporarily to 13 and then to
130. See the different results, and set the population back to original
*/
// population = 12;
if (population > 33) {
   console.log('United States population is above average');
} else {
   console.log(`United States population is ${33 - population} million below average`);
}

/*
Equality Operators
*/
/*
1. Declare a variable 'numNeighbours' based on a prompt input like this:
prompt('How many neighbour countries does your country
have?');
2. If there is only 1 neighbour, log to the console 'Only 1 border!' (use loose equality
== for now)
3. Use an else-if block to log 'More than 1 border' in case 'numNeighbours'
is greater than 1
4. Use an else block to log 'No borders' (this block will be executed when
'numNeighbours' is 0 or any other value)
5. Test the code with different values of 'numNeighbours', including 1 and 0.
6. Change == to ===, and test the code again, with the same values of
'numNeighbours'. Notice what happens when there is exactly 1 border! Why
is this happening?
7. Finally, convert 'numNeighbours' to a number, and watch what happens now
when you input 1
8. Reflect on why we should use the === operator and type conversion in this
situation
*/

// let numNeighbours = Number(prompt('How many neighbor countries does your country have?'));

// if (numNeighbours === 1) {
//    console.log('Only 1 border!');
// } else if (numNeighbours > 1) {
//    console.log('More than 1 border');
// } else {
//    console.log('No borders');
// }

/*
Logical operators
*/
/*
1. Comment out the previous code so the prompt doesn't get in the way
2. Let's say Sarah is looking for a new country to live in. She wants to live in a
country that speaks english, has less than 50 million people and is not an
island.
3. Write an if statement to help Sarah figure out if your country is right for her.
You will need to write a condition that accounts for all of Sarah's criteria. Take
your time with this, and check part of the solution if necessary.
4. If yours is the right country, log a string like this: 'You should live in Portugal :)'. If
not, log 'Portugal does not meet your criteria :('
5. Probably your country does not meet all the criteria. So go back and temporarily
change some variables in order to make the condition true (unless you live in
Canada :D)
*/

// Tests
// population = 32;
// language = 'Spanish';

if ((language === 'English') && (population < 50) && (isIsland === false)) {
   console.log('You should live in the United States :)');
} else {
   console.log('The United States does not meet your criteria :(');
}

/*
The Switch Statement
*/
/*
Use a switch statement to log the following string for the given 'language':
chinese or mandarin: 'MOST number of native speakers!'
spanish: '2nd place in number of native speakers'
english: '3rd place'
hindi: 'Number 4'
arabic: '5th most spoken language'
for all other simply log 'Great language too :D'
*/
// language = 'Spanish'
switch (language) {
   case 'Chinese':
   case 'Mandarin':
      console.log('MOST number of native speakers!')
      break;
   case 'Spanish':
      console.log('2nd place in number of native speakers');
      break;
   case 'English':
      console.log('3rd place');
      break;
   case 'Hindi':
      console.log('Number 4');
      break;
   case 'Arabic':
      console.log('5th most spoken language');
      break;
   default:
      console.log('Great language too!');
      break;
}

/*
The Conditional (Ternary) Operator
*/
/*
1. If your country's population is greater than 33 million, use the ternary operator
to log a string like this to the console: 'Portugal's population is above average'.
Otherwise, simply log 'Portugal's population is below average'. Notice how only
one word changes between these two sentences!
2. After checking the result, change the population temporarily to 13 and then to
130. See the different results, and set the population back to original
*/
// population = 13;
console.log(`The United States population is ${population > 33 ? 'above' : 'below'} average`);