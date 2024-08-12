const Controller = require("./controller");

module.exports = class DOM {
  static main;

  static pageTemplate() {
    DOM.main = document.createElement("div");
  }

  static greetingPage() {
    DOM.pageTemplate();
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
    const msgBox = document.createElement("span");

    formContainer.className = "form-container";
    msgBox.className = "msg-box";

    player_1_label.textContent = "Player 1 name:";
    player_2_label.textContent = "Player 2 name:";

    player_1_label.setAttribute("placeholder", "Name");
    player_2_label.setAttribute("placeholder", "Name");

    player_1_label.setAttribute("for", "player-1");
    player_2_label.setAttribute("for", "player-2");

    player_1_input.setAttribute("required", "");
    player_1_input.setAttribute("id", "player-1");
    player_1_input.setAttribute("maxlength", "10");

    player_2_input.setAttribute("required", "");
    player_2_input.setAttribute("id", "player-2");
    player_2_input.setAttribute("maxlength", "10");

    const formValidation = (e) => {
      const targetEl = e.target;
      const target = e.target.value;
      const punctuationCharacters = /[.,;:!?()\[\]{}'"\/\\|`~@#$%^&*+=<>]/;
      const hasSpace = target.includes(" ");
      const hasPunctuation = punctuationCharacters.test(target);

      if (hasSpace) {
        targetEl.classList.add("error");
        msgBox.textContent = "Names can't have spaces";
      } else if (hasPunctuation) {
        targetEl.classList.add("error");
        msgBox.textContent = "Invalid name";
      } else {
        targetEl.classList.remove("error");
        if (
          !player_1_input.className.includes("error") &&
          !player_2_input.className.includes("error")
        )
          msgBox.textContent = "";
      }
    };

    player_1_input.addEventListener("input", formValidation);
    player_2_input.addEventListener("input", formValidation);

    if (!event) {
      return formContainer;
    } else if (event.target.textContent === "Player") {
      formContainer.append(
        msgBox,
        player_1_label,
        player_1_input,
        player_2_label,
        player_2_input
      );
    } else {
      formContainer.append(msgBox, player_1_label, player_1_input);
    }

    return formContainer;
  }

  static instructions() {
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
    const instructions = DOM.instructions();
    const boardWrapper = document.createElement("div");
    const playerBoard = DOM.createBoard();
    const playerName = document.createElement("h1");
    const fleetWrapper = document.createElement("div");
    const fleet = DOM.createFleet();
    const readyButton = document.createElement("button");

    msgBox.className = "msg-box";
    boardWrapper.className = "board-wrapper";
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
          shipPartClicked = Number(e.target.classList[1]);
        });
      }
    });

    document.addEventListener("keydown", (e) => {
      let ships;
      if (currentPlayer === Controller.player_1.name) {
        ships = Controller.player_1.gameboard.fleet;
      } else {
        ships = Controller.player_2.gameboard.fleet;
      }
      if (e.key === "r" && fleet.className.includes("vertical")) {
        for (const ship in ships) {
          ships[ship].isHorizontal = true;
        }
        fleet.classList.remove("vertical");
      } else if (e.key === "r") {
        for (const ship in ships) {
          ships[ship].isHorizontal = false;
        }
        fleet.classList.add("vertical");
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
      const fleetIsVertical = fleet.className.includes("vertical");
      let y;
      let x;
      if (!fleetIsVertical) {
        x = targetCoordinates.slice(0, 1);
        y = +targetCoordinates.slice(1) - 1 - shipPartClicked;
      } else {
        x = targetCoordinates.slice(0, 1);
        let tempX = x.charCodeAt() - shipPartClicked;
        x = String.fromCharCode(tempX);
        y = +targetCoordinates.slice(1) - 1;
      }
      const coordinates = x + y;

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
              const y = +node.classList[1].slice(1);

              node.classList.remove("ship-node", shipName);
              deletedShip = shipName;

              if (!(Controller.player_1.name === currentPlayer)) {
                Controller.player_2.gameboard.nodes[x][y - 1] = undefined;
              } else {
                Controller.player_1.gameboard.nodes[x][y - 1] = undefined;
              }
            }
          });
        });
      }

      if (deletedShip) {
        const restoredShip = DOM.createFleet(deletedShip);
        restoredShip.addEventListener("dragstart", (event) => {
          dragged = event.target;
        });
        restoredShip.addEventListener("mousedown", (e) => {
          shipPartClicked = e.target.classList[1];
        });
      }
    });

    readyButton.addEventListener("click", (e) => {
      if (!(fleet.childNodes.length === 0)) {
        msgBox.textContent = "You must place all your ships first!";
        return;
      }
      msgBox.textContent = "";
      Controller.turnManager(currentPlayer);
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

  static gameStartPage(player) {
    let currentPlayer = null;
    let enemy = null;

    if (player.name === Controller.player_1.name) {
      currentPlayer = Controller.player_1;
      enemy = Controller.player_2;
    } else {
      currentPlayer = Controller.player_2;
      enemy = Controller.player_1;
    }

    DOM.main.innerHTML = "";
    DOM.main.className = "main game-start";

    const playerBoardWrapper = document.createElement("div");
    const enemyBoardWrapper = document.createElement("div");
    const playerName = document.createElement("h1");
    const enemyName = document.createElement("h1");
    const playerBoard = DOM.createBoard();
    const enemyBoard = DOM.createBoard(true);
    const endTurnButton = document.createElement("button");
    const msgBox = document.createElement("div");

    playerName.className = "player-name";
    enemyName.className = "enemy-name";
    playerBoard.className = "playerBoard";
    enemyBoard.className = "enemyBoard";
    playerBoardWrapper.className = "player-board-wrapper";
    enemyBoardWrapper.className = "enemy-board-wrapper";
    endTurnButton.className = "end-turn btn";
    msgBox.className = "msg-box";

    playerName.textContent = currentPlayer.name + " (You)";
    enemyName.textContent = enemy.name + " (Enemy)";
    endTurnButton.textContent = "End Turn";

    playerBoardWrapper.append(playerName, playerBoard);
    enemyBoardWrapper.append(enemyName, enemyBoard);
    DOM.main.append(
      msgBox,
      playerBoardWrapper,
      enemyBoardWrapper,
      endTurnButton
    );
    document.body.append(DOM.main);

    const isEmpty = (array) => {
      return array.length === 0 ? true : false;
    };

    // renders current player's ships on board
    for (const rowKey in currentPlayer.gameboard.nodes) {
      const rowArray = currentPlayer.gameboard.nodes[rowKey];
      for (let node = 0; node < rowArray.length; node++) {
        if (typeof rowArray[node] === "object") {
          const shipNode = rowKey + (node + 1);
          const currentNode = document.getElementsByClassName(shipNode)[0];

          currentNode.style.backgroundColor = "orange";
        }
      }
    }

    // renders enemy hits
    const enemyHits = currentPlayer.gameboard.hits;
    if (!isEmpty(enemyHits)) {
      enemyHits.forEach((node) => {
        const currentNode = document.getElementsByClassName(node)[0];
        // currentNode.style.backgroundColor = "red";
        currentNode.textContent = "❌";
      });
    }

    // renders current player's missed shots
    const missedShots = enemy.gameboard.missedShots;
    if (!isEmpty(missedShots)) {
      missedShots.forEach((node) => {
        const currentNode = document.getElementsByClassName("enemy " + node)[0];
        currentNode.style.backgroundColor = "lightblue";
      });
    }

    // renders current player's hits
    const hits = enemy.gameboard.hits;
    if (!isEmpty(hits)) {
      hits.forEach((node) => {
        const currentNode = document.getElementsByClassName("enemy " + node)[0];
        currentNode.style.backgroundColor = "red";
      });
    }

    let enemyShipNodes = [];
    for (const rowKey in enemy.gameboard.nodes) {
      const rowArray = enemy.gameboard.nodes[rowKey];
      for (let node = 0; node < rowArray.length; node++) {
        if (typeof rowArray[node] === "object") {
          enemyShipNodes.push(rowKey + (node + 1));
        }
      }
    }

    let played = false;
    const playerMove = (e) => {
      const target = e.target.classList[2];
      if (enemy.gameboard.inactiveNodes.includes(target)) return;

      const currentNode = document.getElementsByClassName("enemy " + target)[0];
      if (enemyShipNodes.includes(target)) {
        enemy.gameboard.receiveAttack(target);
        currentNode.style.backgroundColor = "red";
      } else {
        enemy.gameboard.receiveAttack(target);
        currentNode.style.backgroundColor = "lightblue";
      }
      enemyBoard.removeEventListener("click", playerMove);
      played = true;
    };

    enemyBoard.addEventListener("click", playerMove);

    function handleEndTurn() {
      if (played) {
        Controller.turnManager(currentPlayer);
        msgBox.textContent = "";
        played = false;
        return;
      }
      msgBox.textContent = "You have not played yet!";
    }

    endTurnButton.addEventListener("click", handleEndTurn);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleEndTurn();
    });
  }

  static transitionPage(player) {
    DOM.main.innerHTML = "";
    DOM.main.className = "main transition-page";
    const transitionElWrapper = document.createElement("div");
    const transitionEl = document.createElement("div");

    transitionElWrapper.className = "transition";
    transitionEl.textContent = `Press any key or click anywhere to start your turn`;

    transitionElWrapper.append(transitionEl);
    DOM.main.append(transitionElWrapper);

    function handleTransition() {
      document.removeEventListener("keydown", handleTransition);
      DOM.gameStartPage(player);
    }

    transitionElWrapper.addEventListener("click", handleTransition);
    document.addEventListener("keydown", handleTransition);
  }

  static gameOverPage(player) {
    DOM.main.innerHTML = "";
    DOM.main.className = "main game-over";
    const winner = document.createElement("div");
    winner.className = "winner";
    winner.innerHTML = `
    Congratulations <span style='color:orange;'>${player.name}</span> you have won 
    and now stand King of the high seas 🐉`;
    DOM.main.append(winner);
  }

  static createBoard(enemy = false) {
    const board = document.createElement("div");
    // Debug
    // Controller.init("a", "a2");
    const keys = Object.keys(Controller.player_1.gameboard.nodes);

    for (let i = 1; i < 12; i++) {
      const row = document.createElement("div");
      row.className = "row";

      for (let j = 0; j < 11; j++) {
        const node = document.createElement("div");
        node.className = "node";

        if (!enemy) {
          i === 1 && j === 0
            ? (node.textContent = "")
            : i === 1 && j > 0
            ? (node.textContent = j) && (node.className = `node ${j}`)
            : i > 1 && j === 0
            ? (node.textContent = keys[i - 2]) &&
              (node.className = `node ${keys[i - 2]}`)
            : (node.className = `node ${keys[i - 2]}${j}`);
        } else {
          i === 1 && j === 0
            ? (node.textContent = "")
            : i === 1 && j > 0
            ? (node.textContent = j) && (node.className = `node ${j}`)
            : i > 1 && j === 0
            ? (node.textContent = keys[i - 2]) &&
              (node.className = `node ${keys[i - 2]}`)
            : (node.className = `node enemy ${keys[i - 2]}${j}`);
        }

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
    let form = document.querySelector(".form-container");

    const msgBox = form.children[0];

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

          if (player_1NameField !== undefined) {
            player_1Name = player_1NameField.value;
          } else {
            return;
          }

          if (player_2NameField === undefined) {
            player_2Name = "computer";
          } else {
            player_2Name = player_2NameField.value;
          }

          if (
            player_1NameField !== undefined &&
            player_2NameField !== undefined
          ) {
            if (
              player_1NameField.className.includes("error") ||
              player_2NameField.className.includes("error")
            ) {
              return;
            }
          }

          if (msgBox !== "undefind") msgBox.textContent = "";

          if (player_1Name === "" || player_2Name === "") {
            if (!player_2NameField) {
              msgBox.textContent = "Name must be filled!";
            }
            msgBox.textContent = "Both names must be filled!";
            return;
          }

          if (player_1Name === player_2Name) {
            msgBox.textContent = "Names must be the different!";
            return;
          }

          if (player_1Name !== undefined) {
            Controller.init(player_1Name, player_2Name);
            DOM.prepTurnPage(player_1Name);
          }
        }
    }
  }
};
