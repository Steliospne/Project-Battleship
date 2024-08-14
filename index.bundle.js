/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 747:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Controller = __webpack_require__(71);
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
    const formValidation = e => {
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
        if (!player_1_input.className.includes("error") && !player_2_input.className.includes("error")) msgBox.textContent = "";
      }
    };
    player_1_input.addEventListener("input", formValidation);
    player_2_input.addEventListener("input", formValidation);
    if (!event) {
      return formContainer;
    } else if (event.target.textContent === "Player") {
      formContainer.append(msgBox, player_1_label, player_1_input, player_2_label, player_2_input);
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
    fleet.childNodes.forEach(el => {
      if (!el.className.includes("name")) {
        el.addEventListener("dragstart", event => {
          dragged = event.target;
        });
        el.addEventListener("mousedown", e => {
          shipPartClicked = Number(e.target.classList[1]);
        });
      }
    });
    document.addEventListener("keydown", e => {
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
    playerBoard.addEventListener("dragover", e => {
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

    playerBoard.addEventListener("drop", e => {
      if (!e.target.className.match(/[a-z]/) && !e.target.className.match(/[0-9]/)) return;
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
      const shipPlacement = Controller.handleShipPlacement(currentPlayer, coordinates, ship);
      if (shipPlacement[0] === 1) {
        shipPlacement[1].forEach(node => {
          node = node.slice(0, 1) + (+node.slice(1) + 1);
          let target = document.getElementsByClassName(node)[0];
          target.classList.add("ship-node", ship);
        });
        dragged.parentNode.removeChild(dragged.previousSibling);
        dragged.parentNode.removeChild(dragged);
      }
    });
    playerBoard.addEventListener("click", e => {
      const target = e.target;
      let deletedShip = null;
      if (target.className.includes("ship-node")) {
        const shipName = target.classList[3];
        document.querySelector(".playerBoard").childNodes.forEach(row => {
          row.childNodes.forEach(node => {
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
        restoredShip.addEventListener("dragstart", event => {
          dragged = event.target;
        });
        restoredShip.addEventListener("mousedown", e => {
          shipPartClicked = e.target.classList[1];
        });
      }
    });
    readyButton.addEventListener("click", e => {
      if (!(fleet.childNodes.length === 0)) {
        msgBox.textContent = "You must place all your ships first!";
        return;
      }
      msgBox.textContent = "";
      Controller.turnManager(currentPlayer);
    });
    boardWrapper.append(playerName, playerBoard);
    fleetWrapper.append(fleet);
    DOM.main.append(msgBox, boardWrapper, instructions, fleetWrapper, readyButton);
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
    DOM.main.append(msgBox, playerBoardWrapper, enemyBoardWrapper, endTurnButton);
    document.body.append(DOM.main);
    const isEmpty = array => {
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
      enemyHits.forEach(node => {
        const currentNode = document.getElementsByClassName(node)[0];
        // currentNode.style.backgroundColor = "red";
        currentNode.textContent = "❌";
      });
    }

    // renders current player's missed shots
    const missedShots = enemy.gameboard.missedShots;
    if (!isEmpty(missedShots)) {
      missedShots.forEach(node => {
        const currentNode = document.getElementsByClassName("enemy " + node)[0];
        currentNode.style.backgroundColor = "lightblue";
      });
    }

    // renders current player's hits
    const hits = enemy.gameboard.hits;
    if (!isEmpty(hits)) {
      hits.forEach(node => {
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
    const playerMove = e => {
      const target = e.target.classList[2];
      if (enemy.gameboard.inactiveNodes.includes(target) || target === undefined) return;
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
    document.addEventListener("keydown", e => {
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
  static createBoard() {
    let enemy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
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
          i === 1 && j === 0 ? node.textContent = "" : i === 1 && j > 0 ? (node.textContent = j) && (node.className = `node ${j}`) : i > 1 && j === 0 ? (node.textContent = keys[i - 2]) && (node.className = `node ${keys[i - 2]}`) : node.className = `node ${keys[i - 2]}${j}`;
        } else {
          i === 1 && j === 0 ? node.textContent = "" : i === 1 && j > 0 ? (node.textContent = j) && (node.className = `node ${j}`) : i > 1 && j === 0 ? (node.textContent = keys[i - 2]) && (node.className = `node ${keys[i - 2]}`) : node.className = `node enemy ${keys[i - 2]}${j}`;
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
          if (player_1NameField !== undefined && player_2NameField !== undefined) {
            if (player_1NameField.className.includes("error") || player_2NameField.className.includes("error")) {
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

/***/ }),

/***/ 568:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-loop-func */
const Player = __webpack_require__(246);
module.exports = class Computer extends Player {
  constructor(name, gameboard) {
    super();
    this.name = name;
    this.gameboard = gameboard;
    this.init();
  }
  init() {
    const ships = Object.values(this.gameboard.fleet);
    let counter = 0;
    while (counter < 5) {
      const ship = ships[counter];
      const shipLength = ship.length;
      let randomX;
      let randomY;
      let randomOrientation = Math.floor(Math.random() * 2);
      // if randomOrientation 1 then horizontal
      if (randomOrientation) {
        randomX = Math.floor(Math.random() * 10);
        randomY = Math.floor(Math.random() * (10 - shipLength));
        randomX = String.fromCharCode(97 + randomX);
      } else {
        ship.isHorizontal = false;
        randomX = Math.floor(Math.random() * (10 - shipLength));
        randomX = String.fromCharCode(97 + randomX);
        randomY = Math.floor(Math.random() * 10);
      }
      const coordinates = randomX + randomY;
      const result = this.gameboard.placeShip(coordinates, ship)[0];
      if (result === 1) {
        counter++;
      }
      if (counter === 0) break;
      // console.log(coordinates, result, counter, ship);
    }
    // console.table(this.gameboard.nodes);
  }
  play() {
    let randomX;
    let randomY;
    randomX = Math.floor(Math.random() * 10);
    randomX = String.fromCharCode(97 + randomX);
    randomY = Math.floor(Math.random() * 10);
    const coordinates = randomX + randomY;
    return coordinates;
  }
};

/***/ }),

/***/ 71:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Player = __webpack_require__(246);
const Gameboard = __webpack_require__(661);
const NPC = __webpack_require__(568);
module.exports = class Controller {
  static player_1;
  static player_2;
  static turn = 0;
  static init(player_1, player_2) {
    this.player_1 = new Player(player_1, new Gameboard());
    if (player_2 === "computer") {
      this.player_2 = new NPC("computer", new Gameboard());
      return;
    }
    this.player_2 = new Player(player_2, new Gameboard());
  }
  static handleShipPlacement(playerName, coordinates, ship) {
    let currentPlayer = null;
    let currentShip = null;
    playerName === Controller.player_1.name ? currentPlayer = Controller.player_1 : currentPlayer = Controller.player_2;
    currentShip = currentPlayer.gameboard.fleet[ship];
    return currentPlayer.gameboard.placeShip(coordinates, currentShip);
  }
  static turnManager(player) {
    const DOM = __webpack_require__(747);
    if (this.player_2.name !== "computer") {
      if (this.player_1.name === player && Controller.turn === 0) {
        DOM.prepTurnPage(this.player_2.name);
        Controller.turn++;
        return;
      }
      if (this.player_2.name === player && Controller.turn === 1) {
        Controller.turn = Controller.turn + 2;
        DOM.transitionPage(this.player_1);
        return;
      }
      if (Controller.turn % 2 === 0 && Controller.turn !== 0) {
        if (this.player_1.gameboard.isGameOver()) {
          DOM.gameOverPage(this.player_2);
          return;
        }
        DOM.transitionPage(this.player_1);
        Controller.turn++;
        return;
      }
      if (Controller.turn % 2 !== 0) {
        if (this.player_2.gameboard.isGameOver()) {
          DOM.gameOverPage(this.player_1);
          return;
        }
        DOM.transitionPage(this.player_2);
        Controller.turn++;
        return;
      }
    } else {
      if (Controller.turn === 0) {
        DOM.gameStartPage(this.player_1);
        Controller.turn++;
        return;
      }
      DOM.gameStartPage(this.player_1);
      Controller.turn++;
      let result = false;
      while (!result) {
        result = this.player_1.gameboard.receiveAttack(this.player_2.play());
      }
      console.log(result);
      if (this.player_1.gameboard.isGameOver()) {
        DOM.gameOverPage(this.player_2);
        return;
      }
      if (this.player_2.gameboard.isGameOver()) {
        DOM.gameOverPage(this.player_1);
        return;
      }
    }
  }
};

/***/ }),

/***/ 661:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Ship = __webpack_require__(653);
module.exports = class Gameboard {
  constructor() {
    this.nodes = {};
    this.missedShots = [];
    this.inactiveNodes = [];
    this.hits = [];
    this.fleet = {
      carrier: new Ship(5),
      battleship: new Ship(4),
      cruiser: new Ship(3),
      submarine: new Ship(3),
      destroyer: new Ship(2)
    };
    this.init();
  }
  init() {
    for (let x = 0; x < 10; x++) {
      const yAxis = String.fromCharCode(97 + x);
      this.nodes[yAxis] = [];

      // for visualization purposes
      // ******************************
      // for (let i = 0; i < 10; i++) {
      //   this.nodes[yAxis].push(0);
      // }
      // ******************************

      // for production uncomment the following line.
      this.nodes[yAxis] = Array(10);
    }
  }
  placeShip(coordinate, ship) {
    const x = coordinate[0];
    const y = Number(coordinate[1]);
    const yNodes = Object.keys(this.nodes);
    const xInRange = yNodes.includes(x);
    const yInRange = y >= 0 && y <= 9;
    let shipLocations = [];
    const shipLocation = [];
    if (!xInRange || !yInRange || coordinate.length > 2 || typeof this.nodes[x][y] === "object") {
      return 0;
    }
    if (ship.isHorizontal) {
      for (let i = 0; i < ship.length; i++) {
        const newY = y + i;
        const newY_InRange = newY >= 0 && newY <= 9;
        if (!xInRange || !newY_InRange || typeof this.nodes[x][newY] === "object") {
          shipLocations = [];
          return [0];
        }
        shipLocations.push(newY);
      }
      shipLocations.forEach(shipLocationY => {
        this.nodes[x][shipLocationY] = ship;
        shipLocation.push(x + shipLocationY);
      });
    } else {
      for (let i = 0; i < ship.length; i++) {
        const newX = yNodes.indexOf(x) + i;
        const newX_InRange = newX < yNodes.length;
        if (!newX_InRange || !yInRange || typeof this.nodes[yNodes[newX]][y] === "object") {
          shipLocations = [];
          return [0];
        }
        shipLocations.push(yNodes[newX]);
      }
      shipLocations.forEach(shipLocationX => {
        this.nodes[shipLocationX][y] = ship;
        shipLocation.push(shipLocationX + y);
      });
    }
    return [1, shipLocation];
  }
  receiveAttack(coordinates) {
    const isValid = /^[A-Za-z]\d{1,2}$/.test(coordinates);
    if (!isValid) return;
    const x = coordinates[0];
    const y = +coordinates.slice(1) - 1;
    if (typeof this.nodes[x][y] === "object") {
      this.inactiveNodes.push(coordinates);
      this.hits.push(coordinates);
      this.nodes[x][y].hit();
      return 0;
    }
    this.missedShots.push(coordinates);
    this.inactiveNodes.push(coordinates);
    return 1;
  }
  isGameOver() {
    const ships = Object.values(this.fleet);
    let sunkShipCount = 0;
    for (const ship of ships) {
      if (ship.isSunk()) {
        sunkShipCount++;
      }
    }
    return sunkShipCount === ships.length ? true : false;
  }
};

/***/ }),

/***/ 246:
/***/ ((module) => {

module.exports = class Player {
  constructor(name, gameboard) {
    this.name = name;
    this.gameboard = gameboard;
  }
};

/***/ }),

/***/ 653:
/***/ ((module) => {

module.exports = class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.isHorizontal = true;
  }
  isSunk() {
    return this.hits === this.length ? true : false;
  }
  hit() {
    this.hits++;
  }
};

/***/ }),

/***/ 208:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(417);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(907), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --board_width: 350px;
  --board_height: 350px;

  --width-input: 85px;
  --height-inputs: 27px;
  --radius-inputs: 0.25rem;

  --width-input-border: 2px;

  --body-accent: #07c;

  --btn-bg: #ff8800;
  --active-btn: #346c93;

  --textfld-bg: #222;
  --textfld-border: #333;
  --textfld-active-border: #444;
  --textfld-focus-border: var(--body-accent);
}

body {
  height: 100vh;
  display: flex;
  color-scheme: dark;
  background-color: #333;
  color: white;
  place-content: center;
}

.main {
  height: 100%;
}

.main,
.playerBoard,
.row {
  display: flex;
}

/* Welcome Page */

.main.greetings {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
}

.front-image {
  width: 50vw;
  height: 50vh;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

/* Game Initialization Page */

.main.gameInit {
  flex-direction: column;
  align-items: center;
}

.opponent-banner {
  display: flex;
  margin-top: 2rem;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.player {
  margin-right: 15px;
}
.computer {
  margin-left: 15px;
}

.battleship {
  color: #ff8800;
}
/* form */

.form-container {
  display: grid;
  flex: 1;

  /* grid-template-columns: ; */
  grid-template-rows: 150px auto auto 1fr;

  grid-template-areas:
    "error error"
    "player1-label player2-label"
    "player1-input player2-input";
}

label {
  justify-self: center;
  color: white;
}

input,
input:focus {
  height: 50px;
  border: var(--width-input-border) solid var(--textfld-border);
  background-color: var(--textfld-bg);

  outline: 0;
}

input:active,
input:focus {
  border-color: var(--textfld-active-border);
}

input#player-1 {
  grid-area: player1-input;
}

input#player-2 {
  grid-area: player2-input;
}

.start {
  margin: 0 0 5rem 0;
}

/* Rules for game setup page */
.main.gamePrep {
  display: grid;
  grid-template-columns: repeat(2, max(500px));
  grid-template-rows: 0.2fr 0.33fr 0.66fr 0.15fr;
}

.msg-box {
  grid-row: 1;
  grid-column: 1/3;
  align-self: center;
  justify-self: center;
  color: indianred;
  font-size: 1.5rem;
  font-weight: 700;
}

.instruction-wrapper {
  display: flex;
  grid-row: 2;
  grid-column: 2/3;
  height: 100%;
  flex-direction: column;
  width: 45ch;
  align-items: center;
  align-self: center;
  justify-self: center;
  border: var(--textfld-active-border) solid 3px;
}

.instruction-label {
  flex: 0.25;
  display: flex;
  align-items: center;
}

.instruction-list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 0.75;
}

.instruction-list > li {
  width: 35ch;
}

.fleet-wrapper {
  grid-row: 3/4;
  grid-column: 2;
}

.board-wrapper {
  grid-column: 1;
  grid-row: 2/4;
}

.board-wrapper,
.fleet-wrapper {
  place-self: center;
}

.player-name {
  text-align: center;
}

.fleet {
  display: grid;
  grid-template-columns: auto min-content;
  gap: 5px;
  align-items: center;
}

.fleet.vertical {
  grid-template-columns: repeat(5, 35px);
  align-items: unset;
}

.ship-name {
  grid-column: 1 / 1;
}

.ship {
  display: flex;
  align-items: center;
  justify-self: start;
  grid-column: 2 / 2;
}

.fleet.vertical > div:nth-child(1),
.fleet.vertical > div:nth-child(2) {
  grid-column: 1;
}

.fleet.vertical > div:nth-child(3),
.fleet.vertical > div:nth-child(4) {
  grid-column: 2;
}

.fleet.vertical > div:nth-child(5),
.fleet.vertical > div:nth-child(6) {
  grid-column: 3;
}

.fleet.vertical > div:nth-child(7),
.fleet.vertical > div:nth-child(8) {
  grid-column: 4;
}

.fleet.vertical > div:nth-child(9),
.fleet.vertical > div:nth-child(10) {
  grid-column: 5;
}

.fleet.vertical > div:nth-child(1),
.fleet.vertical > div:nth-child(3),
.fleet.vertical > div:nth-child(5),
.fleet.vertical > div:nth-child(7),
.fleet.vertical > div:nth-child(9) {
  grid-row: 1;
  position: relative;
  transform: rotate(90deg);
  top: -50px;
}

.fleet.vertical > div:nth-child(2),
.fleet.vertical > div:nth-child(4),
.fleet.vertical > div:nth-child(6),
.fleet.vertical > div:nth-child(8),
.fleet.vertical > div:nth-child(10) {
  flex-direction: column;
}

.ship > p {
  flex: 1;
  margin-right: 5px;
  border: none;
}

.ship-node {
  width: 35px;
  height: 35px;
  border: 1px solid black;
  background-color: #ff8800;
}

.ready {
  grid-row: 4;
  grid-column: 1 / 3;
  justify-self: center;
  align-self: center;
}

/* Transition page */
.main.transition-page {
  width: 100%;
}

.transition {
  font-size: 2rem;
  color: #ff8800;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.transition:hover,
.btn,
.player-board-wrapper,
.enemy-board-wrapper {
  cursor: pointer;
}

/* Play page */
.main.game-start {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 20px;
}

.player-board-wrapper,
.enemy-board-wrapper {
  display: flex;
  flex-direction: column;
  align-self: center;
}

.player-board-wrapper {
  justify-self: end;
}

.enemy-board-wrapper {
  justify-self: start;
}

.enemy-name {
  text-align: center;
}

.end-turn {
  grid-row: 3;
  grid-column: 1/3;
  place-self: center;
}

/* Game over */
.main.game-over {
  display: flex;
  justify-content: center;
  align-items: center;
}

.winner {
  font-size: 1.5rem;
}

.winner > span {
  font-weight: 700;
}

/* Rules for gameboard */
.playerBoard {
  flex-direction: column;
}

.node {
  border: 1px solid black;
  width: 35px;
  height: 35px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Makes border uniform */

.node:nth-child(2) {
  border-left-width: 2px;
}

.node:nth-child(11) {
  border-right-width: 2px;
}

.row:nth-child(2) > * {
  border-top-width: 2px;
}

.row:nth-child(11) > * {
  border-bottom-width: 2px;
}

/* Removes the border from the x & y axis */

/* first column */
.node:first-child {
  border-width: 0;
  padding-right: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* first row */
.row:first-child > * {
  border-width: 0;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-content: end;
}

/* Button general style */

.btn {
  width: var(--width-input);
  height: var(--height-inputs);
  border-radius: var(--radius-inputs);
  background-color: var(--btn-bg);
  border-color: var(--textfld-border);
  color: white;
  font-weight: 700;
}

.btn.active {
  background-color: var(--active-btn);
}

@media screen and (max-width: 650px) {
  .front-image {
    height: 130px;
    background-size: contain;
  }
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 314:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 417:
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ 601:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 72:
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 659:
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 540:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 825:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 113:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 907:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/a7803d78b2a2fab791ec.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			57: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/style.css
var style = __webpack_require__(208);
;// CONCATENATED MODULE: ./src/style.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(style/* default */.A, options);




       /* harmony default export */ const src_style = (style/* default */.A && style/* default */.A.locals ? style/* default */.A.locals : undefined);

;// CONCATENATED MODULE: ./src/index.js

const DOM = __webpack_require__(747);
window.onload = () => {
  DOM.greetingPage();
};
})();

/******/ })()
;