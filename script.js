const holes = document.querySelectorAll(".hole");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("startButton");

let score = 0;
let activeHole = null;
let gameInterval;

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  clearInterval(gameInterval);
  gameInterval = setInterval(showMole, 800);

  setTimeout(() => {
    clearInterval(gameInterval);
    alert("ゲーム終了！スコア: " + score);
  }, 30000); // 30秒で終了
}

function showMole() {
  if (activeHole !== null) {
    activeHole.classList.remove("mole");
  }

  const index = Math.floor(Math.random() * holes.length);
  activeHole = holes[index];
  activeHole.classList.add("mole");

  activeHole.onclick = () => {
    if (activeHole.classList.contains("mole")) {
      score++;
      scoreDisplay.textContent = score;
      activeHole.classList.remove("mole");
    }
  };
}

startButton.onclick = startGame;
