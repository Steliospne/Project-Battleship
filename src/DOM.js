const Controller = require("./controller");

module.exports = class DOM {
  main;

  static pageTemplete() {
    DOM.main = document.createElement("div");
  }

  static greetingPage() {
    DOM.pageTemplete();
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

    playerButton.addEventListener("click", DOM.eventHandlerInitPage);
    computerButton.addEventListener("click", DOM.eventHandlerInitPage);
    startButton.addEventListener("click", DOM.eventHandlerInitPage);
    document.querySelector(".form-container").innerHTML = "";
  }

  static getPlayersForm(event) {
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

    if (!event) {
      return formContainer;
    } else if (event.target.textContent === "Player") {
      formContainer.append(
        errorMessage,
        player_1_label,
        player_1_input,
        player_2_label,
        player_2_input
      );
    } else {
      formContainer.append(errorMessage, player_1_label, player_1_input);
    }

    return formContainer;
  }

  static instrucntions() {
    const instr_wrapper = document.createElement("div");
    const labelDiv = document.createElement("div");
    const toRotate = document.createElement("li");
    const toDelete = document.createElement("li");
    const list = document.createElement("ul");

    instr_wrapper.className = "instruction-wrapper";
    labelDiv.className = "instruction-label";
    list.classList = "instruction-list";

    labelDiv.textContent = "Instructions";

    toRotate.innerHTML = `<span style='color:#2dba4e;'>Rotate:</span> Ships before dragging them
    by pressing the <span style='color:#2dba4e;'>R</span> button on your keyboard.`;

    toDelete.innerHTML = `<span style='color:red;'>Delete:</span> Ships you have placed on the board
    by clicking on them.`;

    list.append(toRotate, toDelete);
    instr_wrapper.append(labelDiv, list);
    return instr_wrapper;
  }

  static prepTurnPage(player) {
    DOM.main.innerHTML = "";
    DOM.main.className = "main gamePrep";
    const currentPlayer = player;
    const msgBox = document.createElement("div");
    const instructions = DOM.instrucntions();
    const boardWrapper = document.createElement("div");
    const playerBoard = DOM.createBoard();
    const playerName = document.createElement("h1");
    const fleetWrapper = document.createElement("div");
    const fleet = DOM.createFleet();
    const readyButton = document.createElement("button");

    msgBox.className = "msg-box";
    boardWrapper.className = "board wrapper";
    playerBoard.className = "playerBoard";
    playerName.className = "player-name";
    fleetWrapper.className = "fleet-wrapper";
    fleet.className = "fleet";

    readyButton.className = "ready btn";

    playerName.textContent = currentPlayer;
    readyButton.textContent = "Ready";

    let dragged = null;
    let shipPartClicked = null;

    fleet.childNodes.forEach((el) => {
      if (!el.className.includes("name")) {
        el.addEventListener("dragstart", (event) => {
          dragged = event.target;
        });

        el.addEventListener("mousedown", (e) => {
          shipPartClicked = e.target.classList[1];
        });
      }
    });

    document.addEventListener("keydown", (e) => {
      let ships;
      if (playerName.textContent === Controller.player_1.name) {
        ships = Controller.player_1.gameboard.fleet;
      } else {
        ships = Controller.player_2.gameboard.fleet;
      }
      if (e.key === "r" && fleet.className.includes("vertical")) {
        fleet.classList.remove("vertical");
      } else if (e.key === "r") {
        fleet.classList.add("vertical");
      }

      for (const ship in ships) {
        ships[ship].isHorizontal === true
          ? (ships[ship].isHorizontal = false)
          : (ships[ship].isHorizontal = true);
      }
    });

    playerBoard.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    // playerBoard.addEventListener("dragenter", (e) => {
    //   const targetX = e.target.classList[1][0];
    //   const targetY = e.target.classList[1].slice(1);
    //   for (let i = 0; i < dragged.childNodes.length; i++) {
    //     let newY = +targetY + i;
    //     if (newY < 11) {
    //       document.getElementsByClassName(
    //         targetX + newY
    //       )[0].style.backgroundColor = "green";
    //     }
    //   }
    // });

    // playerBoard.addEventListener("dragleave", (e) => {
    //   const targetX = e.target.classList[1][0];
    //   const targetY = e.target.classList[1].slice(1);
    //   for (let i = 0; i < dragged.childNodes.length; i++) {
    //     let newY = +targetY + i;
    //     if (newY < 11) {
    //       document.getElementsByClassName(
    //         targetX + newY
    //       )[0].style.backgroundColor = "";
    //     }
    //   }
    // });

    playerBoard.addEventListener("drop", (e) => {
      if (
        !e.target.className.match(/[a-z]/) &&
        !e.target.className.match(/[0-9]/)
      )
        return;
      const targetCoordinates = e.target.classList[1];
      const coordinates =
        targetCoordinates.slice(0, 1) +
        (+targetCoordinates.slice(1) - 1 - +shipPartClicked);

      const ship = dragged.classList[0];
      const shipPlacement = Controller.handleShipPlacement(
        currentPlayer,
        coordinates,
        ship
      );

      if (shipPlacement[0] === 1) {
        shipPlacement[1].forEach((node) => {
          node = node.slice(0, 1) + (+node.slice(1) + 1);
          let target = document.getElementsByClassName(node)[0];
          target.classList.add("ship-node", ship);
        });
        dragged.parentNode.removeChild(dragged.previousSibling);
        dragged.parentNode.removeChild(dragged);
      }
    });

    playerBoard.addEventListener("click", (e) => {
      const target = e.target;
      let deletedShip = null;
      if (target.className.includes("ship-node")) {
        const shipName = target.classList[3];
        document.querySelector(".playerBoard").childNodes.forEach((row) => {
          row.childNodes.forEach((node) => {
            if (node.className.includes(shipName)) {
              const x = node.classList[1][0];
              const y = +node.classList[1][1];

              node.classList.remove("ship-node", shipName);
              deletedShip = shipName;

              if (!Controller.player_1.name === playerName) {
                Controller.player_2.gameboard.nodes[x][y - 1] = undefined;
              }
              Controller.player_1.gameboard.nodes[x][y - 1] = undefined;
            }
          });
        });
      }
      if (deletedShip) {
        DOM.createFleet(deletedShip).addEventListener("dragstart", (event) => {
          dragged = event.target;
        });
      }
    });

    readyButton.addEventListener("click", (e) => {
      console.log(!(fleet.childNodes.length === 0), fleet.childNodes.length);
      if (!(fleet.childNodes.length === 0)) {
        console.log("im in");
        msgBox.textContent = "You must place all your ships first!";
        return;
      }
      msgBox.textContent = "";
      Controller.turnManager(playerName.textContent, 1);
      console.log("ready to play");
    });

    boardWrapper.append(playerName, playerBoard);
    fleetWrapper.append(fleet);
    DOM.main.append(
      msgBox,
      boardWrapper,
      instructions,
      fleetWrapper,
      readyButton
    );
  }

  static gameTurnPage() {
    DOM.main.innerHTML = "";
  }

  static createBoard() {
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
          ? (node.textContent = j) && (node.className = `node ${j}`)
          : i > 1 && j === 0
          ? (node.textContent = keys[i - 2]) &&
            (node.className = `node ${keys[i - 2]}`)
          : (node.className = `node ${keys[i - 2]}${j}`);

        row.append(node);
      }
      board.append(row);
    }
    return board;
  }

  static createFleet(ship) {
    const ships = Controller.player_1.gameboard.fleet;

    if (ship) {
      const fleet = document.querySelector(".fleet");
      const shipEl = document.createElement("div");
      const shipName = document.createElement("div");

      shipEl.className = ship + " ship";
      shipName.className = "ship-name";
      shipName.textContent = ship;

      shipEl.setAttribute("draggable", "true");

      fleet.append(shipName);
      for (let i = 0; i < ships[ship].length; i++) {
        const shipNodes = document.createElement("div");
        shipNodes.className = "ship-node " + i;
        shipEl.append(shipNodes);
      }
      fleet.append(shipEl);
      return shipEl;
    }

    const fleet = document.createElement("div");
    fleet.className = "fleet";
    for (const ship in ships) {
      const shipEl = document.createElement("div");
      const shipName = document.createElement("div");

      shipEl.className = ship + " ship";
      shipName.className = "ship-name";
      shipName.textContent = ship;

      shipEl.setAttribute("draggable", "true");

      fleet.append(shipName);
      for (let i = 0; i < ships[ship].length; i++) {
        const shipNodes = document.createElement("div");
        shipNodes.className = "ship-node " + i;
        shipEl.append(shipNodes);
      }
      fleet.append(shipEl);
    }
    return fleet;
  }

  static eventHandlerInitPage(event) {
    const playerButton = document.querySelectorAll("button")[0];
    const computerButton = document.querySelectorAll("button")[1];

    const player = document.querySelector("#player");
    const computer = document.querySelector("#computer");
    let form = document.querySelector(".form-container");

    const errorMessage = form.children[0];

    switch (event.target.textContent) {
      case "Player":
        handlePlayerButton(event);
        break;
      case "Computer":
        handleComputerButton(event);
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
          }
          form.replaceWith(DOM.getPlayersForm(event));
        }

        function handlePlayerButton() {
          if (!playerButton.className.includes("active")) {
            computerButton.classList.remove("active");
            playerButton.classList.add("active");
          }

          if (playerButton.className.includes("active")) {
            form.replaceWith(DOM.getPlayersForm(event));
          }
        }

        function handleStartButton() {
          const player_1NameField = form.children[2];
          const player_2NameField = form.children[4];

          let player_1Name;
          let player_2Name;

          if (player_1NameField) {
            player_1Name = form.children[2].value;
          }
          if (player_1NameField) {
            player_2Name = form.children[4].value;
          }

          if (!player_1NameField || !player_2NameField) return;

          if (player_1Name === "" || player_2Name === "") {
            errorMessage.textContent = "Both names must be filled!";
            return;
          }

          errorMessage.textContent = "";

          if (player.className.includes("active")) {
            Controller.init(player_1Name, player_2Name);
            DOM.prepTurnPage(player_1Name);
          }
        }
    }
  }
};
