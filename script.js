let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let mode = 'multiplayer';

function setMode(selectedMode) {
    mode = selectedMode;
    resetGame();
}

function handleCellClick(index) {
    if (!gameActive || board[index] !== '') return;
    board[index] = currentPlayer;
    renderBoard();
    checkWinner();
    if (mode === 'singleplayer' && gameActive) {
        aiMove();
    }
}

function aiMove() {
    let emptyCells = board.map((val, idx) => val === '' ? idx : null).filter(v => v !== null);
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomCell] = 'O';
    renderBoard();
    checkWinner();
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById('status').innerText = `${board[a]} Wins!`;
            gameActive = false;
            return;
        }
    }
    if (!board.includes('')) {
        document.getElementById('status').innerText = "It's a Tie!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').innerText = '';
    renderBoard();
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.innerText = cell;
        cellElement.onclick = () => handleCellClick(index);
        boardElement.appendChild(cellElement);
    });
}

renderBoard();
