import { useState } from 'react';

type Board = {
  value: null | string;
};

const initialGameBoard: Board[][] = [
  [{ value: null }, { value: null }, { value: null }],
  [{ value: null }, { value: null }, { value: null }],
  [{ value: null }, { value: null }, { value: null }],
];

type GameBoardProps = {
  activePlayerSymbol: string;
  onSelectedCell: () => void;
};

export default function GameBoard({
  activePlayerSymbol,
  onSelectedCell,
}: GameBoardProps) {
  const [gameBoard, updateGameBoard] = useState(initialGameBoard);

  const handleClickEvent = (row: number, cell: number) => {
    updateGameBoard((prevGameBoard) => {
      const updatedGameBoard = prevGameBoard.map((innerArray) =>
        innerArray.map((cellObj) => ({ ...cellObj }))
      );
      updatedGameBoard[row][cell].value = activePlayerSymbol;
      return updatedGameBoard;
    });

    onSelectedCell();
  };

  return (
    <div className="gameboard-container">
      {gameBoard.map((row, rowIndex: number) => (
        <div key={rowIndex} className="gameboard-cell-wrapper">
          {row.map((cell, cellIndex: number) => (
            <div
              key={cellIndex}
              className="gameboard-cell"
              onClick={() => handleClickEvent(rowIndex, cellIndex)}
            >
              {cell.value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
