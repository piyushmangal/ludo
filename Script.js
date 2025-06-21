// script.js

const rollDiceBtn = document.getElementById('roll-dice-btn');
const diceDisplay = document.getElementById('dice-display');
const currentPlayerDisplay = document.getElementById('current-player-display');
const gameBoard = document.getElementById('game-board');

// Game State Variables
const players = ['red', 'green', 'yellow', 'blue'];
let currentPlayerIndex = 0;
let diceValue = 0;

// --- Board Configuration (Simplified for now) ---
// In a real Ludo, you'd define the exact pixel positions or grid cells
// for each "spot" on the board where a pawn can land.
// For this example, we'll assume a very basic setup.
// You'd need a more robust data structure to represent the 52 main path cells,
// and the individual home starting/finish spots.

// A simplified representation of board cells.
// In a full game, each 'cell' would have precise coordinates or grid positions.
const boardCells = []; // This array will hold references to the DOM elements of path cells
const playerHomeStarts = {
    red: [], // e.g., 4 specific spots for red's pawns to start
    green: [],
    yellow: [],
    blue: []
};
const playerHomePaths = { // The colored paths leading to the center
    red: [],
    green: [],
    yellow: [],
    blue: []
};
const playerFinishSpots = { // The final triangle in the center
    red: null,
    green: null,
    yellow: null,
    blue: null
};


// Function to create pawns (tokens)
function createPawn(playerColor, pawnId) {
    const pawn = document.createElement('div');
    pawn.classList.add('pawn', playerColor);
    pawn.dataset.playerId = playerColor;
    pawn.dataset.pawnId = pawnId;
    pawn.textContent = pawnId; // For easy identification
    gameBoard.appendChild(pawn);
    // Initial positioning (e.g., in their home base)
    // This will require more complex logic to place them visually in HTML.
    // For now, they'll just appear on the board, but not in correct start spots.
    // pawn.style.left = 'Xpx';
    // pawn.style.top = 'Ypx';
    return pawn;
}

// Player Pawns data structure
const playerPawns = {
    red: [],
    green: [],
    yellow: [],
    blue: []
};

// Initialize pawns
function initializePawns() {
    players.forEach(playerColor => {
        for (let i = 1; i <= 4; i++) { // Each player has 4 pawns
            const pawn = createPawn(playerColor, i);
            playerPawns[playerColor].push({
                element: pawn,
                position: 'home', // 'home', 'path-cell-X', 'home-path-Y', 'finished'
                cellIndex: -1 // -1 for home, 0-51 for main path, etc.
            });
            // TODO: Visually place pawns in their home areas (requires more detailed CSS/JS positioning)
            // For now, they are just appended to the game board.
        }
    });
}


// --- Dice Roll Logic ---
rollDiceBtn.addEventListener('click', () => {
    diceValue = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
    diceDisplay.textContent = diceValue;
    console.log(`${players[currentPlayerIndex]}'s turn. Rolled: ${diceValue}`);

    // Here's where the core game logic would start:
    // 1. Check if player has any pawns out.
    // 2. If rolled a 6, allow bringing a pawn out or moving existing.
    // 3. If no 6 and no pawns out, turn passes.
    // 4. If pawns can move, highlight movable pawns.
    // 5. Wait for player to click a pawn.
    // 6. Move the pawn, check for captures, entering home path, etc.

    // For now, just advance turn
    setTimeout(() => { // Give a brief pause for dice display
        // Basic turn advancement
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        currentPlayerDisplay.textContent = `Current Player: ${players[currentPlayerIndex].charAt(0).toUpperCase() + players[currentPlayerIndex].slice(1)}`;
    }, 1000);
});


// --- Game Initialization ---
function initGame() {
    // Populate boardCells (e.g., dynamically create 52 path cells)
    // For a real game, you'd create these programmatically and assign IDs.
    // Example:
    // for (let i = 0; i < 52; i++) {
    //     const cell = document.createElement('div');
    //     cell.classList.add('path-cell');
    //     cell.id = `cell-${i}`;
    //     // You'd also need to manage their grid placement here
    //     // based on the Ludo board layout.
    //     gameBoard.appendChild(cell);
    //     boardCells.push(cell);
    // }

    // More complex: Map pawn positions to actual HTML element positions (CSS `left` and `top`)
    // This is often done by pre-calculating the pixel coordinates of each cell.

    initializePawns();
    currentPlayerDisplay.textContent = `Current Player: ${players[currentPlayerIndex].charAt(0).toUpperCase() + players[currentPlayerIndex].slice(1)}`;
}

// Start the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);

// --- TODO: Advanced Game Logic (Conceptual Outline) ---

/*
// Function to move a pawn
function movePawn(pawnElement, steps) {
    const pawnData = playerPawns[pawnElement.dataset.playerId].find(p => p.element === pawnElement);
    if (!pawnData) return;

    let targetCellIndex = pawnData.cellIndex + steps;

    // Handle going from home to start position (only on a 6)
    if (pawnData.position === 'home' && diceValue === 6) {
        // Place pawn on its starting cell
        // pawnData.element.style.left = startingCellCoords.x + 'px';
        // pawnData.element.style.top = startingCellCoords.y + 'px';
        pawnData.position = 'main-path';
        pawnData.cellIndex = getPlayerStartCellIndex(pawnData.playerId); // Get the specific start cell for this player
        // Visual update
        return;
    }

    // Main path movement logic
    if (pawnData.position === 'main-path') {
        // Check for wrapping around the board
        // Check for entering home path
        // Check for landing on opponent, etc.
        // Update pawnData.cellIndex
        // Update pawnData.element.style.left and .top
    }

    // Home path movement logic
    // ...

    // Finish logic
    // ...

    // Check for capturing
    // Check for winning
}

// Event listener for pawn clicks (to move them after dice roll)
gameBoard.addEventListener('click', (event) => {
    if (event.target.classList.contains('pawn')) {
        // Check if it's the current player's pawn and if it's movable
        // Call movePawn(event.target, diceValue);
    }
});
*/
