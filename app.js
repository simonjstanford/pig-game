/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores = [0,0];
var roundScore = 0;
var activePlayer = 0;

HideDice();
SetRoundScore(0, 0);
SetRoundScore(1, 0);
SetScore(0, 0);
SetScore(1, 0);

document.querySelector(".btn-roll").addEventListener("click", function() {
    var diceValue = Math.ceil(Math.random() * 6);
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = `dice-${diceValue}.png`;

    if (diceValue > 1) {
        roundScore += diceValue;
        SetRoundScore(activePlayer, roundScore);
    } else {
        roundScore = 0;
        EndRound();
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    EndRound();
});

function HideDice() {
    document.querySelector(".dice").style.display = "none";
}

function EndRound() {
    scores[activePlayer] += roundScore;
    SetScore(activePlayer, scores[activePlayer]);
    SetRoundScore(activePlayer, 0);
    roundScore = 0;
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active");
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player-${activePlayer}-panel`).classList.add("active");
    HideDice();
}

function SetScore(player, score) {
    document.getElementById(`score-${player}`).textContent = score;
}

function SetRoundScore(player, score) {
    document.getElementById(`current-${player}`).textContent = score;
}