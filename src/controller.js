const Player = require("./player");
const Gameboard = require("./gameboard");

module.exports = class Controller {
  player_1;
  player_2;

  static init(player_1, player_2) {
    this.player_1 = new Player(player_1, new Gameboard());
    this.player_2 = new Player(player_2, new Gameboard());
  }
};
