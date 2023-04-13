import React, { useEffect, useState } from 'react';
import GameStatusParser from '../utils/GameStatusParser';
import style from './GameCard.module.css';
import GameDetails from '../GameDetails/GameDetails';

interface Props {
  gameLink: string;
}

interface GameInfo {
  gamePk: number;
  homeTeam: string;
  homeTeamScore: number;
  awayTeam: string;
  awayTeamScore: number;
  status: string;
  statusCode: number;
  statusTitleStyle: string;
}

function GameCard({ gameLink }: Props): JSX.Element {
  const [gameInfo, setGameInfo] = useState<GameInfo>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const toggleMatchDetails = (gamePk: number): void => {
    if (gamePk === selectedGameId) {
      setSelectedGameId(null);
    } else {
      setSelectedGameId(gamePk);
    }
  };

  useEffect(() => {
    async function getGame(): Promise<void> {
      const response = await fetch(`https://statsapi.web.nhl.com${gameLink}`);
      const gameData = await response.json();
      const gameStatus = GameStatusParser(gameData);

      const game: GameInfo = {
        gamePk: gameData.gamePk,
        homeTeam: gameData.liveData.linescore.teams.home.team.name,
        homeTeamScore: gameData.liveData.linescore.teams.home.goals,
        awayTeam: gameData.liveData.linescore.teams.away.team.name,
        awayTeamScore: gameData.liveData.linescore.teams.away.goals,
        status: gameStatus.title,
        statusCode: gameStatus.code,
        statusTitleStyle: gameStatus.style,
      };
      setGameInfo(game);
      setIsLoaded(true);
    }
    getGame();
  }, [gameLink]);

  return (
    <div className={style.gameWrapper}>
      {isLoaded && gameInfo ? (
        <div
          key={gameInfo.gamePk}
          className={style.gameInfo}
          onClick={() => toggleMatchDetails(gameInfo.gamePk)}
          role="textbox"
          tabIndex={0}
        >
          <div className={style[gameInfo.statusTitleStyle]}>{gameInfo.status}</div>
          <div className={style.game}>
            <img
              className={style.teamLogo}
              src={`${process.env.PUBLIC_URL}/teams_logo/${gameInfo.homeTeam}.png`}
              alt="Logo"
            />
            <span className={style.homeTeamName}>{gameInfo.homeTeam}</span>
            <div className={style.score}>
              <span className={style.teamScore}>{gameInfo.homeTeamScore}</span>
              <span className={style.colon}>:</span>
              <span className={style.teamScore}>{gameInfo.awayTeamScore}</span>
            </div>
            <span className={style.awayTeamName}>{gameInfo.awayTeam}</span>
            <img
              className={style.teamLogo}
              src={`${process.env.PUBLIC_URL}/teams_logo/${gameInfo.awayTeam}.png`}
              alt="Logo"
            />
            {/* Отображение дополнительной информации при клике на матч */}
            {gameInfo.gamePk === selectedGameId && (
              <div>
                {gameInfo.statusCode > 3 ? (
                  <div className={style.noGameDetails}>- Матч не начался -</div>
                ) : (
                  <GameDetails gameId={gameInfo.gamePk} />
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <span> </span>
      )}
    </div>
  );
}

export default GameCard;
