'use strict';
//Same way of calling IDs and not classes
//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const resetGame = function () {
  //1. Reset the current score
  activePlayer = 0;
  currScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');
  //2. Reset the array
  scores = [0, 0];
  //3. Reset the dice to disappear
  diceEl.classList.add('hidden');
  playing = true;
};

//Rolling dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);

    //3. Check for roll 1
    if (dice !== 1) {
      //add dice to current score
      currScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currScore;
    } else {
      //switch to next player

      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add curr score to active player
    scores[activePlayer] += currScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player won
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3 Switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', resetGame);
