/////////////////////////////////////////////////
/*
Use the BMI example from Challenge #1, and the code you already wrote, and
improve it.
Your tasks:
1. Print a nice output to the console, saying who has the higher BMI. The message
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!"
Hint: Use an if/else statement 😉
*/

// Data 1
const markMass1 = 78;
const markHeight1 = 1.69;
const johnMass1 = 92;
const johnHeight1 = 1.95;

const markBmi1 = markMass1 / (markHeight1 ** 2);
const johnBmi1 = johnMass1 / (johnHeight1 ** 2);

const markHigherBMI1 = markBmi1 > johnBmi1;

if (markHigherBMI1) {
    console.log(`Mark's BMI (${markBmi1}) is higher than John's (${johnBmi1}) !`);
} else {
    console.log(`John's BMI (${johnBmi1}) is higher than Mark's(${markBmi1})!`);
}

// Data 2
const markMass2 = 95;
const markHeight2 = 1.88;
const johnMass2 = 85;
const johnHeight2 = 1.76;

const markBmi2 = markMass2 / (markHeight2 ** 2);
const johnBmi2 = johnMass2 / (johnHeight2 ** 2);

const markHigherBMI2 = markBmi2 > johnBmi2;

if (markHigherBMI2) {
    console.log(`Mark's BMI (${markBmi2}) is higher than John's (${johnBmi2}) !`);
} else {
    console.log(`John's BMI (${johnBmi2}) is higher than Mark's(${markBmi2})!`);
}