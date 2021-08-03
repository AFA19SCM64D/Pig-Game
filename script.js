'use strict';

//Selecting elements of score 0 and score 1
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const curr0El = document.getElementById("current--0");
const curr1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");


let scores, currScore, activePlayer, playing;

const init = function () {

    scores = [0, 0];
    currScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    curr0El.textContent = 0;
    curr1El.textContent = 0;

    //remove winner class
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    diceEl.classList.add("hidden");

};
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currScore = 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
};

//rolling the dice functionality
btnRoll.addEventListener("click", function () {
    if (playing) {
        //1) Generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2) Display Dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;

        //3) Check for rolled 1. If true, switch to next player
        if (dice !== 1) {
            //add dice to current score
            currScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currScore;
        } else {
            //switch to nect player
            switchPlayer();
        }
    }
});


//Holding the current score
btnHold.addEventListener("click", function () {
    if (playing) {
        //Add current score to the total score of active player
        scores[activePlayer] += currScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //Check if score is 100
        if (scores[activePlayer] >= 100) {
            //if score is 100 then finish game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            diceEl.classList.add("hidden");
        } else {
            //if not then switch to necxt player
            switchPlayer();

        }
    }
});


//new game button
btnNew.addEventListener("click", function () {
    init();
});

