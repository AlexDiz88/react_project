import React, { useState } from 'react';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import GameList from '../GameList/GameList';
import style from './GameListContainer.module.css';

function GameListContainer(): JSX.Element {
//   const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date(2023, 2, 17));

  const handleDateChange = (date: Date): void => {
    setSelectedDate(date);
  };

  return (
    <div>
      <ButtonGroup selectedDate={selectedDate} onDateChange={handleDateChange} />
      <div className={style.gameListContainer}>
        <GameList date={selectedDate} />
      </div>
    </div>
  );
}

export default GameListContainer;
