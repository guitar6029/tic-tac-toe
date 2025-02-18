import { useState } from 'react';

import Header from './components/Header/Header';
import Player from './components/Player/Player';
import GameBoard from './components/GameBoard/GameBoard';

export default function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  const handleSwitchPlayer = () => {
    setActivePlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <Header />
      <div className="flex items-center gap-1 ">
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
      <GameBoard
        onSelectedCell={handleSwitchPlayer}
        activePlayerSymbol={activePlayer}
      />
    </div>
  );
}
