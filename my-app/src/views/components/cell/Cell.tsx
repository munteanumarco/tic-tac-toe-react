import { useState } from "react";
import "./Cell.css";
import { CellValue } from "../models/CellValue";

type Props = {
  value: CellValue;
  onCellClick: any;
};

const Cell = ({ value, onCellClick }: Props) => {
  return (
    <div className="cell" onClick={onCellClick}>
      {value === CellValue.Xcell && <p>X</p>}
      {value === CellValue.Ycell && <p>Y</p>}
    </div>
  );
};

export default Cell;
