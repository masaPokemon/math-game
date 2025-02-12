let board = [];
let score = 0;
let timer;
let timeLeft = 90;

const startButton = document.getElementById("start-button");
const gameBoard = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

startButton.addEventListener("click", startGame);

function startGame() {
    score = 0;
    timeLeft = 90;
    board = createBoard();
    updateBoard();
    updateScore();
    updateTime();
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTime();
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("時間終了! 最終スコア: " + score);
        }
    }, 1000);
}

function updateTime() {
    timeDisplay.textContent = "残り時間: " + timeLeft + "秒";
}

function createBoard() {
    const newBoard = [];
    for (let i = 0; i < 6; i++) {
        newBoard[i] = [];
        for (let j = 0; j < 6; j++) {
            newBoard[i][j] = Math.floor(Math.random() * 9) + 1;  // 1から9までのランダムな数字
        }
    }
    return newBoard;
}

function updateBoard() {
    gameBoard.innerHTML = "";
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            const cell = document.createElement("div");
            cell.textContent = board[i][j];
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", () => handleCellClick(i, j));
            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(row, col) {
    const num = board[row][col];
    if (num >= 12 && num <= 24) {  // つながる範囲の確認
        score += num;  // 得点追加
        board[row][col] = 0;  // 数字を消去
        dropNewNumbers();  // 新しい数字を降らせる
        updateBoard();  // ボード更新
        updateScore();  // スコア更新
    }
}

function dropNewNumbers() {
    // 上から新しい数字を追加
    for (let col = 0; col < 6; col++) {
        for (let row = 5; row >= 0; row--) {
            if (board[row][col] === 0 && row > 0) {
                board[row][col] = board[row - 1][col];
                board[row - 1][col] = 0;
            } else if (board[row][col] === 0) {
                board[row][col] = Math.floor(Math.random() * 9) + 1;  // 新しい数字を上から降らせる
            }
        }
    }
}

function updateScore() {
    scoreDisplay.textContent = "スコア: " + score;
}
