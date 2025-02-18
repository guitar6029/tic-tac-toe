import { useState, useRef, useEffect } from 'react';

type PlayerProps = {
  name: string;
  isX: boolean;
  isActivePlayer: string;
};

export default function Player({ name, isX, isActivePlayer }: PlayerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditMode, setEditMode] = useState<boolean>(false);

  const [playerName, setPlayerName] = useState<string>(name);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const handleChange = () => {
    setEditMode((prevVal) => !prevVal);
  };

  const handlePlayerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  return (
    <div
      className={`gap-1 player-container ${
        isActivePlayer ? 'active-player' : 'default-player'
      }`}
    >
      <div className="flex gap-1 items-center p-2 ">
        {isEditMode ? (
          <input
            ref={inputRef}
            name="playerName"
            value={playerName}
            onChange={(e) => handlePlayerName(e)}
          />
        ) : (
          <h1 className="player-title">{playerName}</h1>
        )}

        <span className="player-xo">{isX ? 'X' : 'O'}</span>
      </div>
      <button onClick={handleChange}>{isEditMode ? 'Save' : 'Edit'}</button>
    </div>
  );
}
