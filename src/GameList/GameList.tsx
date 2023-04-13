import React, { useEffect, useState } from 'react';
import DateParser from '../utils/DateParser';
import GameCard from '../GameCard/GameCard';
import style from './GameList.module.css';

interface Props {
  date: Date;
}

function GameList({ date }: Props): JSX.Element {
  const [gameLinks, setGameLinks] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [noGamesDay, setNoGamesDay] = useState<boolean>(false);
  const formattedDate = DateParser(date);

  // TODO решить проблему с днями без матчей
  useEffect(() => {
    async function getGameLinksByDate(): Promise<void> {
      try {
        const response = await fetch(
          `https://statsapi.web.nhl.com/api/v1/schedule?date=${formattedDate}`
        );
        const data = await response.json();
        if (data.dates.length === 0) {
          setNoGamesDay(true);
          setGameLinks([]);
        } else {
          const allGamesByDate = data.dates[0].games;
          const links = allGamesByDate.map((game: any) => game.link);
          setNoGamesDay(false);
          setIsLoaded(true);
          setGameLinks(links);
        }
      } catch (error) {
        setIsError(true);
      }
    }
    getGameLinksByDate();
  }, [formattedDate, date, noGamesDay]);

  return (
    <div className={style.gameListWrapper}>
      {isError ? (
        <div>Ошибка загрузки данных. Перезагрузите страницу</div>
      ) : noGamesDay ? (
        <div className={style.noGamesInfo}>На указанную дату матчей нет</div>
      ) : isLoaded ? (
        gameLinks.map((link) => (
          <div key={link}>
            <GameCard gameLink={link} />
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default GameList;
