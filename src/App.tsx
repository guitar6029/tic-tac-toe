import { useState } from 'react';
import Header from './components/Header/Header';
import Player from './components/Player/Player';
import GameBoard from './components/GameBoard/GameBoard';

const initialGameBoard = [
  [{ value: null }, { value: null }, { value: null }],
  [{ value: null }, { value: null }, { value: null }],
  [{ value: null }, { value: null }, { value: null }],
];

export default function App() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [activePlayer, setActivePlayer] = useState('X');
  const [turns, setTurns] = useState([]);

  const handleCellClick = (row:number, cell:number) => {
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
