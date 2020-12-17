'use strict';

// Function: Secret number definition (between 1-20):
const getSecretNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

// Function update message textcontent, ie. Display a Message:
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

let secretNumber = getSecretNumber();
// document.querySelector('.number').textContent = secretNumber;

// Variable definitions:
let score = 20;
let highscore = 0;

// Function: #### GAME LOGIC ####
const gameLogic = function () {
  // Get inout number from the user.
  const guess = Number(document.querySelector('.guess').value);

  //#### Game Logic ####
  // Case: No number in input.
  if (!guess) {
    displayMessage('⛔ No Number!');
  }
  // Case: Correct guess number.
  else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');

    // Change Background Color
    document.querySelector('body').style.backgroundColor = '#60b347';
    // Make the number a little widher
    document.querySelector('.number').style.width = '30rem';

    // Update the highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }
  // Case: when guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      // Only the message is different in the different conditions
      displayMessage(guess > secretNumber ? '🔴 Too High!' : '🔵 Too Low!');
      // Decrease the score
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('😥 You lost the game!');
      document.querySelector('.score').textContent = 0;
      // Change Background Color
      document.querySelector('body').style.backgroundColor = 'rgb(143, 36, 36)';
    }
  }

  // Case: Input number out of game boundaries.
  else if (guess > 20 || guess < 1) {
    displayMessage('Please pick a number between 1 and 20!');
  }
};

// Function: #### AGAIN ####
const restartGame = function () {
  // Reset score
  score = 20;
  document.querySelector('.score').textContent = score;

  // Reset original style
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  //Reset original text and clear guess box
  displayMessage('Start guessing...');
  document.querySelector('.guess').value = '';

  // Reset secret number
  secretNumber = getSecretNumber();
  // document.querySelector('.number').textContent = secretNumber;
};

//#region #### EVENTS ####

// #### Again Button ####
document.querySelector('.again').addEventListener('click', function () {
  restartGame();
});

// #### Hit Space Key ####
document.body.onkeyup = function (e) {
  if (e.keyCode === 32) restartGame();
};

// #### Check Button ####
document.querySelector('.check').addEventListener('click', function () {
  gameLogic();
});

// #### Hit Enter Key ####
document.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') gameLogic();
});

//#endregion
