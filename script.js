"use strict";
//-----------------------------------

//Selecting elements
const btnNewGame = document.querySelector(".button-new-game");
const btnRollDice = document.querySelector(".button-roll-dice");
const btnHold = document.querySelector(".button-hold");

const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");

const labelCurrentScore0 = document.querySelector(`.player0-current-score`);
const labelCurrentScore1 = document.querySelector(`.player1-current-score`);

const labelTotalScore0 = document.querySelector(`.player0-total-score`);
const labelTotalScore1 = document.querySelector(`.player1-total-score`);

const diceImg = document.querySelector(".dice-roll-img");

//--------------------
//Global variables
let currentScore = [0, 0];
let totalScore = [0, 0];
let player = player1.classList.contains("active_player") ? 0 : 1;

//-----------------------------------
//Functions
const initialize = function () {
  currentScore = [0, 0];
  totalScore = [0, 0];
  player = 0;

  labelCurrentScore0.textContent = 0;
  labelCurrentScore1.textContent = 0;
  labelTotalScore0.textContent = 0;
  labelTotalScore1.textContent = 0;

  player1.classList.add("active_player");
  player2.classList.remove("active_player");
  player = 0;
  diceImg.classList.add("hidden");

  btnHold.disabled = false;
  btnRollDice.disabled = false;
};

const changePlayers = function () {
  player1.classList.toggle("active_player");
  player2.classList.toggle("active_player");
  player = player === 0 ? 1 : 0;
};

const updateCurrentScore = function (labelCurrentScore, value) {
  currentScore[player] += value;
  labelCurrentScore.textContent = currentScore[player];
};

const resetCurrentScore = function (labelCurrentScore, value) {
  currentScore[player] = value;
  labelCurrentScore.textContent = currentScore[player];
};

const updateTotalScore = function (labelTotalScore) {
  totalScore[player] += currentScore[player];
  labelTotalScore.textContent = totalScore[player];
};

const getLabelCurrentScore = function () {
  return document.querySelector(`.player${player}-current-score`);
};

const getLabelTotalScore = function () {
  return document.querySelector(`.player${player}-total-score`);
};

//-----------------------------------
// Event listeners
btnRollDice.addEventListener("click", function () {
  const labelCurrentScore = getLabelCurrentScore();

  const diceRoll = Math.trunc(Math.random() * 6) + 1;
  diceImg.src = `images/dice-${diceRoll}.png`;
  diceImg.classList.remove("hidden");

  if (diceRoll !== 1) {
    updateCurrentScore(labelCurrentScore, diceRoll);
  } else if (diceRoll === 1) {
    resetCurrentScore(labelCurrentScore, 0);
    changePlayers();
  }
});

btnHold.addEventListener("click", function () {
  const labelCurrentScore = getLabelCurrentScore();
  const labelTotalScore = getLabelTotalScore();

  updateTotalScore(labelTotalScore);
  resetCurrentScore(labelCurrentScore, 0);
  if (totalScore[player] >= 10) {
    btnRollDice.disabled = true;
    btnHold.disabled = true;
    document.querySelector(`.player${player + 1}`).classList.add("winner");
    console.log("success");
  } else {
    changePlayers();
  }
});

btnNewGame.addEventListener("click", initialize);
