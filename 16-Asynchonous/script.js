'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/*
Asynchronous JavaScript, AJAX, and APIs
*/

// Most of the code we've been writing in the course so far has been Synchronous code
// Synchronous means that the code is executed line by line
// Each line of code waits for the previous line to finish
// Long running operations block code execution

// Most of the time synchronous code is fine

// Asynchronous code is executed after a task that runs in the background finishes
// Asynchronous code is non-blocking
// Execution doesn't wait for an asynchronous task to finish its work

// Asynchronous programming is all about coordinating the behavior of a program over a period of time
// Asynchronous literally means not occurring at the same time
// Callback functions alone do NOT make code asynchronous!
// Event listeners alone do NOT automatically make code asynchronous

// AJAX
// AJAX = Asynchronoush JavaScript And XML - Allows us to communicate with remotre web servers
// in an asynchronous way. With AJAX calls, we can request data from web servers dynamically.

// API
// API = Application Programming Interface - A piece of software that can be used by another
// piece of software in order to allow applications to talk to each other.

// There are many types of APIs in web development:
// - DOM API
// - Geolocation API
// - Own class API
// - Online APIs

// Online API = Applicaiton running on a server that receives requests for data and sends
// data back as a response

// We can build our own web APIs (requires back-end developemnt, for example with node.js)
// or 3rd party APIs

// There are APIs for everything
// - Weather data
// - Data about countries
// - Flights data
// - Currency conversion data
// - APIs fro sending email or SMS
// - Google Maps
// - Millions of possibilities

// AJAX - the X in AJAX stands for XML
// These days almost no API uses XML anymore

// These days most APIs use JSON data
// JSON is the most popular API data format
