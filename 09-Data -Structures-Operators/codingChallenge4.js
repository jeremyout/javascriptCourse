/*
Write a program that receives a list of variable names written in underscore_case
and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to
insert the elements), and conversion will happen when the button is pressed.

Test data (pasted to textarea, including spaces):
underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure

Should produce this output (5 separate console.log outputs):
underscoreCase ✅
firstName ✅✅
someVariable ✅✅✅
calculateAge ✅✅✅✅
delayedDeparture ✅✅✅✅✅
*/
/*
Hints:
- Remember which character defines a new line in the textarea 😉
- The solution only needs to work for a variable made out of 2 words, like a_b
- Start without worrying about the ✅. Tackle that only after you have the variable
name conversion working 😉
- This challenge is difficult on purpose, so start watching the solution in case
you're stuck. Then pause and continue!
Afterwards, test with your own test data!
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

let text = document.querySelector('textarea').value;
const button = document.querySelector('button');

button.addEventListener('click', function () {
  text = document.querySelector('textarea').value.toLowerCase();
  const [...variables] = text.split('\n');
  //   console.log(variables);
  let callCount = 0;
  for (const v of variables) {
    callCount++;
    convertToCamelCase(v, callCount);
  }
});

function convertToCamelCase(variableName, count) {
  const [frontHalf, backHalf] = variableName.trim().split('_');
  console.log(
    [frontHalf, backHalf[0].toUpperCase(), backHalf.slice(1)].join('') +
      `${'✅'.repeat(count)}`
  );
}
