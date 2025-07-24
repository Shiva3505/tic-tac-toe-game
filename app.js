/** @format */

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_btn");
let newGameBtn = document.querySelector("#new_game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let startBtn = document.querySelector("#start_btn");
let player1Input = document.querySelector("#player1");
let player2Input = document.querySelector("#player2");
let turnDisplay = document.querySelector("#turn");
let p1NameDisplay = document.querySelector("#p1_name");
let p2NameDisplay = document.querySelector("#p2_name");
let p1ScoreDisplay = document.querySelector("#p1_score");
let p2ScoreDisplay = document.querySelector("#p2_score");

let turnO = true;
let count = 0;
let gameStarted = false;
let player1 = "Player 1";
let player2 = "Player 2";
let p1Score = 0;
let p2Score = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

startBtn.addEventListener("click", () => {
  player1 = player1Input.value || "Player 1";
  player2 = player2Input.value || "Player 2";
  p1NameDisplay.innerText = player1;
  p2NameDisplay.innerText = player2;
  turnDisplay.innerText = `Current Turn: ${player2} (O)`;
  player1Input.disabled = true;
  player2Input.disabled = true;
  gameStarted = true;
  resetGame();
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!gameStarted || box.innerText !== "") return;

    if (turnO) {
      box.innerText = "O";
      box.classList.add("o");
      turnDisplay.innerText = `Current Turn: ${player1} (X)`;
    } else {
      box.innerText = "X";
      box.classList.add("x");
      turnDisplay.innerText = `Current Turn: ${player2} (O)`;
    }

    box.disabled = true;
    turnO = !turnO;
    count++;

    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = "Game was a Draw";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("x", "o");
  });
};

const showWinner = (winnerSymbol) => {
  let winnerName = winnerSymbol === "X" ? player1 : player2;
  msg.innerText = `Congratulations, Winner is ${winnerName}`;
  msgContainer.classList.remove("hide");
  disableBoxes();

  if (winnerSymbol === "X") {
    p1Score++;
    p1ScoreDisplay.innerText = p1Score;
  } else {
    p2Score++;
    p2ScoreDisplay.innerText = p2Score;
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val && pos1val === pos2val && pos2val === pos3val) {
      showWinner(pos1val);
      return true;
    }
  }
  return false;
};

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  turnDisplay.innerText = `Current Turn: ${player2} (O)`;
  player1Input.disabled = true;
  player2Input.disabled = true;
};

newGameBtn.addEventListener("click", resetGame);

resetBtn.addEventListener("click", () => {
  p1Score = 0;
  p2Score = 0;
  p1ScoreDisplay.innerText = "0";
  p2ScoreDisplay.innerText = "0";
  gameStarted = false;
  player1Input.disabled = false;
  player2Input.disabled = false;
  enableBoxes();
  msgContainer.classList.add("hide");
  turnDisplay.innerText = `Current Turn:`;
});
