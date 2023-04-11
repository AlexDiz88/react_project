import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import DateParser from './DateParser';
import GameStatusParser from './GameStatusParser';
import GameDetails from './GameDetails';

interface Game {
  id: number;
  gamePk: number;
  gameDate: string;
  homeTeam: string;
  homeTeamScore: number;
  awayTeam: string;
  awayTeamScore: number;
  status: string;
  statusCode: number;
  statusTitleStyle: string;
}

function Home(): JSX.Element {
  const [lastGames, setLastGames] = useState<Game[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const toggleMatchDetails = (id: number): void => {
    if (id === selectedGameId) {
      setSelectedGameId(null);
    } else {
      setSelectedGameId(id);
    }
  };

  useEffect(() => {
    async function getGames(): Promise<void> {
      const response = await fetch(
        'https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore'
      );
      const data = await response.json();
      const lastGamesData = data.dates[0].games;
      const games = lastGamesData.map((game: any, index: number): Game => {
        const gameTime = DateParser(game.gameDate);
        const gameStatus = GameStatusParser(game.status, game.linescore);
        return {
          id: index,
          gamePk: game.gamePk,
          gameDate: gameTime,
          homeTeam: game.teams.home.team.name,
          homeTeamScore: game.teams.home.score,
          awayTeam: game.teams.away.team.name,
          awayTeamScore: game.teams.away.score,
          status: gameStatus.actualGameStatus,
          statusCode: gameStatus.gameStatusCode,
          statusTitleStyle: gameStatus.statusTitleStyle,
        };
      });
      const sortedGames = games.sort(
        (a: Game, b: Game) => a.statusCode - b.statusCode
      );
      setLastGames(sortedGames);
      setIsLoaded(true);
    }
    getGames();
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Last Games:</div>
      <div>
        {isLoaded ? (
          <div className={style.gamesWrapper}>
            {lastGames.map((game) => (
              <div
                key={game.id}
                className={style.gameInfo}
                onClick={() => toggleMatchDetails(game.id)}
                role="textbox"
                tabIndex={0}
              >
                {game.status === 'Scheduled' ? (
                  <span className={style[game.statusTitleStyle]}>
                    {game.gameDate}
                  </span>
                ) : (
                  <span className={style[game.statusTitleStyle]}>{game.status}</span>
                )}

                <div className={style.game}>
                  <img
                    className={style.teamLogo}
                    src={`${process.env.PUBLIC_URL}/teams_logo/${game.homeTeam}.png`}
                    alt="Logo"
                  />
                  <span className={style.homeTeamName}>{game.homeTeam}</span>
                  <div className={style.score}>
                    <span className={style.teamScore}>{game.homeTeamScore}</span>
                    <span className={style.colon}>:</span>
                    <span className={style.teamScore}>{game.awayTeamScore}</span>
                  </div>
                  <span className={style.awayTeamName}>{game.awayTeam}</span>
                  <img
                    className={style.teamLogo}
                    src={`${process.env.PUBLIC_URL}/teams_logo/${game.awayTeam}.png`}
                    alt="Logo"
                  />
                  {/* Отображение дополнительной информации при клике на матч */}
                  {game.id === selectedGameId && (
                    <div className={style.gameDetails}>
                      <div className={style.detailsInfo}>
                        {game.statusCode > 4 ? (
                          <div>- Матч не начался -</div>
                        ) : (
                          <div>
                            <GameDetails gameId={game.gamePk} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={style.wrapper}>
        <h3>Pages Status:</h3>
        <div>Home - in progress</div>
        <div>Playoffs - very soon</div>
        <div>Standings - READY!</div>
        <div>Stats - in future</div>
      </div>
    </div>
  );
}

export default Home;
