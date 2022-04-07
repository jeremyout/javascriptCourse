'use strict';

/*
What is Object Oriented Programming?
*/

// Object-oriented programming (OOP) is a paradigm based on the style of the concept of objects (how we
// write an organize code)

// We use objects to model(describe) real-world or abstract features

// Objects may contain data (properties) and code (methods). By using objects, we pack
// data and corresponding behavior into one block

// In OOP, objects are self-contained pieces/blocks of code

// Objects are building blocks of applications, and interact with one another

// Interactions happen through a public interface (API): methods that the code
// outside of the object can access and use to communicate with the object

// OOP was developed with the goal of organizing code, to make it more flexibile
// and easier to maintain (avoid "spaghetti code")

// Classes and Instances (Traditional OOP)

// A Class is like a blueprint which can then be used to create an object based on
// the rules described in the class

// We call all objects created through a class instances of that class

// The class itself is not an object

// 4 fundamental principles of OOP
// - Abstraction
// - Encapsulation
// - Inheritance
// - Polymorphism

// Abstraction
// - Ignoring or hiding details that don't matter, allowing us to get an overview
//   perspective of the thing we're implementing, instead of messing with details
//   that don't really matter to our implementation
// Example: Implementing a phone
// Without abstraction we could design our class to include everything about the phone
// With abstraction, we don't need all this detail (it's been abstracted away)

// Encapsulation
// - Keeping properties and methods private inside the class, so they are not accessible
//   from outside the class. Some methods can be exposed as a public interface (API)
// Why?
// - Prevents external code from accidentally manipulating internal properties/state
// - Allows us to change internal implementation without the risk of breaking external code

// Inheritance
// - Making all properties and methods of a certain class available to a child class, forming
//   a hierarchical relationship between classes. This allows us to reuse common logic and model
//   real-world relationships.
// One parent class and one child class (example used - User is the parent class
// and Admin is the child class)
// The child class extends the parent class

// Polymorphism
// - A child class can ovewrwrite a method it inherited from a parent class.
// [It's more complex than that, but enough for our purposes now]

/*
OOP in JavaScript
*/

// Classical OOP: Classes
// - Objects (instances) are instantiated from a class which functions like a blueprint
// - Behavior(methods) is copied from class to all instances

// OOP in JS: Prototypes
// - Objects are linked to a prototype object
// - Prototypal inheritance/Delegation: The prototype contains methods (behavior) that are accessible
//   to all object linked to that prototype (different from class inheritance)
// - Behavior is delegated to the linked prototype object

// How do we implement OOP in JS
// - Constructor functions
// Technique to create objects from a function
// This is how built-in objects like Arrays, Maps, or Sets are actually implemented
// - ES6 Classes
// Modern alternative to constructor function syntax
// "Syntactic sugar": Behind the scenes, ES6 classes work exactly like constructor functions
// ES6 classes do not behave like classes in "classical OOP" (last lecture)
// - Object.create()
// Easiest and most straightforward way of linking an object to a prototype object

// Note: The 4 pillars of OOP are still valid and improtant with prototypal inheritance

/*
Constructor functions and the new Operator
*/

// Constructor functions always start with a capital letter
// Arrow function will not work as a function constructor (no this keyword).
//    Only function delcarations and function expressions
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // NEVER create a method inside of a constructor function!!
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New{} is created
// 2. function is called, this keyword = {}
// 3. {} linked to prototype
// 4. function automatically returns {}

const matilda = new Person('Matilda', 2017);
console.log(matilda);
const jack = new Person('Jack', 1975);
console.log(jack);

// Jonas, Matilda, and Jack are all instances of a Person
console.log(jonas instanceof Person); // true

// Note: Function constructors are not really a feature of the javascript language
// Instead they are simply a pattern that has been developed by other developers

/*
Prototypes
*/

console.log(Person.prototype);

// This is what should be done instead of adding it directly to the object like in
// the person object above that is commented out. Now there is only one copy of this
// function, but all of the objects that are created with the constructor function can
// reuse this function on themselves. The this keyword on each of them is set to the
// object that is calling the method (jonas, matilda, etc.)
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// calcAge is not technically part of the object itself but we have
// access to it because of prototypal inheritance
jonas.calcAge();
matilda.calcAge();
jack.calcAge();

// How does this work?
// This works because any object always has access to the methods and properties
// from its prototype. The prototype of jonas, matilda, and jack is Person.prototype
// We can confirm this because each object has a special property called __proto__
console.log(jonas.__proto__); // DEPRECATED, no longer recommended
console.log(Object.getPrototypeOf(jonas)); // replaced __proto__
// The prototype of the jonas object is essentially the prototype property of the
// constructor function
console.log(jonas.__proto__ === Person.prototype);
// Person.prototype is not the prototype of Person but it is the prototype
// of all the objects that are created with the Person constructor function
// Other built-in methods we can use to prove this:
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person)); // False!

// Can also set properties on the prototype
Person.prototype.species = 'Homo Sapiens';
console.log(jonas, jonas.species);

// Owned properties are only the ones that are declared directly on the object itself,
// not including inherited properties
console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

/*
Prototypal Inheritance and The Prototype Chain
*/

// Video has diagrams

// Prototype chain works kind of like the scope chain
// Using 'jonas.hasOwnProperty('firstName')' as an example:
// - hasOwnProperty cannot be found on the jonas object, so it looks to it's prototype
// - hasOwnProperty cannot be found on Person.prototype, so it looks to it's prototype
// - Finally, hasOwnProperty is found in the Object.prototype.
// Object.prototype's prototype is null

/*
Prototypal Inheritance on Built-In Objects
*/

console.log(Object.getPrototypeOf(jonas));
console.log(Object.getPrototypeOf(Object.getPrototypeOf(jonas))); // Top of the protoype chain (Object.prototype)
console.log(
  Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(jonas)))
); // null because trying to get the prototype of Object.prototype

console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(Object.getPrototypeOf(arr));
console.log(Object.getPrototypeOf(arr) === Array.prototype);

console.log(Object.getPrototypeOf(Object.getPrototypeOf(arr)));
console.log(
  Object.getPrototypeOf(Object.getPrototypeOf(arr)) === Object.prototype
);

// Add a new method to the prototype property of the Array constructor
// Now all arrays inherit this method
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

// however, what we just did here (extending the prototype of a built-in object)
// is generally not a good idea
// Future versions of JS might implement a method of the same name and that would then
// be used instead of your own method

// Second reason - If you work on a team with multiple developers, this is going to be a bad
// idea. If multiple developers create the same method with a different name it will create more bugs

const h1 = document.querySelector('h1');
console.dir(x => x + 1);
