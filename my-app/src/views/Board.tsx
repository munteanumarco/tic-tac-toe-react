import { useState } from "react";
import "./Board.css";
import Cell from "./components/cell/Cell";
import { CellValue } from "./components/models/CellValue";

const Board = () => {
  const cells: Array<CellValue> = Array(9).fill(CellValue.EmptyCell);
  const [isGameLocked, setIsGameLocked] = useState<boolean>(false);
  const [currentCells, setCurrentCells] = useState<Array<CellValue>>(cells);
  const [currentMove, setCurrentMove] = useState<CellValue>(CellValue.Xcell);

  const checkGameOver = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        currentCells[a] &&
        currentCells[a] === currentCells[b] &&
        currentCells[a] === currentCells[c]
      ) {
        return currentCells[a];
      }
    }
    return null;
  };

  const startNewGame = () => {
    setIsGameLocked(false);
    setCurrentCells(cells);
    setCurrentMove(CellValue.Xcell);
  };

  const emptyCells = () => {
    return currentCells.filter((cell) => cell === CellValue.EmptyCell).length;
  };

  const handleSetNextMove = (index: number) => {
    if (isGameLocked) {
      return;
    }
    if (currentMove === CellValue.Xcell) {
      currentCells[index] = CellValue.Xcell;
      setCurrentCells(currentCells);
      setCurrentMove(CellValue.Ycell);
    } else if (currentMove === CellValue.Ycell) {
      currentCells[index] = CellValue.Ycell;
      setCurrentCells(currentCells);
      setCurrentMove(CellValue.Xcell);
    }
    const result = checkGameOver();

    if (result !== null) {
      let player = result === CellValue.Xcell ? "X" : "Y";
      let message = `Player ${player} won !`;
      setIsGameLocked(true);
      alert(message);
    } else if (emptyCells() == 0) {
      setIsGameLocked(true);
      alert("Draw !");
    }
  };

  return (
    <div>
      <div className="row">
        <Cell
          value={currentCells[0]}
          onCellClick={() => handleSetNextMove(0)}
        />
        <Cell
          value={currentCells[1]}
          onCellClick={() => handleSetNextMove(1)}
        />
        <Cell
          value={currentCells[2]}
          onCellClick={() => handleSetNextMove(2)}
        />
      </div>
      <div className="row">
        <Cell
          value={currentCells[3]}
          onCellClick={() => handleSetNextMove(3)}
        />
        <Cell
          value={currentCells[4]}
          onCellClick={() => handleSetNextMove(4)}
        />
        <Cell
          value={currentCells[5]}
          onCellClick={() => handleSetNextMove(5)}
        />
      </div>
      <div className="row">
        <Cell
          value={currentCells[6]}
          onCellClick={() => handleSetNextMove(6)}
        />
        <Cell
          value={currentCells[7]}
          onCellClick={() => handleSetNextMove(7)}
        />
        <Cell
          value={currentCells[8]}
          onCellClick={() => handleSetNextMove(8)}
        />
      </div>
      <button onClick={() => startNewGame()}>Reset Game</button>
    </div>
  );
};

export default Board;
