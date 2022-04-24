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
