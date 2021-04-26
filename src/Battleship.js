import { useState, useEffect } from "react";
import { TERRITORY } from "./helper";

export default function (props) {
  const [battleGround, setBattleGround] = useState(props.battleGround);
  const [playerATurn, setPlayerATurn] = useState(true);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [playerAChanceLeft, setPlayerAChanceLeft] = useState(
    props.numOfMissiles
  );
  const [playerBChanceLeft, setPlayerBChanceLeft] = useState(
    props.numOfMissiles
  );
  const [winner, setWinner] = useState(null);

  useEffect(checkWinner, [playerAChanceLeft, playerBChanceLeft]);

  function fireMissile(shipBlock, i, j) {
    if (winner != null) {
      return;
    }
    if (attackable(shipBlock)) {
      const newBattleGround = [...battleGround];
      newBattleGround[i][j].attacked = true;
      setBattleGround(newBattleGround);
      gainPoint();
    }
    chanceLost();
    togglePlayerTurn();
  }

  function attackable(shipBlock) {
    return shipBlock.territory !== TERRITORY.NO_ONE && !shipBlock.attacked;
  }

  function togglePlayerTurn() {
    setPlayerATurn(!playerATurn);
  }

  function chanceLost() {
    playerATurn
      ? setPlayerAChanceLeft(playerAChanceLeft - 1)
      : setPlayerBChanceLeft(playerBChanceLeft - 1);
  }

  function gainPoint() {
    playerATurn ? setScoreA(scoreA + 1) : setScoreB(scoreB + 1);
  }

  function checkWinner() {
    console.log("winner fn called");
    if (playerAChanceLeft === 0 && playerBChanceLeft === 0) {
      if (scoreA > scoreB) {
        setWinner("Player 1");
      } else if (scoreA < scoreB) {
        setWinner("Player 2");
      } else {
        setWinner("Draw");
      }
    }
  }

  function showHint() {}

  function renderColor(block) {
    if (block.showHint) {
      return !block.attacked ? getColor[block.territory] : "killed";
    }
    return block.attacked ? "killed" : "";
  }

  const getColor = {
    "-1": "territory",
    "0": "player2",
    "1": "player1"
  };

  function renderBattleshipBlocks(row, i) {
    const blocks = [];
    for (let j = 0; j < row.length; j++) {
      blocks.push(
        <div
          key={row[j].id}
          className={"block " + renderColor(row[j])}
          onClick={fireMissile.bind(this, row[j], i, j)}
        />
      );
    }
    return blocks;
  }

  return (
    <div className="Battleship">
      <div className="board">
        <div className="turn">
          <h3> Chances left </h3>
          <div>Player 1 : {playerAChanceLeft}</div>
          <div>Player 2 : {playerBChanceLeft}</div>
        </div>
        <div className="scorecard">
          <h2> Score: </h2>
          <div className="player1"> Player 1 : {scoreA}</div>
          <div className="player2"> Player 2 : {scoreB}</div>
        </div>
        <div className="hint">
          <button type="button">Show Hint</button>
        </div>
      </div>
      {winner && (
        <div className="winner">
          <h2> {winner} Won </h2>
        </div>
      )}
      <div>
        {battleGround.map((row, i) => {
          return (
            <div key={i} className={"row" + i}>
              {renderBattleshipBlocks(row, i)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
