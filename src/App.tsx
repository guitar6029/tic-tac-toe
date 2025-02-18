import { useState } from 'react';
import Header from './components/Header/Header';
import Player from './components/Player/Player';
import GameBoard from './components/GameBoard/GameBoard';

const initialGameBoard = [
  [{ value: null }, { value: null }, { value: null }],
  [{ value: null }, { value: null }, { value: null }],
  [{ value: null }, { value: null }, { value: null }],
];

const checkWin = (board) => {
  // Check rows
  for (let row of board) {
    if (row[0].value && row[0].value === row[1].value && row[1].value === row[2].value) {
      return row[0].value;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (board[0][col].value && board[0][col].value === board[1][col].value && board[1][col].value === board[2][col].value) {
      return board[0][col].value;
    }
  }

  // Check diagonals
  if (board[0][0].value && board[0][0].value === board[1][1].value && board[1][1].value === board[2][2].value) {
    return board[0][0].value;
  }
  if (board[0][2].value && board[0][2].value === board[1][1].value && board[1][1].value === board[2][0].value) {
    return board[0][2].value;
  }

  return null;
};

export default function App() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [activePlayer, setActivePlayer] = useState('X');
  const [turns, setTurns] = useState([]);

  const handleCellClick = (row, cell) => {
    if (!gameBoard[row][cell].value) {
      const updatedBoard = gameBoard.map((innerArray, rowIndex) =>
        innerArray.map((cellObj, cellIndex) =>
          rowIndex === row && cellIndex === cell
            ? { ...cellObj, value: activePlayer }
            : cellObj
        )
      );

      setGameBoard(updatedBoard);
      setTurns([...turns, { row, cell, player: activePlayer }]);

      // Check for a win
      const winner = checkWin(updatedBoard);
      if (winner) {
        alert(`${winner} wins!`);
        // Reset the game or handle the win
        setGameBoard(initialGameBoard); // Reset the board (or any other handling you prefer)
        setTurns([]); // Reset the turns
        return;
      }

      setActivePlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <Header />
      <div className="flex items-center gap-1">
        <Player
          name="Player 1"
          isX={true}
          isActivePlayer={activePlayer === 'X'}
        />
        <Player
          name="Player 2"
          isX={false}
          isActivePlayer={activePlayer === 'O'}
        />
      </div>
      <GameBoard gameBoard={gameBoard} onCellClick={handleCellClick} />
    </div>
  );
}
