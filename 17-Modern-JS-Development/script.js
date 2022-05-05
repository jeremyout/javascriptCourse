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
