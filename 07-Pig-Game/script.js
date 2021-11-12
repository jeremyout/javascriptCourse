'use strict';

// Button elements
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// Score elements
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const p1TotalScoreEl = document.querySelector('#score--0');
const p2TotalScoreEl = document.getElementById('score--1');
const p1CurrScoreEl = document.getElementById('current--0');
const p2CurrScoreEl = document.getElementById('current--1');

let scores, currentScore, playing, activePlayer;

const init = function () {
  p1TotalScoreEl.textContent = 0;
  p2TotalScoreEl.textContent = 0;
  p1CurrScoreEl.textContent = 0;
  p2CurrScoreEl.textContent = 0;
  diceEl.classList.add('hidden');
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  activePlayer = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${diceRoll}.png`;
    if (diceRoll === 1) {
      switchPlayer();
    } else {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      // active player wins
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', init);
