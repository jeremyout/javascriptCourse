/////////////////////////////////////////////////
/*
Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).
Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.
Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tall.
*/

// Data 1
const markMass1 = 78;
const markHeight1 = 1.69;
const johnMass1 = 92;
const johnHeight1 = 1.95;

const markBmi1 = markMass1 / (markHeight1 ** 2);
const johnBmi1 = johnMass1 / (johnHeight1 ** 2);

const markHigherBMI1 = markBmi1 > johnBmi1;

console.log(markBmi1, johnBmi1, markHigherBMI1);

// Data 2
const markMass2 = 95;
const markHeight2 = 1.88;
const johnMass2 = 85;
const johnHeight2 = 1.76;

const markBmi2 = markMass2 / (markHeight2 ** 2);
const johnBmi2 = johnMass2 / (johnHeight2 ** 2);

const markHigherBMI2 = markBmi2 > johnBmi2;

console.log(markBmi2, johnBmi2, markHigherBMI2);