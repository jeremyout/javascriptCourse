'use strict';

/*
console.log(document.querySelector('.message').textContent);

// Modify elements
document.querySelector('.message').textContent = '🎉 Correct Number!';
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// document.querySelector('.number').textContent = secretNumber;

// Set the message field
function updateMessage(message) {
  document.querySelector('.message').textContent = message;
}

// Set the score
function updateScore(score) {
  document.querySelector('.score').textContent = score;
}

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // console.log(guess, typeof guess);

  // When there is no input
  if (!guess) {
    updateMessage('⛔️ No Number Detected');
  }
  // When the player wins
  else if (guess === secretNumber) {
    document.querySelector('.number').textContent = secretNumber;
    updateMessage('🎉 Correct Number!');
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
  }
  // When the guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      updateMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too Low!');
      score--;
      updateScore(score);
    } else {
      updateMessage('💥 You lose');
      updateScore(0);
    }
  }
});

///////////////// Coding Challenge 1
/*
Implement a game reset functionality, so that the player can 
make a new guess!

Your tasks:
1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the 'score' and 'secretNumber' variables
3. Restore the initial conditions of the message, number, score and guess input fields
4. Also restore the original background color (#222) and number width (15rem)
*/

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  updateScore(score);
  document.querySelector('body').style.backgroundColor = '#222';
  updateMessage('Start guessing...');
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
});
