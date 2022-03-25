'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
