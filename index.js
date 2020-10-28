// create main objects used in Tic-Tac-Toe
const Gameboard = (() => {
    // initialize array to store marker positions
    let gameboard = [null, null, null, null, null, null, null, null, null];
    // adds marker to board
    const addMarker = (position, marker) => {
        gameboard[position] = marker;
        let square = document.getElementById(`${position}-square`);
        square.textContent = marker;
    }
    return {addMarker};
})();

const Player = (name, marker) => {
    const playerName = name;
    const playerMarker = marker;
    const makeMove = () => {
        
    }
    return {playerName, playerMarker};
};

const GamePlay = (() => {
    let firstPlayer = null;
    let secondPlayer = null;
    const setPlayers = () => {
        firstPlayer = playerOne;
        secondPlayer = playerTwo;
    }
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

// display form to add player 2
let _displayPlayerTwoForm = document.getElementById("add-player-two");
_displayPlayerTwoForm.addEventListener("click", () => {
    let _playerTwoForm = document.getElementById("playerTwoForm");
    _playerTwoForm.style.display = "block";
});

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
});