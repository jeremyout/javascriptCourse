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
/*
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

Person.hey = function () {
  console.log('Hey there 👋');
  console.log(this);
};
Person.hey();
// Not inherited, can't do the following
// jonas.hey();

// Note: Function constructors are not really a feature of the javascript language
// Instead they are simply a pattern that has been developed by other developers
*/
/*
Prototypes
*/
/*
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
*/
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
/*
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
*/
/*
ES6 Classes
*/
/*
// Classes in JS do not work like traditional classes in other languages like Java or C++
// Classes in JS are just syntactic sugar over what we learned in the last few videos
// (Still implement prototypal inheritance behind the scenes, but with a syntax that makes
// more sense to people coming from other programming languages)

// CLass expression
// const PersonCl = class {};

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Instance methods
  // Methods will be added to the .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name`);
    }
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);
console.log(Object.getPrototypeOf(jessica) === PersonCl.prototype);

// Can also add a method manually to the prototype
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

// 1. Classes are NOT hoisted (Function declarations are hoisted
//    which means we can use them before they are declared in the code, doesn't work with classes)

// 2. Classes are first class citizens (Can pass them into functions and return them from functions)
//    Classes are just a special kind of function behind the scenes

// 3. The body of a class is always executed in strict mode

// Constructor functions are not old/deprecated syntax, fine to keep using them (Personal preference)

// Some people say that classes are really bad and shouldn't be used.
*/
/*
Setters and Getters
*/
/*
const walter = new PersonCl('Walter White', 1965);
PersonCl.hey();

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest);

account.latest = 50;
*/
/*
Static methods
*/

// Used 'Array.from(document.querySelectorAll('h1'))' in the browser console
// The from method is a method attached to the Array constructor. Cannot use the from method on an array
// Attached to the constructor and not the prototype property of the constructor
// Therefore all the arrays do not inherit this method
// from method is in the Array namespace, like Number.parseFloat - not available on numbers

// These static methods are not available on the instances and sometimes they are useful to
// implement a helper function about a class or abotu a constructor function

/*
Object.create
*/
/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  // This has nothing to do with any constructor function because we're not using the 'new' operator
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
// This works, but is weird, and goes against the spirit of creating objects programmatically
steven.name = 'Steven';
steven.birthYear = 2002;
//
steven.calcAge();

// Diagram in the lecture video

// With Object.create, we can set the prototype of Objects manually to any object we want
// In this case, we manually set the prototype of the steven object to the PersonProto object
// They are now linked through the [[Prototype]] property just like before
// Looking at properties or methods in the prototype chain works just like it worked
// in function constructors or classes

// The big difference is that we didn't need any constructor function or prototype property at all
// to achieve the exact same thing.

// In practice, this is the least used way of implementing prototypal inheritance,
// but still very important to know

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

// The big takeaway is that Object.create() creates a new object and the prototype of that object will be
// the object we passed in
*/
/*
Inheritance between "classes": Constructor functions
*/
/*
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// This is to inherit everything from the person prototype, manually links the Student and Person prototypes
// VERY IMPORTANT to do this here, needs to be done before adding the introduce method below
// because if you make this link after adding the introduce method you will overwrite it
// Student.prototype is now an object that inherits from Person.prototype
Student.prototype = Object.create(Person.prototype);

// This doesn't work, won't get the prototype chain that we need, DON'T DO THIS
// Student.prototype = Person.prototype;

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true because we linked the prototypes
console.log(mike instanceof Object); // true (prototype chain)

console.dir(Student.prototype.constructor);
// JS now thinks that the constructor of Student.prototype is Person
// The reason for that is that we set the prototype property of the Student using Object.create()
// To fix this, we do
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
*/

/*
Inheritance between classes: ES6 Classes
*/
/*
// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Instance methods
  // Methods will be added to the .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name`);
    }
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }
}

// Classes are really just a layer of abstraction over constructor functions
// To implement inheritance between ES6 classes, we only need 2 ingredients
// - Extend keyword (Links prototypes behind the scenes without us having to think about it)
// - Super function

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Don't need to do this
    // PersonCl.call()
    // Instead we use the super function, this always needs to happen first!
    super(fullName, birthYear); // This call is responsible for creating the this keyword for this subclass
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

// Could comment out the entire constructor function above and this would still work
// const martha = new StudentCl('Martha Jones', 2012);
const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

// The mechanism of inheritance can actually be very problematic and dangerous in the real world
// when we are designing software
*/

/*
Inheritance between classes: Object.create()
*/
/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  // This has nothing to do with any constructor function because we're not using the 'new' operator
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto); // Student inherits from Person
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();

// In this version, we don't worry about constructors anymore and also not about prototype properties
// and not about the new operator. It's just objects linked to other objects

// ES6 classes and constructor functions are used way more in the real world
*/

/*
Another class example
*/

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;
    console.log(`Thanks for opening an account, ${owner}`);
  }
  // Public interface
  deposit(value) {
    this.movements.push(value);
  }
  // Abstracts the fact that a withdrawl is a negative movement
  withdraw(value) {
    this.deposit(-value);
  }

  approveLoan(value) {
    return true;
  }

  requestLoan(value) {
    if (this.approveLoan(value)) {
      this.deposit(value);
      console.log('Loan approved');
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// Deposits/Withdrawls -- Not a good idea at all to do this. Create method instead
// acc1.movements.push(250);
// acc1.movements.push(-140);
acc1.deposit(250);
acc1.withdraw(140);

// There is nothing stopping someone on our team from interacting with the movements manually
// and potentially introducing bugs
// The same goes for the pin
acc1.requestLoan(1000);
acc1.approveLoan(); // In the real world we shouldn't be allowed to access this
// This demonstrates why we need data encapsulation and data privacy
