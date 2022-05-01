'use strict';

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

/*
Important: API URL Change
*/

/*
🚨 The base URL of the API used throughout this section has changed

It's not a big deal, it's really just one small change. Instead of:

https://restcountries.eu/rest/v2/

It's now:

https://restcountries.com/v2/

So whenever we use the Countries API in this section, please just change the URL you see 
in the videos to this new one.

Happy learning ✌️
*/

///////////////////////////////////////
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/*
Our first AJAX Call: XMLHttpRequest
*/
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
  </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('usa');
getCountryData('germany');
*/
/*
How the web works: Requests and Responses
*/

// What happens when we access a web server?
// - Client (browser) sends a request to the server
// - Server then sends a response
// This is called the request-response model, or CLient-server architecture

// Example from last lecture:
// https://restcountries.com/v2/name/${country}
// Protocol - http or https
// Domain name - restcountries.com
// Resource - rest/v2/name/usa

// This domain name, restcountries.com, is not actually the address of the
// real server that we're trying to access. It's just a nice name that is easy to memorize

// What this means is that we need a way of converting the domain name to the real address of the server
// That happens through a DNS (Domain Name Server), DNS is a special kind of server
// (like the phone books of the internet)

// The first step that happens when we access any web server, is that the browser makes the
// request to a DNS (DNS Lookup) and this special server will match the web address of the URL to
// the servers real IP address
// This happens through your ISP
// What's important to retain is that the domain is not the real address, a DNS will convert the
// domain to the real IP address
// After the real IP has been sent back to the browser, we can call it

// HTTP Request Example
// https:// 104.27.142.889:443
// Protocol - http or https
// IP Address - 104.27.142.889
// Port Number - 443 (Default 443 for HTTPS, 80 for HTTP)

// Port number is just to identify a specific service that is running on a server
// Port number has nothing to do with the /rest/v2/name/usa

// The second step - Once we have the real IP address, a TCP socket connection is established
// between the browser and the server, they are now finally connected. This connection is typically
// kept alive for the entire time that it takes to transfer all files from the website or all data.

// What are TCP/IP?
// TCP is the Transmission Control Protocol
// IP is the Internet Protocol
// They are basically the internets fundamental control system
// They set the rules about how data moves on the internet

// Third Step- Make an HTTP request
// HTTP stands for HyperText Transfer Protocol
// After TCP/IP, HTTP is another communication protocol
// A communication protocol is a system of rules that allows two or more parties to communicate

// In the case of HTTP, it's just a protocol that allows clients and web servers to communicate
// That works by sending request and response messages from client to server and back

// An HTTP Request message will look something like this:
// GET v2/name/${country} HTTP 1.1 - Called the start line: HTTP Method + request target + HTTP version
// Host: www.google.com     |
// User-Agent: Mozilla/5.0  | - These three lines are the request headers (many different possibilities)
// Accept-Language: en-US   |
// <BODY> - Request body (only when sending data to server (coming from a form), example: POST)

// HTTP methods - there are many available, but the most important ones are:
// - GET - For requesting data
// - POST - For sending data
// - PUT/PATCH - For modifying data

// About the request target - this is where the server is told that we want
// to access the '/v2/name/us' resource in this case
// This was in the URL before, and now it is simply set as the target in the HTTP request
// If the target was empty, just a slash, then we would be accessing the websites root

// The main difference between HTTP and HTTPS is that HTTPS is encrypted using TLS or SSL
// Besides that, the logic behind HTTP requests and responses also applies to HTTPS

// Fourth Step - Once the web server has our data or webpage ready, it will send the data back
// using an HTTP response

// HTTP Response example:
// HTTP /1.1 200 OK -- Start line: HTTP version + status code + status message
// Date: Fri, 18 Jan 2021       |
// Content-Type: text/html      | - These three lines are HTTP Response headers (many different possibilities)
// Transfer-Encoding: chunked   |   - Can also make up our own
// <BODY>  -- Response Body - Usually contains the JSON data coming from an API or the HTML of a website we requested

// An API is typically just a single request and response, however if its a webpage we are accessing there
// will be many more requests and responses. That's because when we do the first request, all we get back
// is the initial HTML. The HTML is then scanned by the browser for all the assets that it needs to build the
// entire webpage (JS, CSS, Images, etc.). Process is repeated for each file.

// When all the files have finally arrived, the webpage can be rendered in the browser according to the
// HTML, CSS, and JS specifications that we already know

// We said before that TCP and IP are the communication protocols that define how data travels across the web
// First, the job of TCP is to break the requests and responses down into thousands of small chunks
// called packets before they are sent. Once the small packets arrive at their location, TCP will reassemble
// all the packets into the original request or response. This is necessary so that each packet can take a
// different route through the internet. This way, the message arrives at the destination as quick as possible
// which would not be possible if we sent the entire data as a big chunk.

// As a second part, the job of the IP protocol is to send and route these packets through the internet. So
// it ensures that they arrive at the destination they should go using IP addresses on each packet.

/*
Welcome to callback hell
*/

// In the last lecture we did a simple AJAX call to fetch data from a countries API
// So we created a function for that and as we called the function multiple times, multiple AJAX
// calls were made at the same time. They were basically running in parallel and we couldnn't control
// which one finished first.

// To accomplish this we need to implement a sequence of AJAX calls
/*
const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbor = function (country) {
  // AJAX Call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // Render country 1
    renderCountry(data);
    // Get neighbor country (2)
    const [neighbor] = data.borders;
    if (!neighbor) return;

    // AJAX Call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
    request2.send();

    // Now we have another callback inside of a callback
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      // Render country 2
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbor('portugal');
getCountryAndNeighbor('usa');

// Callback hell is when we have a lot of nested callbacks in order to execute asynchronous tasks in sequence
// This happens for all asynchronous tasks which are handled by callbacks, not just AJAX

// Example of callback hell
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

// The problem with callback hell is that it makes our code look very messy. Even more important
// it makes our code hard to maintain and difficult to understand and to reason about. Code that is
// hard to understand and difficult to reason will have more bugs and is just worse code.

// Fortunately for us, there is a way to escape callback hell and that is by using promises
*/

/*
Promises and the Fetch API
*/
/*
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

const request = fetch(`https://restcountries.com/v2/name/usa`);
console.log(request);

// Promise - An object that is used as a placeholder for the future result of an asynchronous operation.
// Promise (Less formal) - A container for an asynchronously derived value.
// Promise (Even less formal) - A container for a future value.
// Example of a future value - A response from an AJAX call.

// A promise is just like a lottery ticket
// A lottery ticket is a promise that I will receive money if I guess the correct outcome
// I buy lottery ticket (promise) now
// Lottery draw happens asynchronously
// If correct outcome, I receive money because it was promised

// What's the big advantage of using promises?
// - By using promises, we no longer need to rely on events and callbacks passed into asynchronous
//   functions to handle asynchronous results
//    - Events and callback functions can sometimes cause unpredictable results
// - Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations
//    - Escaping callback hell

// The promise lifecycle
// Pending - before the future value is available
//         - Asynchronous task is still doing its work in the background
// Settled - Asynchronous task has finished.
//         - Two states: Fulfilled and Rejected.
//         - A fulfilled promise is a promise that has successfully resulted in a value as we expected
//         - A rejected promise means there has been an error in the asynchronous task

// These different states are very important to understand because when we use promises in our code
// we will be able to handle these different states in order to do something as a result of either a
// successful promise or a rejected one

// Another important thing about promises is that a promise is only settled once and from there the
// state will remain unchanged forever. The promise is either fulfilled or rejected but its impossible
// to change that state.

// These different states are relevant and useful when we use a promise to get a result.
// - This is known as consuming a promise.

// We consume a promise when we already have a promise, for example the promise that was returned
// from fetch API

// In order for a promise to exist, it must first be built. The fetch API is what builds the promise,
// we don't have to build it ourselves

// Most of the time we will just consume promises which is the easier and more useful part.
// But sometimes we need to build a promise and not just consume it.
*/

/*
Consuming promises
*/
// const request = fetch(`https://restcountries.com/v2/name/usa`);
// console.log(request);

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json(); // This returns another promise, so we need to handle that with another .then call
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok)
      // Throw immediately terminates the current function, like return does
      throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// Simplified with arrow functions
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         // Throw immediately terminates the current function, like return does
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbor = data[0].borders[0];
//       const neighbor = 'asdasdaw';
//       if (!neighbor) return;
//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         // Throw immediately terminates the current function, like return does
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       // Handle rejected promise
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       // This will always be called, no matter if the promise is fulfilled or rejected
//       // Finally method is not always useful
//       // One good example is to hide loading spinners
//       countriesContainer.style.opacity = 1;
//       // Catch method always returns a promise so that's why we can use the finally method
//     });
// };
// getCountryData('portugal');
// getCountryData('germany');

// Reworked to use helper function
const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders ? data[0].borders[0] : undefined; // workaround found in comments on lecture
      console.log(neighbor);
      // const neighbor = 'asdasdaw';
      if (!neighbor) throw new Error('No neighbor found!');
      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbor}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      // Handle rejected promise
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}... Try again!`);
    })
    .finally(() => {
      // This will always be called, no matter if the promise is fulfilled or rejected
      // Finally method is not always useful
      // One good example is to hide loading spinners
      countriesContainer.style.opacity = 1;
      // Catch method always returns a promise so that's why we can use the finally method
    });
};

/*
Chaining promises
*/

// Modifications above

// Always return the chain and handle it outside, do not chain inside of callbacks! (Line 418 above)

/*
Handling rejected promises
*/

// The only way in which a fetch promise rejects is when a user loses their internet connection

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// Errors propogate down the chain

// getCountryData('australia');
// With a 404 error, the fetch promise will still get fulfilled so our catch error cannot pickup on this error
// In this case, we want to tell the user the country was not found

/* 
Throwing errors manually
*/

// Any error will cause any promise to reject.

// Why should we handle errors?
// It's the only way to generate an error on the screen for the user
// Even more important, it's a bad practice to just leave rejected promises hanging around without
// handling them. Always use .catch and if necessary you can also use finally

/*
Asynchronous behind the scenes: The event loop
*/

// JS runtime is a container that includes all the pieces necessary to execute js code
// The heart of the JS runtime is the engine
// Engine is composed of the Heap and the Call stack
// Call stack is where code is executed from
// Heap is where objects are stored in memory

// Important to note, JS only has ONE thread of execution, no multitasking

// Web APIs environment
// APIs are provided to the engine
// Examples: DOM, Timers, Fetch API, ...

// Callback queue
// Ready to be executted callback functions (coming from events)
// When the call stack is empty, the event loop takes callbacks from the
// callback queue and puts them in the call stack so that they can be executed

// The event loop is the essential piece that makes asynchronous behavior possible in JS
// Its the reason why we can have a non-blocking concurrency model in JS

// A concurrency model is how a language handles multiple things happening at the same time

// How can asynchronous code be executed in a non-blocking way if there is only one thread of
// execution in the engine?

// Code example - demo at 3:50 in video
// const el = document.querySelector('img');
// el.src = 'dog.jpg';
// el.addEventListener('load', () => {
//   el.classList.add('fadeIn');
// });

// fetch('https://someurl.com/api')
// .then(res => console.log(res));

// Everything related to the DOM is not really part of JS, but the web APIs
// In the web APIs environment is where asynchronous tasks run

// If the img would be loaded in a synchronous way, it would be doing so in the call stack and block
// execution of the rest of the code. That's why loading images is asynchronous

// Fetch method is also asynchronous so that it is not blocking

// Once the image is loaded and the load event is emitted, the callback for the load event is put in
// the callback queue

// The callback queue is an ordered list of all the callback functions that are in line to be executed
// Think of the callback queue as a todo list with tasks that the call stack will eventually have to
// complete
// In the case of setTimeout, if you set a timer for 5 seconds, the callback function will get put on
// the callback queue after 5 seconds but it is NOT a guarantee that it will run right away. If there
// are other functions on the callback queue, those will be executed first. The only guarantee is that
// the timeout functions callback will not execute before 5 seconds, but it might execute after 5 seconds
// have passed. It all depends on the state of the callback queue and another queue we will talk about
// shortly

// Another thing that is important to mention is that the callback queue also contains callbacks coming
// from DOM events like clicks or keypresses, etc. DOM events are not really asynchronous behavior but
// they still use the callback queue to run their attached callbacks.

// Here is what the event loop does
// - it looks into the call stack and determines whether its empty or not except for the global context
// - if the call stack is currently empty, it will take the first callback from the callback queue
//   and put it on the call stack to be executed. This is known as an event loop tick. Each time the
//   event loop takes a callback from the callback queue, we say that there was an event loop tick.
// - the event loop has the extremely important task of doing coordination between the call stack and
//   the callbacks in the callback queue. The event loop is basically who decides exactly when each
//   callback is executed. We can also say that the event loop does the orchestration of the entire JS
//   runtime.

// Another thing that becomes clear is that the JS language itself has no sense of time. That's because
// everything that is asynchronous does not happen in the engine. It's the runtime who manages all the
// asynchronous behavior and its the event loop who decides which code will be executed next. The engine
// itself simply executes whatever code it is given.

// With promises, things work in a slightly different way.
// Let's say the data has finally arrived, so the fetch is done.
// Callbacks related to promises don't actually go into the callaback queue
// Instead, callbacks of promises have a special queue for themselves called the Microtasks queue
// The microtask queue is like the callback queue, but for callbacks related to promises. It has
// priority over the callaback queue!

// So at the end of an event loop tick, after a callback has been taken from the callback queue, the
// event loop will check if there are any callbacks in the microtask queue. If there are, it will run
// all of them before it will run any more callbacks from the regular callback queue.

// There are actually other microtasks, but that's not relevant here.

// In practice microtasks can cut in line before all other regular callbacks.
// If one microtask adds a new microtask, that new microtask is also executed before any callbacks
// from the callback queue. This means that the microtasks queue can essentially starve the callback
// queue because if we keep adding more and more microtasks the callbacks in the callback queue can
// never execute. It's usually never a problem but it's worth mentioning.

/*
The event loop in practice
*/
/*
console.log('Test start');
setTimeout(() => console.log('0 second timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test end');

// The synchronous console.logs are the first output
// Promise.resolve prints next because the microtasks queue has priority over the callback queue
// finally, setTimeout callback is processed

// You can't really do high precision things using javascript timers and promises
*/

/*
Building a simple promise
*/
/*
// Promises are essentially just a special kind of object
// It takes one argument, the executor function
// As soon as the Promise constructor runs it will automatically execute the executor function we pass in
// It will execute the executor function by passing in 2 other arguments:
// Resolve and reject functions
// The executor function specified is the function that will contain the asynchronous behavior we are
// trying to handle with a promise. The executor function should eventually produce a resolved value.
// resolved value = The value that is going to be the future value of the promise.
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      // Calling the resolve function will mark the promise as a fulfilled promise/resolved promise
      // We pass the fulfilled value of the promise into the resolve function so that it can later
      // be consumed with the then method.
      resolve('You WIN 💰');
    } else {
      // Into the reject function, we pass in the error msg that we later want to use in the catch method
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// This is how we encapsulate any asynchronous behavior into a promise. How we abstract it away like in
// lotteryPromise above. And then all we have to do is consume the promise.

// In practice most of the time all we do is consume promises. We usually only build promises to wrap
// old callback based functions into promises. This is a process we call Promisifying.
// Promisifying means to convert callback based asynchronous behavior to promise based.

// Promisify the setTimeout function and create a wait function
// Usually this is what we do: Create a function and returning a promise, encapsulating the asynchronous
// behavior even further. (Essentially this is what the fetch function does).
const wait = function (seconds) {
  // In this case, we don't need a reject function. It's impossible for the timer to fail
  return new Promise(function (resolve) {
    // In this case we're not going to pass any resolved value into the resolve function
    // because that's not mandatory. In the case of this timer its not necessary
    setTimeout(resolve, seconds * 1000);
  });
};
// Consume the promise
// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 second'));

// Previous Example of callback hell
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Reworking this old example into promise
wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => console.log('4 seconds passed'));

// Finally, there is also a way to very easily create a fulfilled or rejected promise immediately
// Static method on the promise constructor
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
*/

/*
Promisifying the Geolocation API
*/

console.log('Getting position');

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

// From codingChallenge1.js - modified to be promisified
const whereAmI = function () {
  getPosition()
    .then(pos => {
      // console.log(pos.coords);
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok && response.status === 403)
        throw new Error(
          `${response.status} error, do not make more than 3 requests per second`
        );
      if (!response.ok) throw new Error(`${response.status} error`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (!data.city) throw new Error('No City found');
      console.log(
        `You are in ${data.city[0] + data.city.slice(1).toLowerCase()}, ${
          data.statename
        }, ${data.country}`
      );
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(`Something went wrong -- ${err.message}`);
    });
};

btn.addEventListener('click', whereAmI);
