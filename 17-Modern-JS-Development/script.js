// Importing module
// Named imports need to be the same name and put inside braces
// import {   addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);
/*
console.log('Importing module');

// Import everything that is exported from the shoppingCart.js module
// import * as ShoppingCart from './shoppingCart.js ';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

import add, { cart } from './shoppingCart.js';
add('apples', 300);
add('pizza', 2);
add('bread', 5);
console.log(cart); // proof that this is not a copy, but a live connection
// It's technically not a problem to import the same module twice, but
// usually we don't do that

// We could even mix all of them in the same import statement. If we
// wanted, we could have named and default imports/exports at the same
// time
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// console.log(price);

// In practice, we usually never mix named and default imports in the
// same module
*/
/*
An Overview of Modern JS Development
*/

// We used to just write code and keep it in one large script file
// but not anymore. We build our code into modules and can import
// third party modules, called packages

// Can get these modules from the npm repository
// npm repository - contains open source packages to include
// third party code in our own code (ex: React, jQuery, Leaflet, etc)

// Once development is done, we then go through a build process
// to compile one big final javascript bundle. That's the final file
// that we will deploy to our web server for production, aka the
// javascript file that will be sent to browsers in production

// First step of the build process - bundle all of our modules together
// into one file
// - Can eliminate unused code, and compress it.
// This step is important for two big reasons
// 1. Older browsers don't support modules at all
// 2. It's better for performance to send less files, also benefits from
//    compressing the code.

// Second step of the build process - transpiling/polyfilling
// Convert modern JS back to ES5 so that older browsers can
// understand our code without breaking.
// Usually done with a tool called Babel

// We don't perform the build process ourselves. Instead
// we use a special tool to implement this build process for us
// The most common tools are proabbly webpack and parcel
// These are called js bundlers because they take our raw code and
// transform it into a js bundle

// Webpack is the more popular one, but it can be really hard and
// confusing to set it up. That's because there is a lot of things
// to configure manually to make it work properly

// Parcel on the other hand is a zero configuration bundler which simply
// works out of the box and we don't have to write any setup code.

// Webpack and Parcel are also available on npm
// npm contains development tools that help build our applications as
// well (Live-Server, Parcel, Babel, etc.)

/*
An overview of modules in JS
*/

// A module is a reusable piece of code that encapsulates
// implementation details of a certain part of our project
// Usually a standalone file but doesn't have to be
// A module normally contains some code, but it can also
// include imports and exports

// With exports, we can export values out of a module
// For example, simple values or even functions
// Whatever we export from a module is called the public API
// This is just like classes where we can also expose a public API
// for other code to consume.

// In the case of modules, this public API is consumed by importing
// values into a module. Just like we can export, in modules, we can
// usually also import values from other modules. The imported modules
// are then called dependencies of the importing module. The code that
// is in the module that is importing cannot work without the code that
// it is importing from the external module.

// Why modules?
// - Modules make it really easy to compose software. Modules are small
//   building blocks that we put together to make complex applications
// - Isolate components: Modules can be developed in isolation without
//   thinkking about the entire codebase
// - Abstract code: Implement low-level code in modules and import these
//   abstractions into other modules.
// - Organized code: Modules naturally lead to a more organized codebase
// - Reuse code: Modules allow us to easily reuse the same code, even
//   across multiple projects.

// Native JS (ES6) Modules
// ES6 Modules are modules that are actually stored in files, exactly
// one module per file.

// ES6 Modules vs Scripts
// In modules, all top level variables are scoped to the module. So
// varaibles are private to the module by default. The only way an
// outside module can access a value that's inside another module is
// by exporting that value. If we don't export then nobody else can see
// the variable.
// In scripts, all top-level variables are always public. This can lead
// to problems like global namespace pollution.
// ES6 modules are always executed in strict mode, while scripts on the
// other hand are executed in sloppy mode by default. So with modules,
// there's no more need to declare strict mode.
// The this keyword is always undefined in ES6 Modules while in scripts it
// points at the window object.
// ES6 Modules support imports and exports, while that isn't possible with
// scripts.
// Imports and exports can only happen at the top-level, outside functons
// and if blocks.
// All imports are hoisted, so it's like they are defined at the top of the
// file. In practice, importing values is always the first thing done in
// a module.
// In order to link a module to an HTML file, we need to use the
// script tage with the type attribute set to module instead of
// just the plain script tag.
// Downloading module files always happens asynchronously. This is
// true for a module loaded from HTML as well as for modules that are
// loaded by importing one module into another using the import syntax
// Regular scripts are downloaded by default in a blocking synchronous
// way unless we use the async or defer attributes on the script tag

// How modules import other modules behind the scenes
// The first step is to parse the code. Parsing means to just read it
// without executing. This is when imports are executed. The whole process
// of importing modules happens before the code in the main modules is
// actually executed.
// Modules are imported synchronously.
// This is only possible thanks to top-level imports which make imports
// known before execution.
// Modules are imported synchronously to make bundling and dead code
// elimination possible.

// After the parsing is complete and figured out the modules it needs
// then the modules are downloaded from the server. Downloading happens
// asynchronously. It's only the importing operation that happens
// synchronously.
// After a module arrives, it's parsed and then the modules exports are
// linked to the imports.
// Imported values are a live connection, not a copy!!
// When a value changes in the exporting module, then the value also
// changes in the importing module. This is unique to ES6 modules. Other
// module systems do not work like this.

// Next up, The code in the imported module is executed. And with this,
// the process of importing modules is finished. Then it is finally time
// for the importing module to be executed.

/*
Exporting and importing ES6 Modules
*/

/*
Top level await (ES2022)
*/

// We can now use the await keyword outside of an async function, which we
// call top-level await.
// This only works in modules! If we try this in a normal script, top-level
// await would fail. Need type="module" on the script linking
// console.log('Start Fetching...');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');
// The await is now blocking execution. This can be helpful in some situations,
// but also can be harmful.
/*
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data[data.length - 1]);
  return { title: data.at(-1).title, text: data.at(-1).body };
};
const lastPost = getLastPost(); // returns a promise
console.log(lastPost);

// Works, but not very clean
// lastPost.then(last => console.log(last));

// Now we can use top-level await
const lastPost2 = await getLastPost();
console.log(lastPost2);

// Implication of using top-level await. If one module imports a module which
// has a top-level await, then the importing module will wait for the imported
// module to finish the blocking code. Demonstrated by the added code in
// shoppingCart.js
*/

/*
The module pattern
*/
/*
// This is what used to be used before ES6 modules
// It's important to know because it will still be in project and still a good
// application of what we've been learning throughout the course

// Just like in regular modules, the main goal of the module pattern is to
// encapsulate functionality, to have private data, and to expose a public API
// The best way of achieving all that is by using a function. Functions give us
// private data by default and return values which can be our public API
// Usually we write an IIFE because this way we don't have to call it seperately
// and this way it is only called once. The only purpose of this function is to
// create a new scope and return data just once.
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;
  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart. Shipping cost is ${shippingCost}`
    );
  };
  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();
ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);

// We are able to use the object and manipulate the data inside because of closures!
// Closures allow a function to have access to all the variables that were present
// at its birthplace

// The problem is that if we wanted one module per file like we have for ES6 modules
// then we would have to create different scripts and link all of them in the HTML.
// And that creates a couple of problems. Have to be careful of the order in which
// they are declared in the HTML, and we would have all the variables living in the
// global scope, and finally we wouldn't be able to use them in a module bundler.
// Using a module bundler is very important in modern js.
*/

/*
CommonJS Modules
*/

// Besides native ES modules and the module pattern, there are other module systems
// that have been used by js in the past but they are not native js so they relied
// on some external implementation. Two examples are AMD modules and CommonJS modules

// CommonJS modules are important because they have been used in Node.js for almost
// all of its existance. Only very recently ES6 modules were implemented in Node.js
// And remember Node.js is a way of running js on a web server outside of a browser.
// A big consequence of this is that almost all modules in the npm repository that
// we talked about in the beginning of this section still use the commonJS module
// system. npm was originally only intended for Node which uses commonJS. Now we
// are basically stuck with commonJS

// Just like in ES6 modules, in commonJS one file is one module.
// We export something from a module like this:
// export.addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to cart. Shipping cost is ${shippingCost}`
//     );
//   };
// This won't work in the browser, but it would work in Node.js
// The export keyword is an object that isn't defined in our code or
// in the browser, but in Node.js it is an important object.

// Import
// const { addToCart } = require('./shoppingCart.js');
// require is not defined in the browser environment but it is part of the
// CommonJS specification

/*
Introduction to NPM
*/

// Why do we need a way to manage dependencies?
// Before npm, we used to include external libraries right into our HTML
// This would expose a global variable that we could use, that's what we did
// in mapty for the leaflet library
// This creates a couple of problems.
// It doesn't make sense having the HTML load all of our js
// Many times we would download a library file to our computer directly but
// then when a new version would come out you would have to download the new
// version and replace all the files.
// Before npm there wasn't a sinlge repository that contained all the packages
// that we might need.

// Leaflet uses the commonJS module system. We cannot directly import it to our code
// without a module bundler.

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
// This is the old way to clone a deeply nested object
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state); // Use lodash to perform a deep clone
state.user.loggedIn = false;
console.log(stateClone);

// Now we can use lodash
console.log(stateDeepClone); // Take note of the loggedIn state here, it is still true, despite setting false in the original
