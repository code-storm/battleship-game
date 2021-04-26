import Battleship from "./Battleship";
import gamedata from "./gamedata.txt";
import { createBattlefield } from "./helper";

import "./styles.css";

export default function App() {
  // const [isGameEnabled, setIsGameEnabled] = useState(false);
  // const [battlegroundSize, setBattlegroundSize] = useState(0);
  const gameParams = gamedata.split("\n");
  console.log(gameParams);
  let [
    battlegroundSize,
    battlegroundTotalShips,
    shipCoordForPlayerA,
    shipCoordForPlayerB,
    numOfMissiles,
    playerAMoves,
    playerBMoves
  ] = gameParams;
  battlegroundSize = +battlegroundSize;
  battlegroundTotalShips = +battlegroundTotalShips;
  shipCoordForPlayerA = shipCoordForPlayerA.split(":").map((e) => e.split(","));
  shipCoordForPlayerB = shipCoordForPlayerB.split(":").map((e) => e.split(","));
  numOfMissiles = +numOfMissiles;

  console.log("__", shipCoordForPlayerA);
  const battleGround = createBattlefield(
    battlegroundSize,
    shipCoordForPlayerA,
    shipCoordForPlayerB
  );

  return (
    <div className="App">
      <h1>Battleship</h1>
      {
        <Battleship
          battlegroundSize={battlegroundSize}
          battlegroundTotalShips={battlegroundTotalShips}
          shipCoordForPlayerA={shipCoordForPlayerA}
          shipCoordForPlayerB={shipCoordForPlayerB}
          numOfMissiles={numOfMissiles}
          battleGround={battleGround}
        />
      }
    </div>
  );
}
