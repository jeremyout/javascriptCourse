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

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //   console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      const map = L.map('map').setView(coords, 13);
      //   console.log(map);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //   L.marker(coords)
      //     .addTo(map)
      //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      //     .openPopup();

      map.on('click', function (mapEvent) {
        console.log('clicked on map', mapEvent.latlng);
        const { lat, lng } = mapEvent.latlng;
        L.marker([lat, lng])
          .addTo(map)
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
      });
    },
    function () {
      console.log('fail');
    }
  );
}

/*
Displaying a map using Leaflet Library
*/

/*
Displaying a map marker
*/
