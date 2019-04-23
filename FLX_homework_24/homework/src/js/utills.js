export function App() {
  const elements = ["rock", "paper", "scissors"];
  let round = 1;
  let userScore = 0;
  let aiScore = 0;
  let result = '0';

  const gameFrame = document.querySelector("#game");
  const gameTitle = document.querySelector(".game__title");
  const rockButton = document.querySelector(".game__rock-button");
  const paperButton = document.querySelector(".game__paper-button");
  const scissorsButton = document.querySelector(".game_scissors-button");
  const gameLogs = document.querySelector(".game__logs");
  const gameButtons = document.querySelectorAll(".game-button");
  const userScores = document.querySelector(".game__user-score");
  const aiScores = document.querySelector(".game__ai-score");

  const gameText = document.createElement("div");

  gameButtons.forEach(function(el) {
    el.addEventListener("click", () => {
      if (userScore < 3 && aiScore < 3) {
        const won = () => {
          const span = document.createElement("span");
          span.setAttribute("class", "won");
          span.innerHTML = `Round ${round}, ${str} vs. ${str2}, You've ${result}! <br>`;
          round++;
          gameLogs.appendChild(span);
        };

        const lose = () => {
          const span = document.createElement("span");
          span.setAttribute("class", "lose");
          span.innerHTML = `Round ${round}, ${str} vs. ${str2}, You've ${result}! <br>`;
          round++;
          gameLogs.appendChild(span);
        };

        const draw = () => {
          const span = document.createElement("span");
          span.setAttribute("class", "draw");
          span.innerHTML = `Round ${round}, ${str} vs. ${str2}, You've ${result}! <br>`;
          round++;
          gameLogs.appendChild(span);
        };

        let str = el.innerText.toLowerCase();
        let str2 = getRandomElementFromArray();
        let result = "WON";

        if (str === "rock") {
          if (str2 === "rock") {
            result = "play again, DRAW!";
            draw();
          } else if (str2 === "paper") {
            result = "LOSE";
            aiScore++;
            lose();
          } else if (str2 === "scissors") {
            result = "WON";
            userScore++;
            won();
          }
        } else if (str === "paper") {
          if (str2 === "rock") {
            result = "WON";
            userScore++;
            won();
          } else if (str2 === "paper") {
            result = "play again, DRAW!";
            draw();
          } else if (str2 === "scissors") {
            result = "LOSE";
            aiScore++;
            lose();
          }
        } else if (str === "scissors") {
          if (str2 === "rock") {
            result = "LOSE";
            aiScore++;
            lose();
          } else if (str2 === "paper") {
            result = "WON";
            userScore++;
            won();
          } else if (str2 === "scissors") {
            result = "play again, DRAW!";
            draw();
          }
        }

        gameTitle.innerHTML = `Round ${round}`;
        userScores.innerHTML = userScore;
        aiScores.innerHTML = aiScore;
      } else {
        if (userScore === 3) {
          const span = document.createElement("span");
          span.setAttribute("class", "won");
          span.innerHTML = `You WON!`;
          gameLogs.appendChild(span);
          gameButtons.forEach((element) => {
            element.disabled = true;
          })
        } else if (aiScore === 3) {
          const span = document.createElement("span");
          span.setAttribute("class", "lose");
          span.innerHTML = `You LOSE!`;
          gameLogs.appendChild(span);
          gameButtons.forEach((element) => {
            element.disabled = true;
          })
        }
      }
    });
  });

  const reset = () => {
    round = 1;
    aiScore = 0;
    userScore = 0;
    gameTitle.innerHTML = `Round ${round}`;
    userScores.innerHTML = userScore;
    aiScores.innerHTML = aiScore;

    gameButtons.forEach((element) => {
      element.disabled = false;
    });

    while (gameLogs.firstChild) {
      gameLogs.removeChild(gameLogs.firstChild);
    }
  };

  let resetButton = document.querySelector(".game__button-reset");
  resetButton.addEventListener("click", reset);
  gameFrame.appendChild(gameText);

  const getRandomElementFromArray = array => {
    return elements[Math.floor(Math.random() * elements.length)];
  };
}
