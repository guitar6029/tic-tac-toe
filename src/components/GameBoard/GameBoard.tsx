type Board = {
  value: null | string;
};

type GameBoardProps = {
  gameBoard: Board[][];
  onCellClick: (row: number, cell: number) => void;
};

export default function GameBoard({ gameBoard, onCellClick }: GameBoardProps) {
  return (
    <div className="gameboard-container">
      {gameBoard.map((row, rowIndex: number) => (
        <div key={rowIndex} className="gameboard-cell-wrapper">
          {row.map((cell, cellIndex: number) => (
            <div
              key={cellIndex}
              className="gameboard-cell"
              onClick={() => onCellClick(rowIndex, cellIndex)}
            >
              {cell.value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
