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
console.log(country + ' is in ' + continent + ' and its ' + population + ' million peole speak ' + language);