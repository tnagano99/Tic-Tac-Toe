// create main objects used in Tic-Tac-Toe
const Gameboard = (() => {
    // initialize array to store marker positions
    let gameboard = [null, null, null, null, null, null, null, null, null];
    // initialize array to store score array
    let score = [0, 0, 0, 0, 0, 0, 0, 0];
    // adds marker to board
    const addMarker = (position, marker) => {
        // only add marker if position null and no winner has been decided
        if (checkWinner()) {
            return false;
        } else if (!gameboard[position]) {
            gameboard[position] = marker;
            let square = document.getElementById(`${position}-square`);
            square.textContent = marker;
            return true;
        } else {
            return false;
        }
    };
    const clearBoard = () => {
        // reset arrays for gameboard and score for new game
        gameboard = [null, null, null, null, null, null, null, null, null];
        score = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 9; i++) {
            // reset game display to be blank
            let square = document.getElementById(`${i}-square`);
            square.textContent = "";
        };
        // remove winner display message if exists
        let msgContainer = document.getElementById(`winnerMessage`);
        let msg = document.getElementById('message');
        if (msg) {
            msgContainer.removeChild(msg);
        };
    }
    // check gameboard for winner from score array
    // if greater than |2| there is a win
    const checkWinner = () => {
        for (let i = 0; i < 8; i++) {
            if (score[i] > 2 || score[i] < -2) {
                return true;
            }
        }
        return false;
    }
    // add to score array based on position and marker
    const keepScore = (position, marker) => {
        let counter = (marker === "X") ? 1 : -1;
        if (position === 0) {
            score[0] += counter;
            score[3] += counter;
            score[6] += counter;
        } else if (position === 1) {
            score[0] += counter;
            score[4] += counter;
        } else if (position === 2) {
            score[0] += counter;
            score[5] += counter;
            score[7] += counter;
        } else if (position === 3) {
            score[1] += counter;
            score[3] += counter;
        } else if (position === 4) {
            score[1] += counter;
            score[4] += counter;
            score[6] += counter;
            score[7] += counter;
        } else if (position === 5) {
            score[1] += counter;
            score[5] += counter;
        } else if (position === 6) {
            score[2] += counter;
            score[3] += counter;
            score[7] += counter;
        } else if (position === 7) {
            score[2] += counter;
            score[4] += counter;
        } else {
            score[2] += counter;
            score[5] += counter;
            score[6] += counter;
        }
    }
    return {addMarker, checkWinner, keepScore, clearBoard};
})();

// player factory function to make both players
const Player = (name, marker) => {
    const playerName = name;
    const playerMarker = marker;
    return {playerName, playerMarker};
};

const GamePlay = (() => {
    // initalize variables to store player objects
    let firstPlayer;
    let secondPlayer;
    // adds player objects to appropriate marker
    const setPlayers = () => {
        if (playerOne.playerMarker === "X") {
            firstPlayer = playerOne;
            secondPlayer = playerTwo;
        } else {
            firstPlayer = playerTwo;
            secondPlayer = playerOne;
        }
    };
    // reset players and counter for resetting game
    const clearGame = () => {
        firstPlayer = null;
        secondPlayer = null;
        totalMoves = 0;
    };
    // reset counter to play another game with same players
    const resetMoveCounter = () => {
        totalMoves = 0;
    }
    // initialize global counter to keep track of number of moves made
    let totalMoves = 0;
    // determines player moves and adds proper marker to gameboard
    const playerMove = (square) => {
        // determine which player's move it is
        let player = (totalMoves % 2 === 0) ? firstPlayer : secondPlayer;
        // position on gameboard equivalent to first character of each square's id
        let position = Number(square.getAttribute("id").charAt(0));
        // if position is open add marker
        if (Gameboard.addMarker(position, player.playerMarker)) {
            totalMoves++;
            // keeps tally of how close player is to win
            Gameboard.keepScore(position, player.playerMarker);
            // checks for winner
            if (Gameboard.checkWinner()) {
                let parent = document.getElementById("winnerMessage");
                let message = document.createElement("p");
                message.setAttribute("id", "message");
                message.textContent = `Congratulations ${player.playerName}! You Win!`;
                parent.appendChild(message);
            } else if (totalMoves > 8) {
                // display tie game message
                let parent = document.getElementById("winnerMessage");
                let message = document.createElement("p");
                message.setAttribute("id", "message");
                message.textContent = `Tie Game! No one wins.`;
                parent.appendChild(message);
            }
        }
    };
    return {setPlayers, playerMove, clearGame, resetMoveCounter}
})();

// create gameboard display
function createBoard() {
    let board = document.getElementById("board");
    for (let i = 0; i < 9; i++){
        let square = document.createElement("div");
        square.setAttribute("id", `${i}-square`);
        square.setAttribute("class", "squares");
        // add event listener for clicks
        square.addEventListener("click", function() {
            GamePlay.playerMove(square);
        });
        board.appendChild(square);
    }
    board.style.gridTemplateColumns = "repeat(3, 1fr)";
    board.style.gridTemplateRows = "repeat(3, 1fr)";
};

// main
createBoard();

// initialize variables for object instances
let playerOne;
let playerTwo;

// to start a two player game
let _startTwoPlayerGame = document.getElementById("two-player");
_startTwoPlayerGame.addEventListener("click", () => {
    // get names to create players
    let nameOne = document.getElementById("playerOneName").value;
    let nameTwo = document.getElementById("playerTwoName").value;
    // get marker selections for each player
    let markerSelections = document.getElementsByName("playerOneMarker");
    let markerOne = (markerSelections[0].checked) ? markerSelections[0].value : markerSelections[1].value;
    let markerTwo = (markerSelections[0].checked) ? markerSelections[1].value : markerSelections[0].value;
    // create players
    playerOne = Player(nameOne, markerOne);
    playerTwo = Player(nameTwo, markerTwo);
    // close form to enter players
    let closeForm = document.getElementById("playerForm");
    closeForm.style.display = "none";
    // display gameboard
    let openBoard = document.getElementById("gamespace");
    openBoard.style.display = "grid";
    // initiate the start of a game and add players to game
    GamePlay.setPlayers()
});

// to reset game and display form again
let _resetGame = document.getElementById("resetGame");
_resetGame.addEventListener("click", () => {
    GamePlay.clearGame();
    Gameboard.clearBoard();
    // open form to enter players
    let openForm = document.getElementById("playerForm");
    openForm.style.display = "block";
    // close gameboard
    let closeBoard = document.getElementById("gamespace");
    closeBoard.style.display = "none";
})
// to play another round with same players
let _playAgain = document.getElementById("playAgain");
_playAgain.addEventListener("click", () => {
    GamePlay.resetMoveCounter();
    Gameboard.clearBoard();
})