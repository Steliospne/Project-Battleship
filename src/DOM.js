module.exports = class DOM {
  main;

  static greetingPage() {
    DOM.main = document.createElement("div");
    DOM.main.className = "main greetigns";

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
    DOM.main.innerHTML = "";
    DOM.main.className = "main gameInit";
    const opponentContainer = document.createElement("div");
    const opponentTitle = document.createElement("h1");
    const btnContainer = document.createElement("div");
    const playerButton = document.createElement("button");
    const computerButton = document.createElement("button");
    const startButton = document.createElement("button");

    function getPlayersForm() {
      const formContainer = document.createElement("div");
      const player_1_label = document.createElement("label");
      const player_2_label = document.createElement("label");
      const player_1_input = document.createElement("input");
      const player_2_input = document.createElement("input");

      formContainer.append(
        player_1_label,
        player_1_input,
        player_2_label,
        player_2_input
      );

      return formContainer;
    }

    opponentTitle.textContent = "Choose your opponent";
    playerButton.textContent = "Player";
    computerButton.textContent = "Computer";
    startButton.textContent = "Start Game";

    playerButton.addEventListener("click", handlePlayerButton);
    computerButton.addEventListener("click", handleComputerButton);

    btnContainer.append(playerButton, computerButton);
    opponentContainer.append(opponentTitle, btnContainer);
    DOM.main.append(opponentContainer, getPlayersForm(), startButton);

    function handlePlayerButton() {
      if (!playerButton.className.includes("active")) {
        computerButton.classList.remove("active");
        playerButton.classList.add("active");
      }

      if (playerButton.className.includes("active")) {
      }
    }

    function handleComputerButton() {
      if (!computerButton.className.includes("active")) {
        playerButton.classList.remove("active");
        computerButton.classList.add("active");
      }
    }
  }

  static prepTurnPage() {}

  static gameTurnPage() {}
};
