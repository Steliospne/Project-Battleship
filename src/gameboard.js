module.exports = class Gameboard {
  constructor() {
    this.nodes = [];
    this.missedShots = [];
    this.inactiveNodes = [];
  }

  init() {
    for (let x = 0; x < 10; x++) {
      const xAxis = String.fromCharCode(97 + x);
      for (let y = 1; y < 11; y++) {
        const yAxis = y;
        this.nodes.push(new Node(xAxis, yAxis));
      }
    }
  }

  gameHasEnded(fleet) {
    let sunkShipCount = 0;
    for (const ship of fleet) {
      ship.isSunk === true ? sunkShipCount++ : sunkShipCount;
    }
    return sunkShipCount === fleet.length ? true : false;
  }

  coordinateTransform(x, y) {
    const xMap = new Map();
    for (let i = 0; i < 10; i++) {
      xMap.set(String.fromCharCode(97 + i), i * 10);
    }
    const targetNodeIndex = xMap.get(x) + (y - 1);
    return targetNodeIndex;
  }

  receiveAttack(x, y) {
    if (!/[a - j]/.test(x) || y < 0 || y > 10) return false;
    targetNodeIndex = this.coordinateTransform(x, y);
    targetNode = this.nodes[targetNodeIndex];

    if (targetNode.hasShip) {
      return targetNode;
    } else {
      this.inactiveNodes.push(targetNode);
      this.missedShots.push(targetNode);
    }
  }

  shipPlacement(x, y, ship) {
    if (!/[a - j]/.test(x) || y < 0 || y > 10) return false;
    for (let i = 0; i < ship.length; i++) {
      let index;
      if (ship.orientation == "horizontal") {
        index = gameboard.coordinateTransform(x, y + i);
        gameboard.nodes[index].hasShip = ship;
        return true;
      } else {
        index = gameboard.coordinateTransform(
          String.fromCharCode(x.charCodeAt() + i),
          y
        );
        gameboard.nodes[index].hasShip = ship;
        return true;
      }
    }
  }
};

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.hasShip = null;
  }
}
