const Controller = require("./controller");

module.exports = class DOM {
  main;

  static greetingPage() {
    DOM.main = document.createElement("div");
    DOM.main.className = "main greetings";

    const greetContainer = document.createElement("div");
    const greetTitle = document.createElement("h1");
    const greetDescription = document.createElement("p");
    const continueButton = document.createElement("button");

    greetContainer.className = "greet-container";
    continueButton.className = "continue btn";

    greetTitle.textContent = "Battleship";
    greetDescription.textContent = `
    Welcome to my version of the classic game of Battleship!
    `;

    continueButton.textContent = "Continue";
    continueButton.addEventListener("click", DOM.gameInitPage);
    greetContainer.append(greetTitle, greetDescription);
    DOM.main.append(greetContainer, continueButton);
    document.body.append(DOM.main);
  }

  static gameInitPage() {
    DOM.main = document.createElement("div");
    document.body.append(DOM.main);
    // DOM.main.innerHTML = "";
    DOM.main.className = "main gameInit";
    const opponentContainer = document.createElement("div");
    const opponentTitle = document.createElement("h1");
    const btnContainer = document.createElement("div");
    const playerButton = document.createElement("button");
    const computerButton = document.createElement("button");
    const startButton = document.createElement("button");

    opponentTitle.textContent = "Choose your opponent";
    playerButton.textContent = "Player";
    computerButton.textContent = "Computer";
    startButton.textContent = "Start Game";

    playerButton.id = "player";
    computerButton.id = "computer";

    btnContainer.append(playerButton, computerButton);
    opponentContainer.append(opponentTitle, btnContainer);
    DOM.main.append(opponentContainer, DOM.getPlayersForm(), startButton);

    playerButton.addEventListener("click", handlePlayerButton);
    computerButton.addEventListener("click", handleComputerButton);
    startButton.addEventListener("click", handleStartButton);

    function handleStartButton() {
      const player = document.querySelector("#player");
      const computer = document.querySelector("#computer");
      const form = document.querySelector(".form-container");

      const errorMessage = form.children[0];
      const player_1Name = form.children[2].value;
      const player_2Name = form.children[4].value;

      if (!player_1Name || !player_2Name) {
        errorMessage.textContent = "Both names must be filled";
        return;
      }

      errorMessage.textContent = "";

      if (player.className.includes("active")) {
        Controller.init(player_1Name, player_2Name);
        DOM.prepTurnPage();
        console.log(DOM.players);
      }
    }

    function handlePlayerButton() {
      if (!playerButton.className.includes("active")) {
        computerButton.classList.remove("active");
        playerButton.classList.add("active");
      }

      if (playerButton.className.includes("active")) {
        const form = document.querySelector(".form-container");
        form.style.display = "block";
      }
    }

    function handleComputerButton() {
      if (!computerButton.className.includes("active")) {
        playerButton.classList.remove("active");
        computerButton.classList.add("active");

        const form = document.querySelector(".form-container");
        form.style.display = "none";
      }
    }
  }

  static getPlayersForm() {
    const formContainer = document.createElement("form");
    const player_1_label = document.createElement("label");
    const player_1_input = document.createElement("input");
    const player_2_label = document.createElement("label");
    const player_2_input = document.createElement("input");
    const errorMessage = document.createElement("span");

    formContainer.className = "form-container";
    errorMessage.className = "error-msg";

    player_1_label.textContent = "Player 1 name:";
    player_2_label.textContent = "Player 2 name:";

    formContainer.style.display = "none";

    player_1_input.setAttribute("required", "");
    player_2_input.setAttribute("required", "");

    formContainer.append(
      errorMessage,
      player_1_label,
      player_1_input,
      player_2_label,
      player_2_input
    );

    return formContainer;
  }

  static prepTurnPage() {
    DOM.main.innerHTML = "";
    const player_1Board = document.createElement("div");
    const keys = Object.keys(Controller.player_1.gameboard.nodes);

    player_1Board.className = "player_1Board";

    for (let i = 1; i < 12; i++) {
      const row = document.createElement("div");
      row.className = "row";

      for (let j = 0; j < 11; j++) {
        const node = document.createElement("div");
        node.className = "node";

        i === 1 && j === 0
          ? (node.textContent = "")
          : i === 1 && j > 0
          ? (node.textContent = j)
          : i > 1 && j === 0
          ? (node.textContent = keys[i - 2])
          : (node.textContent = `${keys[i - 2]}${j}`);

        row.append(node);
      }
      player_1Board.append(row);
    }

    DOM.main.append(player_1Board);
  }

  static gameTurnPage() {}
};
