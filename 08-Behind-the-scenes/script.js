'use strict';

/*
Scoping in practice
*/
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating new variable with the same name as outer scopes variable
      const firstName = 'Steven';
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
      // re-defining outer scopes variable
      output = 'new output!';
    }
    // console.log(str); // not in current scope
    console.log(millenial);
    // console.log(add(2, 3)); // not in current scope
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = 'Jonas';
calcAge(1991);
// console.log(age); // not in current scope
// printAge(); // not in current scope
*/

/*
Hoisting and the TDZ in practice
*/

// Variables
console.log(me); // outputs 'undefined'
// console.log(job); // reference error
// console.log(year); // reference error

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// Functions
console.log(addDecl(2, 3));
// console.log(addExpr(2, 3)); // reference error
console.log(addArrow);
// console.log(addArrow(2, 3)); // reference error

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Example
// numProducs not set here yet, undefined due to hoisting
// undefined is a falsy value
if (!numProducts) {
  deleteShoppingCart();
}

var numProducts = 10;

function deleteShoppingCart() {
  console.log(`All products deleted`);
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);
