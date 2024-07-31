const Gameboard = require("../gameboard");

const gameboard = new Gameboard();

// Using empty arrays to mock ship object so the tests,
// are not depended on more than one module
const fleet = {
  carrier: {
    length: 5,
    hits: 0,
    isHorizontal: true,
    hit() {
      this.hits += 1;
    },
  },
  battleship: {
    length: 4,
    hits: 0,
    isHorizontal: true,
    hit() {
      this.hits += 1;
    },
  },
  cruiser: {
    length: 3,
    hits: 0,
    isHorizontal: true,
    hit() {
      this.hits += 1;
    },
  },
  submarine: {
    length: 3,
    hits: 0,
    isHorizontal: true,
    hit() {
      this.hits += 1;
    },
  },
  destroyer: {
    length: 2,
    hits: 0,
    isHorizontal: true,
    hit() {
      this.hits += 1;
    },
  },
};

const ships = Object.values(fleet);

describe("Gameboard Tests", () => {
  const mockPlaceShip = jest.fn((coordinate, ship) => {
    const x = coordinate[0];
    const y = Number(coordinate[1]);
    const yNodes = Object.keys(gameboard.nodes);
    const xInRange = yNodes.includes(x);
    const yInRange = y >= 0 && y <= 9;
    let shipLocations = [];

    if (!xInRange || !yInRange || coordinate.length > 2) {
      return 0;
    }

    if (ship.isHorizontal) {
      for (let i = 0; i < ship.length; i++) {
        const newY = y + i;
        const newY_InRange = newY >= 0 && newY <= 9;

        if (!xInRange || !newY_InRange) {
          shipLocations = [];
          return 0;
        }
        shipLocations.push(newY);
      }
      shipLocations.forEach((shipLocationY) => {
        gameboard.nodes[x][shipLocationY] = ship;
        gameboard.inactiveNodes.push(x + shipLocationY);
      });
    } else {
      for (let i = 0; i < ship.length; i++) {
        const newX = yNodes.indexOf(x) + i;
        const newX_InRange = newX < yNodes.length;

        if (!newX_InRange || !yInRange) {
          shipLocations = [];
          return 0;
        }
        shipLocations.push(yNodes[newX]);
      }
      shipLocations.forEach((shipLocationX) => {
        gameboard.nodes[shipLocationX][y] = ship;
        gameboard.inactiveNodes.push(shipLocationX + y);
      });
    }
    return 1;
  });

  const mockReceiveHit = jest.fn((coordinates) => {
    const x = coordinates[0];
    const y = +coordinates[1];

    if (typeof gameboard.nodes[x][y] === "object") {
      gameboard.nodes[x][y].hit();
      return;
    }
    gameboard.missedShots.push(coordinates);
    gameboard.inactiveNodes.push(coordinates);
  });

  test.each(["a10", "x0", "k22"])(
    "Invalid coordinates (%s) should return 0",
    (input) => {
      mockPlaceShip(input);

      expect(mockPlaceShip).toHaveReturnedWith(0);
    }
  );

  test.each([
    ["a1", ships, 1],
    ["a5", ships, 1],
    ["a9", ships, 0],
  ])(
    "Tests that ships can't be placed out of the board (%s) Horizontal",
    (input, ships, expected) => {
      ships.forEach((ship) => {
        mockPlaceShip(input, ship);
        expect(mockPlaceShip).toHaveReturnedWith(expected);
        gameboard.init();
      });
    }
  );

  test.each([
    ["a5", ships, 1],
    ["f5", ships, 1],
    ["j5", ships, 0],
  ])(
    "Tests that ships can't be placed out of the board (%s) Vertical",
    (input, ships, expected) => {
      ships.forEach((ship) => {
        ship.isHorizontal = false;
        mockPlaceShip(input, ship);
        expect(mockPlaceShip).toHaveReturnedWith(expected);
        ship.isHorizontal = true;
        gameboard.init();
      });
    }
  );

  test("Should be able to receive a hit", () => {
    ships.forEach((ship) => {
      mockPlaceShip("a0", ship);
      mockReceiveHit("a0");
      expect(ship.hits).toBe(1);
    });
  });

  test("If the hit is a miss should be stored in missedShots", () => {
    gameboard.init();
    mockReceiveHit("f6");
    expect(gameboard.missedShots).toContain("f6");
  });
});
