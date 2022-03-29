'use strict';

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/* 
Application specific
*/

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll: ', window.scrollX, window.scrollY);
  // console.log(
  //   'Height/Width of viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scroll to section 1 - only works if at top of the page
  // window.scrollTo(s1coords.left, s1coords.top);

  // Accounts for the current scroll position
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // Implements smooth scrolling
  // THIS IS THE OLD SCHOOL WAY OF DOING IT:
  // Need to specify left, top, and behavior properties
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // More modern way of smooth scrolling to a section:
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

// This is one way to handle scrolling to a specific section, but is inefficient. It works fine
// for 3 links, but is really inefficient to keep creating the same callback function
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href'); // don't want the absolute URL, we want relative
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// We can use bubbling up and the event.target property and place a single event listener on the parent container
// This is known as event delegation

// 1. First, add the event listener to a common parent element of all the elements we're interested in
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); // don't want the absolute URL, we want relative
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed content

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  // Clear the active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Set the active tab for the tab that was just clicked
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// mouseenter doesn't bubble up, we need the event to bubble so we will use mouseover

// REPETITIVE
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });

// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 1;
//     });
//     logo.style.opacity = 1;
//   }
// });

// WORKS, BUT STILL A BETTER WAY
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// Passing an "argument" into a handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky Navigation

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// // The scroll event is not really efficient and should be avoided
// window.addEventListener('scroll', function (e) {
//   // console.log(this.window.scrollY);
//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
// });

///////////////////////////////////////
// Sticky Navigation: Intersection Observer API

// const observerCallback = function (entries, observer) {
//   // In this case, we're only interested in the entries (array of threshold entries)
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2], // can have multiple thresholds (array)
// };

// // Callback function will get called each time the observed element(section1) is
// // intersecting the root element(null looks at the viewport) at the defined threshold(10%)

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  // guard clause
  if (!entry.isIntersecting) return;
  // Remove the hidden class when threshold is past
  entry.target.classList.remove('section--hidden');
  // remove the observer for the entry that was just acted on
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/*
Lectures and experimenting
*/

/*
How the DOM really works
*/

// Allows us to make JavaScript interact with the browser

// We can write JavaScript to create, modify, and delete HTML
// Elements, set styles, classes and attributes; and listen
// and respond to events

// DOM tree is created from an HTML document, which we can then
// interact with. DOM tree is a tree-like structure made out
// of nodes

// DOM is a very complex API that contains lots of methods and
// properties to interact with the DOM tree.

/*
Selecting, creating, and deleting elements
*/
/*
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
// Returns an HTML collection that updates automatically
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// node list does not update automatically

// will also return a live HTML collection
const allBtnClass = document.getElementsByClassName('btn');
console.log(allBtnClass);

// Creating and inserting elements
// . insertAdjacentHTML;

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message);
header.append(message);
// this only shows the message once on the page.
// The append just moves the dom element.
// DOM elements are unique, there can only be one one.

// This will allow adding multiple copies of the same node
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

// The remove method is very recent. Before it, we had to remove
// child elements and so we had to select the parent first and
// then remove the child from there. Like this:
// message.parentElement.removeChild(message);

// moving up and down in the DOM tree is called DOM traversing

// Review the insertAdjacentHTML that we used before in the bakist app
*/

/*
Styles, attributes, and classes
*/
/*
// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// These styles are set as inline styles (directly in the DOM)

// This only works for inline styles that we set ourselves
// using the style property
console.log(message.style.height);
console.log(message.style.backgroundColor);

// this returns a huge object
console.log(getComputedStyle(message));
// Can filter it down to a specific style
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Setting custom properties - need to use the setProperty method
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); // returns ths absolute URL
console.log(logo.getAttribute('src')); // gets the relative URL
console.log(logo.className);
// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
// There is also a setAttribute method
logo.setAttribute('company', 'Bankist');

// Can also set the attributes
logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // absolute link
console.log(link.getAttribute('href')); // relative link

// Data attributes
console.log(logo.dataset.versionNumber); // camel case here, dash in index.html

// Classes
logo.classList.add('c', 'j'); // can pass in multiple values
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes like it is in arrays

// Can use className to set the class, but shouldn't
// DON'T USE THIS! - WILL OVERRIDE ALL THE CLASSES AND
// ONLY ALLOWS US TO PUT ONE CLASS ON THE ELEMENT
// logo.className = 'jonas';
*/

/*
Implementing smooth scrolling
*/
/*
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll: ', window.scrollX, window.scrollY);
  // console.log(
  //   'Height/Width of viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scroll to section 1 - only works if at top of the page
  // window.scrollTo(s1coords.left, s1coords.top);

  // Accounts for the current scroll position
  // window.scrollTo(
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // Implements smooth scrolling
  // THIS IS THE OLD SCHOOL WAY OF DOING IT:
  // Need to specify left, top, and behavior properties
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // More modern way of smooth scrolling to a section:
  section1.scrollIntoView({ behavior: 'smooth' });
});
*/

/*
Types of events and event handlers
*/
/*
// An event is basically a signal that is generated by a DOM node

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading');

  // can remove the event listener right away
  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// Can also do this via this,
// but this is the old-school way of doing it
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading');
// };

// There are two ways why addEventListener is better
// - Allows us to add multiple event listeners to the same element
//   The old-school onmouseenter method can only have one instance
// - We can remove event listeners if we don't need it anymore
//     - To remove an event listener, we need to export the function
//       into a named function.

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// There is a third way of handling events, an HTML attribute
// see the HTML modification. This method should not be used.
*/

/*
Event propogation: Bubbling and Capturing
*/

// Click on a link
// DOM generates a click event
// Event is not generated at the target element, anchor element
// Event is generated at the root of the document
// This is where the capturing phase happens. (Event travels down the DOM tree to the target element)
// As the event travels down the tree, it will pass through every parent element of the target
// Once the event reaches the target, the target phase begins where events can be handled right at the target
// We do this with event listeners
// After reaching the target, the event travels all the way up to the document root again, this is the bubbling phase
// We say that 'Events bubble up from the target to the document root'
// Just like in the capturing phase, the event passes through all the parent elements (no siblings)
// Why is this important?
// Because when an event happens it's as if the event happened in all the parent elements
// If we attach the same event handler to the section element, then we would get the exact same alert for the section as well
// By default, events can only be handled in the target and bubbling phases.
// However we can setup events to fire in the capturing phase as well
// Not all types of events have a capturing and bubbling phase, but most do.
// Events propogate from one place to another (capturing and bubbling)

/*
Event propogation in practice
*/
/*
// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  // In an event handler, 'this' always points to the element on which that event handler is attached
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  // current target is equal to the 'this' keyword in any event handler
  console.log(e.currentTarget === this);
  // Stop propogation - stops bubbling (NOT A GOOD IDEA TO USE, just demonstration that it exists)
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});

// Setup the event listener to trigger in the capturing phase (third input to the addEventListener method)
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   },
//   true
// );

// The capturing phase is usually irrelevant for us. On the other hand, the bubbling phase can be very useful
// for something called event delegation (next lecture)

// If we do want to catch events during the capture phase we can define a third parameter in the addEventListener function
// true or false in the addEventListener call. Replaces bubbling with capturing (see modification to '.nav' above)
*/

/*
Event delegation: Implementing page navigation
*/

// Modifications all made above

/*
DOM Traversing
*/
/*
const h1 = document.querySelector('h1');

///////////////////////////////////////
// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
// Both highlight classes are direct children of H1, but this would go as far down as needed in the DOM tree
// to find more children of the H1 class

console.log(h1.childNodes); // Not that used
console.log(h1.children); // only works for direct children
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

///////////////////////////////////////
// Going upwards: Selecting parents
// Direct parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// Most of the time we need to find a parent element which is not a direct parent
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// We can think of closest being the opposite of querySelector
// Both receive a query string as an input but querySelector finds children no matter how deep
// while the closest method finds parent, no matter how far in the DOM tree

///////////////////////////////////////
// Going sideways: Selecting siblings

// for some reason, in JS we can only select direct siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// We also have the same methods/properties for nodes (mostly work with the above Element variants anyways)
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// if we need all the siblings, move up to the parent element and read all the children from there
console.log(h1.parentElement.children);
// Change some style to all the siblings but except the original element itself
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

/*
Building a tabbed component
*/

// All work done up above

/*
Passing Arguments to Event Handlers
*/

// All work done above
