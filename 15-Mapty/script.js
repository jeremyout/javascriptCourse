'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

/*
Project planning
*/

// 1. User stories
// - A description of the application functionality from the user's perspective
// - All the user stories put together a description of the entire application

// 2. Features

// 3. Flowchart
// - What will we build

// 4. Architecture
// - How we build it

// 5. Development
// - Implementation of our plan

/////////////////////////////////

// User stories
// - Common format: 'As a [type of user], I want [an action] so that [a benefit]
//      - Answers the questions of who (user, admin, etc.), what, and why

// User Stories For Mapty:
// 1. As a user, I want to log my running workouts with location, distance, time, pace
//    and steps/minute so I can keep a log of all my running

// 2. As a user, I want to log my cycling workouts with location, distance, time, speed
// and elevation gain so I can keep a log of all my cycling

// 3. As a user, I want to see all my workouts at a glance so I can easily track my progress

// 4. As a user, I want to see my workouts on a map so I can easily check where I workout the most

// 5. As a user I want to see all my workouts when I leave the app and come back later so
//    that I can keep using the app over time

/////////////////////////////////

// Features

// Going to need a map that the user can click on to add a new workout

// Use Geolocation to display map at current location (more user friendly)

// Form to input distance, time, pace, steps/minute

// Form to input distance, time, speed, elevation gain

// Display all workouts in a list

// Display all workouts on the map

// Store workout data in the browser using local storage API
// On page load, read saved data from local storage and display

/////////////////////////////////

// Flowchart

// Whenever we start to build a flowchart, its a good idea to start with events

/*
Using the Geolocation API
*/

class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();

    // The this keyword in an event handler function will always have the this keyword set to the
    // DOM element to which it is attached (form in this case)
    form.addEventListener('submit', this._newWorkout.bind(this));

    // In the real world, if you are using event handlers inside classes, you will be using bind
    // to set the this keyword all the time

    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      // Calls _loadMap and passes the location in with the _loadMap call
      // When the callback function is called, it is treated as  a regular function
      // call. On regular function calls, the this keyword is undefined
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          console.log('fail');
        }
      );
    }
  }

  _loadMap(position) {
    //   console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    console.log(this);
    this.#map = L.map('map').setView(coords, 13);
    // console.log(map);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //   L.marker(coords)
    //     .addTo(map)
    //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    //     .openPopup();

    // Handle clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();
    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    // Display the marker
    // console.log('clicked on map', mapEvent.latlng);
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

// The creation of the app and getting the location is done right as the page loads
const app = new App();

/*
Project Architecture
*/

// Architecture is all about giving the project a structure
// In this project, the structure will come from classes and objects

// One of the most important aspects of any structure is to decide where and how to store the data

// Parent class will be workout and store the distance, duration, and coords(location)
// Two child classes, one for running and one for cycling
// running has cadence and pace, cycling has elevation gain and speed

// See video around 5:13 for explanation, otherwise look at Mapty-architecture-part-1.png

// We will create a big class called App that will store all workouts
// We already have functionality for handling all the events, the App class will store all this
// functionality as methods

// Loading the page will trigger the constructor of the object we're going to create through this App class

// Having a class that contains all the data and methods about the application is a pretty common thing
// that you will see for simple applications like this
