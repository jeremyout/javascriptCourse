// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/*
const x = '23';
if (x === 23) console.log(23);

const calcAge = birthYear => 2037 - birthYear;

console.log(calcAge(1991));
*/

/*
Using Google, Stackoverflow, and MDN
*/
/* 
Problem 1:
We work for a company building a smart home thermometer. Our most recent
task is is: "Given an array of temperatures of a day, calculate the temperature
amplitude. Keep in mind that sometimes there mightr be a sensor error."
*/
/*
const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// - What is temperature amplitude? Answer: Difference between highest and lowest temp
// - How to compute the max and min temperatures?
// - What does a sensor error look like? What to do when an error occurs?

// 2) Breaking up into sub-problems
// - How to ignore sensor errors?
// - Find max value in temperature array?
// - Find min value in temperature array?
// - Subtract min from max (amplitude) and return it

function calcTempAmplitude(temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    // Ignore sensor errors
    if (typeof temps[i] !== 'number') continue;

    // Set the new value for the maximum if current index is greater than the current max
    if (temps[i] > max) {
      max = temps[i];
    }

    // Set the new value for the minimum if current index is greater than the current min
    if (temps[i] < min) {
      min = temps[i];
    }
  }

  return max - min;
}

const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

/*
Problem 2: 
Function should now receive 2 arrays of temps
*/
// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice? No!
// just merge 2 arrays

// 2) Breaking up into sub-problems
// - Merge 2 arrays
/*
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

function calcTempAmplitudeNew(t1, t2) {
  const temps = t1.concat(t2);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    // Ignore sensor errors
    if (typeof temps[i] !== 'number') continue;

    // Set the new value for the maximum if current index is greater than the current max
    if (temps[i] > max) {
      max = temps[i];
    }

    // Set the new value for the minimum if current index is greater than the current min
    if (temps[i] < min) {
      min = temps[i];
    }
  }

  return max - min;
}

const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);
*/

/*
Debugging with the console and breakpoints
*/

const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',
    // C) Fix the bug
    // value: Number(prompt('Degrees Celsius: ')),
    value: 10,
  };

  // B) Find the bug
  // console.log(measurement);
  // console.warn(measurement.value);
  // console.error(measurement.value);
  const kelvin = measurement.value + 273;
  return kelvin;
};

// A) Identify the bug
console.log(measureKelvin());

// Using a debugger
function calcTempAmplitudeBug(t1, t2) {
  const temps = t1.concat(t2);

  let max = 0;
  let min = 0;

  for (let i = 0; i < temps.length; i++) {
    // Ignore sensor errors
    if (typeof temps[i] !== 'number') continue;

    // debugger; // automatically sends you to the debugger
    // Set the new value for the maximum if current index is greater than the current max
    if (temps[i] > max) {
      max = temps[i];
    }

    // Set the new value for the minimum if current index is greater than the current min
    if (temps[i] < min) {
      min = temps[i];
    }
  }

  return max - min;
}

const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// A) Identify the bug
console.log(amplitudeBug);
