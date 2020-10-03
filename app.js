/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

NewGame();
document.querySelector(".btn-roll").addEventListener("click", RollDice);
document.querySelector(".btn-new").addEventListener("click", NewGame);
document.querySelector(".btn-hold").addEventListener("click", EndRound);

function NewGame() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.getElementById(`name-0`).textContent = "Player 1";
    document.getElementById(`name-1`).textContent = "Player 2";

    var player1panel = document.querySelector(`.player-1-panel`);
    RemoveClass(player1panel, "winner");
    RemoveClass(player1panel, "active");

    var player2panel = document.querySelector(`.player-2-panel`);
    RemoveClass(player2panel, "winner");
    RemoveClass(player2panel, "active");

    document.querySelector(`.btn-roll`).style.display = "block";
    document.querySelector(`.btn-hold`).style.display = "block";

    SetRoundScore(0, 0);
    SetRoundScore(1, 0);
    SetScore(0, 0);
    SetScore(1, 0);
    HideDice();
}

function RollDice() {
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
}

function EndRound() {
    scores[activePlayer] += roundScore;
    SetScore(activePlayer, scores[activePlayer]);
    SetRoundScore(activePlayer, 0);
    roundScore = 0;
    RemoveClass(document.querySelector(`.player-${activePlayer}-panel`), "active");
    
    if (scores[activePlayer] < 100) {
        activePlayer = activePlayer === 0 ? 1 : 0;
        document.querySelector(`.player-${activePlayer}-panel`).classList.add("active");
    } else {
        EndGame();
    }

    HideDice();
}

function EndGame() {
    document.getElementById(`name-${activePlayer}`).textContent = "Winner!";
    document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner");
    RemoveClass(`.player-${activePlayer}-panel`, "active");
    document.querySelector(`.btn-roll`).style.display = "none";
    document.querySelector(`.btn-hold`).style.display = "none";
    HideDice();
}

function SetScore(player, score) {
    document.getElementById(`score-${player}`).textContent = score;
}

function SetRoundScore(player, score) {
    document.getElementById(`current-${player}`).textContent = score;
}

function HideDice() {
    document.querySelector(".dice").style.display = "none";
}

function RemoveClass(playerPanel, classToRemove) {
    if (playerPanel && playerPanel.classList) {
        playerPanel.classList.remove(classToRemove);
    }
}