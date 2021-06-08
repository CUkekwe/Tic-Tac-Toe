// storing the game status here to easily access it later
const statusDisplay = document.querySelector('.game-status');

let gameActive = true;

// variable that stores the current player, so we know whos turn it is
let currentPlayer = "X"

//Game state is an array of empty strings which will let us track played cells and validate the game state later
let gameState = ["", "", "", "", "", "", "", "", "",]

// These are the messages that will be displayed during and after the game. Since some of them will be dynamic, I used template strings stored inside of a function to allow the real message to be populated with the player data when needed.
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//Initial message to let the players know whos turn it is
statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed(clickedCell, clickedCellIndex) {
    //Both the game state and the UI are updated to relfect the played move
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    //If there are no more empty spaces in the game state array and nobody has won, the game will be ended as a draw.
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    //If there are still moves to be played and nobody has won the game yet, we will switch to the other player
    handlePlayerChange();

}

function handleCellClick(clickedCellEvent) {
    //The clicked html element is saved in a variable for easier further use
    const clickedCell = clickedCellEvent.target;

    //here we will grab the 'data-cell-index' attribute from the clicked cell to determine the specific cell that was clicked. Since the ".getAttribute" prototype will return a string, I use parseInt to convert it to an integer
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );

    //Next we use an if statement to check if the cell has already been clicked or the game is paused. If either of those conditions are met, the click is ignored so nothing happens
    if (gameState[clickedCellIndex] != "" || !gameActive) {
        return;
    }
    //If everything checks out, we will proceed with the game flow
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", "",]
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");
}

//Event listeners for each of the game cells as well as the restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);

