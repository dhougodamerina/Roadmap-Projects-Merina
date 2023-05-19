import { useState } from "react";

import Zero from "./components/zero";
import Cross from "./components/cross";
import Box from "./components/box";

const App = () => {
  const [gameBoard, setGameBoard] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isXTurn, setIsXTurn] = useState(true);

  const calculateWinner = () => {
    const winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let logic of winnerLine) {
      const [x, y, z] = logic;
      if (
        gameBoard[x] !== null &&
        gameBoard[x] === gameBoard[y] &&
        gameBoard[x] === gameBoard[z]
      )
        return gameBoard[x];
    }
    if (!gameBoard.includes("")) {
      return "Draw";
    }
    return false;
  };

  const handleClick = (e) => {
    const index = e.target.id;
    if (gameBoard[index] !== "") {
      return;
    }
    const boardState = [...gameBoard];
    boardState[index] = isXTurn ? "X" : "0";
    setGameBoard(boardState);
    setIsXTurn(!isXTurn);
  };
  const winner = calculateWinner();

  const restartGame = () => {
    setGameBoard(["", "", "", "", "", "", "", "", ""]);
  };
  return (
    <div className=" m-0 p-0 flex flex-col items-center justify-center h-[100vh] bg-slate-700">
      {winner ? (
        <div className="flex text-center flex-col">
          {winner === "Draw" ? (
            <>
              <h1 className=" text-2xl text-white m-4">Game Over!!</h1>
              <h2 className=" text-2xl text-white m-4">It's a draw!!</h2>
            </>
          ) : (
            <h2 className=" text-2xl text-white m-4">
              Player {winner} is the winner!!
            </h2>
          )}
          <button
            onClick={restartGame}
            className=" text-lg border border-white px-4 py-2 text-white hover:bg-white hover:text-slate-700"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          <h2 className=" text-2xl text-white m-4">
            It's player{" "}
            <span className=" italic">{`'${isXTurn ? "X" : "0"}'`}</span> turn.
          </h2>
          <div>
            <div className=" w-[600px] h-[600px] flex flex-wrap">
              {gameBoard.map((cell, index) => (
                <Box
                  key={index}
                  id={index}
                  value={
                    cell === "X" ? <Cross /> : cell === "0" ? <Zero /> : ""
                  }
                  handleClick={handleClick}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
