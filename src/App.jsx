import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = { X: "Player 1", O: "Player 2" };
const INITAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSpuareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSpuareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSpuareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSpuareSymbol &&
      firstSpuareSymbol === secondSpuareSymbol &&
      secondSpuareSymbol === thirdSpuareSymbol
    ) {
      winner = players[firstSpuareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurn] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...INITAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  const winner = deriveWinner(gameBoard, players);

  let hasDraw = gameTurns.length === 9 && winner === null;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurn((prevGameTurn) => {
      let currentPlayer = deriveActivePlayer(prevGameTurn);

      const newGameTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurn,
      ];
      return newGameTurn;
    });
  }

  function handleReset() {
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initalName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initalName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        {(winner || hasDraw) && (
          <GameOver winner={winner} onReset={handleReset} />
        )}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
