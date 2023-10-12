import { useState } from "react";
import "./Board.css";
import Cell from "./components/cell/Cell";
import { CellValue } from "./components/models/CellValue";

const Board = () => {
  const size = 3;
  const cellsMatrix: Array<Array<CellValue>> = Array(size)
    .fill(CellValue.EmptyCell)
    .map(() => Array(size).fill(CellValue.EmptyCell));

  const [isGameLocked, setIsGameLocked] = useState<boolean>(false);
  const [currentCells, setCurrentCells] = useState(cellsMatrix);
  const [currentMove, setCurrentMove] = useState<CellValue>(CellValue.Xcell);

  const checkRows = () => {
    for (let i = 0; i < size; i++) {
      const firstCell = currentCells[i][0];
      let won = true;
      if (firstCell === CellValue.EmptyCell) {
        won = false;
      }
      for (let j = 1; j < size && won; j++) {
        if (currentCells[i][j] !== firstCell) {
          won = false;
        }
      }
      if (won) {
        return firstCell;
      }
    }
    return null;
  };

  const checkColumns = () => {
    for (let j = 0; j < size; j++) {
      const firstCell = currentCells[0][j];
      let won = true;
      if (firstCell === CellValue.EmptyCell) {
        won = false;
      }
      for (let i = 1; i < size && won; i++) {
        if (currentCells[i][j] !== firstCell) {
          won = false;
        }
      }
      if (won) {
        return firstCell;
      }
    }
    return null;
  };

  const checkFirstDiagonal = () => {
    const firstCell = currentCells[0][0];

    if (firstCell === CellValue.EmptyCell) {
      return null;
    }

    for (let i = 1; i < size; i++) {
      if (currentCells[i][i] !== firstCell) {
        return null;
      }
    }
    return firstCell;
  };

  const checkSecondDiagonal = () => {
    const firstCell = currentCells[0][size - 1];

    if (firstCell === CellValue.EmptyCell) {
      return null;
    }

    for (let i = 1; i < size; i++) {
      if (currentCells[i][size - i - 1] !== firstCell) {
        return null;
      }
    }
    return firstCell;
  };

  const checkGameOver = () => {
    let rowsResult = checkRows();
    if (rowsResult) {
      return rowsResult;
    }

    let columnsResult = checkColumns();
    if (columnsResult) {
      return columnsResult;
    }

    let firstDiagonalResult = checkFirstDiagonal();
    if (firstDiagonalResult) {
      return firstDiagonalResult;
    }

    let secondDiagonalResult = checkSecondDiagonal();
    if (secondDiagonalResult) {
      return secondDiagonalResult;
    }
    return null;
  };

  const startNewGame = () => {
    setIsGameLocked(false);
    setCurrentCells(cellsMatrix);
    setCurrentMove(CellValue.Xcell);
  };

  const emptyCells = () => {
    let count = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (currentCells[i][j] == CellValue.EmptyCell) {
          count++;
        }
      }
    }
    return count;
  };

  const handleSetNextMove = (indexRow: number, indexColumn: number) => {
    if (isGameLocked) {
      return;
    }

    if (currentMove === CellValue.Xcell) {
      currentCells[indexRow][indexColumn] = CellValue.Xcell;
      setCurrentCells(currentCells);
      setCurrentMove(CellValue.Ycell);
    } else if (currentMove === CellValue.Ycell) {
      currentCells[indexRow][indexColumn] = CellValue.Ycell;
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
      {cellsMatrix.map((row, indexRow) => (
        <div className="row">
          {row.map((_, indexColumn) => (
            <Cell
              value={currentCells[indexRow][indexColumn]}
              onCellClick={() => handleSetNextMove(indexRow, indexColumn)}
            />
          ))}
        </div>
      ))}
      <button onClick={() => startNewGame()}>Start new game</button>
    </div>
  );
};

export default Board;
