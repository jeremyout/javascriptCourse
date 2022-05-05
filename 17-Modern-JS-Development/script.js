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
