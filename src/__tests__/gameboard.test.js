const Gameboard = require("../gameboard");

describe("Gameboard Initialization Tests", () => {
  const gameboard = new Gameboard();
  gameboard.init();

  it("should initialize with correct num of nodes and no ships", () => {
    for (const node of gameboard.nodes) {
      expect(node.hasShip).toBeNull();
    }
    expect(gameboard.nodes.length).toBe(10 * 10);
  });

  test("x axis is correct", () => {
    for (const node of gameboard.nodes) {
      expect(node.x).toMatch(/[a-j]/);
    }
  });

  test("y axis is correct", () => {
    let count = 1;
    for (const node of gameboard.nodes) {
      expect(node.y).toBe(count);
      count == 10 ? (count = 1) : count++;
    }
  });

  test("coordinate transform", () => {
    expect(gameboard.coordinateTransform("a", 3)).toBe(2);
  });
});

describe("Correct ship placement", () => {
  const gameboard = new Gameboard();
  gameboard.init();

  const ship = (length) => {
    return {
      length: length,
      hits: 0,
      isSunk: false,
      orientation: "vertical",
    };
  };

  const fleet = {
    carrier: ship(5),
    battleship: ship(4),
    cruiser: ship(3),
    submarine: ship(3),
    destroyer: ship(2),
  };

  test.each([
    ["a", 4, true],
    ["k", 5, false],
  ])("place ship", (x, y, expectation) => {
    const fakePlaceShip = (x, y, ship) => {
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
    };

    expect(fakePlaceShip(x, y, fleet.carrier)).toBe(expectation);
  });
});

describe("Gameboard receiveAttack() Tests", () => {
  const gameboard = new Gameboard();
  gameboard.init();

  let targetNode;

  const fakeFn = (x, y) => {
    if (!/[a - j]/.test(x) || y < 0 || y > 10) return false;
    const xMap = new Map();
    for (let i = 0; i < 10; i++) {
      xMap.set(String.fromCharCode(97 + i), i * 10);
    }
    const targetNodeIndex = xMap.get(x) + (y - 1);
    targetNode = gameboard.nodes[targetNodeIndex];

    if (targetNode.hasShip) {
      return targetNode;
    } else {
      gameboard.missedShots.push(targetNode);
    }
  };

  test("gets the correct node", () => {
    fakeFn("a", 4);

    expect(targetNode.x).toBe("a");
    expect(targetNode.y).toBe(4);
  });

  test("should miss if no ship and keep track of the attack coordinates", () => {
    fakeFn("a", 4);
    expect(gameboard.missedShots[0]).toBe(targetNode);
    expect(targetNode.x).toBe("a");
    expect(targetNode.y).toBe(4);
  });

  test("should return node if hit", () => {
    gameboard.nodes[3].hasShip = true;
    expect(fakeFn("a", 4)).toBe(targetNode);
  });
});

describe("End of game", () => {
  const gameboard = new Gameboard();
  gameboard.init();

  const ship = (length) => {
    return {
      length: length,
      hits: 0,
      isSunk: false,
      orientation: "vertical",
    };
  };

  const fleet = [
    { carrier: ship(5) },
    { battleship: ship(4) },
    { cruiser: ship(3) },
    { submarine: ship(3) },
    { destroyer: ship(2) },
  ];

  test("should not end", () => {
    expect(gameboard.gameHasEnded(fleet)).toBe(false);
  });

  test("should end", () => {
    for (let ship of fleet) {
      ship.isSunk = true;
    }

    expect(gameboard.gameHasEnded(fleet)).toBe(true);
  });
});
