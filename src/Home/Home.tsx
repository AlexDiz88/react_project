import React, { useEffect, useState } from 'react';
import style from './Home.module.css';

interface Game {
  id: number;
  homeTeam: string;
  homeTeamScore: number;
  awayTeam: string;
  awayTeamScore: number;
  status: string;
}

function Home(): JSX.Element {
  const [lastGames, setLastGames] = useState<Game[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function getGames(): Promise<void> {
      const response = await fetch(
        'https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore'
      );
      const data = await response.json();
      const lastGamesData = data.dates[0].games;
      const games = lastGamesData.map(
        (game: any, index: number): Game => ({
          id: index,
          homeTeam: game.teams.home.team.name,
          homeTeamScore: game.teams.home.score,
          awayTeam: game.teams.away.team.name,
          awayTeamScore: game.teams.away.score,
          status: game.status.detailedState,
        })
      );
      const sortedItems = games.sort((a: Game, b: Game) => {
        const order: any = {
          Final: 1,
          'Game Over': 2,
          'In Progress - Critical': 3,
          'In Progress': 4,
          'Pre-Game': 5,
          Scheduled: 6,
        };
        return order[a.status] - order[b.status];
      });
      setLastGames(sortedItems);
      setIsLoaded(true);
      console.log(games);
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
              <div key={game.id} className={style.gameInfo}>
                {game.status === 'Final' ? (
                  <span className={style.gameStatusFinal}>{game.status}</span>
                ) : game.status === 'Game Over' ? (
                  <span className={style.gameStatusGameOver}>{game.status}</span>
                ) : game.status === 'In Progress - Critical' ? (
                  <span className={style.gameStatusCritical}>{game.status}</span>
                ) : game.status === 'In Progress' ? (
                  <span className={style.gameStatusInProgress}>{game.status}</span>
                ) : game.status === 'Pre-Game' ? (
                  <span className={style.gameStatusPreGame}>{game.status}</span>
                ) : (
                  <span className={style.gameStatusScheduled}>{game.status}</span>
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
