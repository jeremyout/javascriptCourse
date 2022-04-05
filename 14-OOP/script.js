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
