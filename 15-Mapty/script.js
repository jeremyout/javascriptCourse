'use strict';

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

class Workout {
  // Keep in mind that adding these properties are not yet part of ES6
  date = new Date();
  // Usually we don't create IDs on our own and instead use a library to do it
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    // this.date = ...
    // this.id = ...
    this.coords = coords; // [lat,lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // In min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

/////////////////////////////////////////////////
// Application architecture

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = []; // Would otherwise put this in the constructor as this.workouts = [];
  constructor() {
    // Get user position
    this._getPosition();

    // Get data from localStorage
    this._getLocalStorage();

    // Attach event handlers
    // The this keyword in an event handler function will always have the this keyword set to the
    // DOM element to which it is attached (form in this case)
    form.addEventListener('submit', this._newWorkout.bind(this));
    // In the real world, if you are using event handlers inside classes, you will be using bind
    // to set the this keyword all the time
    inputType.addEventListener('change', this._toggleElevationField);
    // Can't add an event handler to a workout that doesn't exist yet
    // What we have to do here is event delegation
    // - Add devent handler to the parent element (workouts container)
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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

    // console.log(this);
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
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
    this.#workouts.forEach(work => {
      // At this point, the map is now available
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    // helper functions
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from the form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // Check if the data is valid

    // If the activity is running, create running object
    if (type === 'running') {
      // Check if data is valid
      const cadence = +inputCadence.value;
      // if (
      //   !Number.isFinite(distance) ||
      //   !Number.isFinite(duration) ||
      //   !Number.isFinite(cadence)
      // )
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If the activity is cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);
    // console.log(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form and Clear input fields
    this._hideForm();

    // Set localStorage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `;

    if (workout.type === 'running') {
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
    </li>
    `;
    }

    if (workout.type === 'cycling') {
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>
    `;
    }
    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    // console.log(workoutEl);
    if (!workoutEl) return;
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    // console.log(workout);
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });

    // Using the public interface
    // workout.click();
    // Disabled due to issues with local storage. We could create new objects from the restored data
    // if we wanted to
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    // localStorage is a very simple API, only advised to use for small amounts of data
    // localStorage is 'blocking' - will learn about it in next section
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    // console.log(data);
    if (!data) return;
    this.#workouts = data;
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
      // Cannot render on the map because the map does not exist right away when the page is
      // first loaded
      // this._renderWorkoutMarker(work);
    });
    // At this point after restoring from localStorage, the entire prototype chain is gone
    // When we converted our objects into a string and then back into an object, we lost the prototype chain
    // What we get back are just normal objects and cannot inherit any of their methods
  }

  reset() {
    // Empty contents from localStorage
    localStorage.removeItem('workouts');
    location.reload();
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

/*
Final Considerations
*/

// Things that could be added/improved

// - Ability to edit a workout
// - Ability to delete a workout
// - Ability to delete all workouts
// - Ability to sort workouts by a certain field (ex: distance)
// - Re-build Running and Cycling objects coming from localStorage(fix the bug from the last lecture)
// - More realistic error and confirmation messages
// - Ability to position the map to show all workouts (very hard)
// - Ability to draw lines and shapes instead of just points (very hard)
// - Geocode location from coordinates ("Run in Faro, Portugal") (Only after asynchronous javascript section)
//    - Use a third party web api to get this information
// - Display weather data for workout time and place (Only after asynchronous javascript section)
