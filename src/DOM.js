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
    const frontImage = document.createElement("img");

    frontImage.className = "front-image";
    greetContainer.className = "greet-container";
    continueButton.className = "continue btn";

    greetTitle.textContent = "Battleship";
    greetDescription.innerHTML = `
    Welcome to my version of the classic game of 
    <span class="battleship">Battleship</span>!
    `;

    continueButton.textContent = "Continue";
    continueButton.addEventListener("click", DOM.gameInitPage);
    greetContainer.append(greetTitle, greetDescription);
    DOM.main.append(greetContainer, frontImage, continueButton);
    document.body.append(DOM.main);
  }

  static gameInitPage() {
    // DOM.main = document.createElement("div");
    // document.body.append(DOM.main);
    DOM.main.innerHTML = "";
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

    playerButton.className = "player btn";
    computerButton.className = "computer btn";
    startButton.className = "start btn";
    opponentContainer.className = "opponent-banner";

    btnContainer.append(playerButton, computerButton);
    opponentContainer.append(opponentTitle, btnContainer);
    DOM.main.append(opponentContainer, DOM.getPlayersForm(), startButton);

    playerButton.addEventListener("click", DOM.eventHandler);
    computerButton.addEventListener("click", DOM.eventHandler);
    startButton.addEventListener("click", DOM.eventHandler);
    document.querySelector(".form-container").innerHTML = "";
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

    player_1_label.setAttribute("placeholder", "Name");
    player_2_label.setAttribute("placeholder", "Name");

    player_1_label.setAttribute("for", "player-1");
    player_2_label.setAttribute("for", "player-2");

    player_1_input.setAttribute("required", "");
    player_1_input.setAttribute("id", "player-1");
    player_2_input.setAttribute("required", "");
    player_2_input.setAttribute("id", "player-2");

    formContainer.append(
      errorMessage,
      player_1_label,
      player_1_input,
      player_2_label,
      player_2_input
    );

    return formContainer;
  }

  static prepTurnPage(player) {
    DOM.main.innerHTML = "";
    const boardWrapper = document.createElement("div");
    const playerBoard = DOM.renderBoard();
    const playerName = document.createElement("h1");
    const readyButton = document.createElement("button");

    boardWrapper.className = "board wrapper";
    playerBoard.className = "playerBoard";
    playerName.className = "player-name";
    readyButton.className = "ready btn";

    playerName.textContent = player;
    readyButton.textContent = "Ready";

    boardWrapper.append(playerName, playerBoard);
    DOM.main.append(boardWrapper, readyButton);
  }

  static gameTurnPage() {}

  static renderBoard() {
    const board = document.createElement("div");
    const keys = Object.keys(Controller.player_1.gameboard.nodes);

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
          : (node.className = `node ${keys[i - 2]}${j}`);

        row.append(node);
      }
      board.append(row);
    }
    return board;
  }

  static eventHandler(event) {
    const playerButton = document.querySelectorAll("button")[0];
    const computerButton = document.querySelectorAll("button")[1];

    const player = document.querySelector("#player");
    const computer = document.querySelector("#computer");
    const form = document.querySelector(".form-container");

    const errorMessage = form.children[0];

    switch (event.target.textContent) {
      case "Player":
        handlePlayerButton();
        break;
      case "Computer":
        handleComputerButton();
        break;
      case "Start Game":
        handleStartButton();
        break;
      default:
        break;

        function handleComputerButton() {
          if (!computerButton.className.includes("active")) {
            playerButton.classList.remove("active");
            computerButton.classList.add("active");

            const form = document.querySelector(".form-container");
            form.removeChild(form.childNodes[4]);
            form.removeChild(form.childNodes[3]);
          }
        }

        function handlePlayerButton() {
          if (!playerButton.className.includes("active")) {
            computerButton.classList.remove("active");
            playerButton.classList.add("active");
          }

          if (playerButton.className.includes("active")) {
            const form = document.querySelector(".form-container");
            form.replaceWith(DOM.getPlayersForm());
          }
        }

        function handleStartButton() {
          const player_1Name = form.children[2].value;
          let player_2Name = form.children[4];
          if (player_2Name) {
            player_2Name = form.children[4].value;
          }

          if (!player_1Name || !player_2Name) {
            errorMessage.textContent = "Both names must be filled!";
            return;
          }

          errorMessage.textContent = "";

          if (player.className.includes("active")) {
            Controller.init(player_1Name, player_2Name);
            DOM.prepTurnPage();
          }
        }
    }
  }
};
