export const TERRITORY = {
  PLAYER_A: 1,
  PLAYER_B: 0,
  NO_ONE: -1
};

function BattleBlock() {
  var _id = -1;
  return () => {
    return {
      territory: TERRITORY.NO_ONE,
      attacked: false,
      showHint: false,
      id: ++_id
    };
  };
}

const BLOCK = BattleBlock();

export function createBattlefield(
  battlegroundSize,
  shipCoordForPlayerA,
  shipCoordForPlayerB
) {
  let battleGround = [];
  for (let i = 0; i < battlegroundSize; i++) {
    const row = [];
    for (let j = 0; j < battlegroundSize; j++) {
      row.push(new BLOCK());
    }
    battleGround.push(row);
  }

  console.log(">>", shipCoordForPlayerA);

  shipCoordForPlayerA.forEach((shipCoord) => {
    battleGround[shipCoord[0]][shipCoord[1]] = {
      ...battleGround[shipCoord[0]][shipCoord[1]],
      territory: TERRITORY.PLAYER_A
    };
  });

  shipCoordForPlayerB.forEach((shipCoord) => {
    battleGround[shipCoord[0]][shipCoord[1]] = {
      ...battleGround[shipCoord[0]][shipCoord[1]],
      territory: TERRITORY.PLAYER_B
    };
  });
  return battleGround;
}
