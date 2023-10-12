import { useEffect, useState } from "react";
import "./Board.css";
import Cell from "./components/cell/Cell";
import { CellValue } from "./components/models/CellValue";

type Props = {
  size: number;
};

const Board = ({ size }: Props) => {
  const createEmptyCells = () =>
    Array(size)
      .fill(CellValue.EmptyCell)
      .map(() => Array(size).fill(CellValue.EmptyCell));

  const createEmptyProjection = () => Array(size).fill(0);

  const [xColumnProjection, setXColumnProjection] = useState<Array<number>>(createEmptyProjection);
  const [yColumnProjection, setYColumnProjection] = useState<Array<number>>(createEmptyProjection);
  const [xRowProjection, setXRowProjection] = useState<Array<number>>(createEmptyProjection);
  const [yRowProjection, setYRowProjection] = useState<Array<number>>(createEmptyProjection);
  const [xFirstDiagonalProjection, setXFirstDiagonalProjection] = useState<number>(0);
  const [yFirstDiagonalProjection, setYFirstDiagonalProjection] = useState<number>(0);
  const [xSecondDiagonalProjection, setXSecondDiagonalProjection] = useState<number>(0);
  const [ySecondDiagonalProjection, setYSecondDiagonalProjection] = useState<number>(0);

  const [isGameLocked, setIsGameLocked] = useState<boolean>(false);
  const [currentCells, setCurrentCells] = useState(createEmptyCells);
  const [currentMove, setCurrentMove] = useState<CellValue>(CellValue.Xcell);

  const updatedCells = [...currentCells];

  useEffect(() => {
    const result = checkGameOver();
    if (result !== null) {
      let message = `Player ${result} won !`;
      alert(message);
      setIsGameLocked(true);
    } else if (numberOfEmptyCells() === 0) {
      alert("Draw !");
      setIsGameLocked(true);
    }
  }, [currentCells]);

  const checkGameOver = () => {
    if (checkWinnerX()) {
      return "X";
    }
    if (checkWinnerY()) {
      return "Y";
    }
    return null;
  };

  const checkWinnerX = () => {
    return (
      xColumnProjection.includes(size) ||
      xRowProjection.includes(size) ||
      xFirstDiagonalProjection === size ||
      xSecondDiagonalProjection === size
    );
  };

  const checkWinnerY = () => {
    return (
      yColumnProjection.includes(size) ||
      yRowProjection.includes(size) ||
      yFirstDiagonalProjection === size ||
      ySecondDiagonalProjection === size
    );
  };

  const startNewGame = () => {
    setIsGameLocked(false);
    setCurrentCells(createEmptyCells);
    setCurrentMove(CellValue.Xcell);
    setXColumnProjection(createEmptyProjection);
    setYColumnProjection(createEmptyProjection);
    setXRowProjection(createEmptyProjection);
    setYRowProjection(createEmptyProjection);
    setXFirstDiagonalProjection(0);
    setYFirstDiagonalProjection(0);
    setXSecondDiagonalProjection(0);
    setYSecondDiagonalProjection(0);
  };

  const numberOfEmptyCells = () => currentCells.flat().filter((cell) => cell === CellValue.EmptyCell).length;

  const handleSetNextMove = (indexRow: number, indexColumn: number) => {
    if (isGameLocked || currentCells[indexRow][indexColumn] !== CellValue.EmptyCell) {
      return;
    }

    updatedCells[indexRow][indexColumn] = currentMove;
    setCurrentCells(updatedCells);

    updateProjections(indexRow, indexColumn, currentMove);

    if (currentMove === CellValue.Xcell) {
      setCurrentMove(CellValue.Ycell);
    } else {
      setCurrentMove(CellValue.Xcell);
    }
  };

  const updateProjections = (indexRow: number, indexColumn: number, cell: CellValue) => {
    if (cell === CellValue.Xcell) {
      xRowProjection[indexRow]++;
      xColumnProjection[indexColumn]++;
      if (indexColumn === indexRow) {
        setXFirstDiagonalProjection(xFirstDiagonalProjection + 1);
      }
      if (indexColumn + indexRow + 1 === size) {
        setXSecondDiagonalProjection(xSecondDiagonalProjection + 1);
      }
    } else if (cell === CellValue.Ycell) {
      yRowProjection[indexRow]++;
      yColumnProjection[indexColumn]++;
      if (indexColumn === indexRow) {
        setYFirstDiagonalProjection(yFirstDiagonalProjection + 1);
      }
      if (indexColumn + indexRow + 1 === size) {
        setYSecondDiagonalProjection(ySecondDiagonalProjection + 1);
      }
    }
  };

  return (
    <div>
      {currentCells.map((row, indexRow) => (
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
