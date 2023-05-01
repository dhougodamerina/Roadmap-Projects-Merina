import { useState } from "react";

import Zero from "./components/zero";
import Cross from "./components/cross";
import Box from "./components/box";

const App = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [isXTurn, setIsXTurn] = useState(true);

  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 7],
      [2, 4, 6],
    ];
    for (let logic of lines) {
      const [a, b, c] = logic;
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c])
        return board[a];
    }
    return false;
  };

  const handleClick = (e) => {
    const index = e.target.id;
    const copyState = [...board];
    copyState[index] = isXTurn ? "X" : "0";
    setBoard(copyState);
    setIsXTurn(!isXTurn);
  };
  const winner = calculateWinner();

  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
  };
  return (
    <div className=" m-0 p-0 flex flex-col items-center justify-center h-[100vh] bg-slate-700">
      {winner ? (
        <div className="flex text-center flex-col">
          <h2 className=" text-2xl text-white m-4">
            Player {winner} is the winner!!
          </h2>
          <button
            onClick={resetGame}
            className=" text-lg border border-white px-4 py-2 text-white"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          <h2 className=" text-2xl text-white m-4">
            Player {isXTurn ? "X" : "0"} turn
          </h2>
          <div>
            <div className=" w-[600px] h-[600px] flex flex-wrap">
              {board.map((cell, index) => (
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
