import React, { useEffect, useState } from 'react';
import style from './Home.module.css';

interface Props {
  gameId: number;
}

interface ShootsInfo {
  homeTeamShoots: number;
  awayTeamShoots: number;
}

interface GoalInfo {
  id: number;
  team: string;
  periodType: string;
  goalTime: string;
  isPowerPlay: string;
  playerFullName: string;
}

function GameDetails(props: Props): JSX.Element {
  const { gameId } = props;
  const [shootsInfo, setShootsInfo] = useState<ShootsInfo>({
    homeTeamShoots: 0,
    awayTeamShoots: 0,
  });
  const [homeTeamGoalsInfo, setHomeTeamGoalsInfo] = useState<GoalInfo[]>([]);
  const [awayTeamGoalsInfo, setAwayTeamGoalsInfo] = useState<GoalInfo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function getGameInfo(): Promise<void> {
      const response = await fetch(
        `https://statsapi.web.nhl.com/api/v1/game/${gameId}/feed/live`
      );
      const data = await response.json();
      const { allPlays } = data.liveData.plays;
      const { scoringPlays } = data.liveData.plays;
      const homeTeam = data.gameData.teams.home.name;
      const awayTeam = data.gameData.teams.away.name;
      const goalsInfo = scoringPlays.map(
        (scoreId: number, index: number): GoalInfo => {
          const team = allPlays[scoreId].team.name;
          let playerFullName = allPlays[scoreId].players[0].player.fullName;
          const separator = playerFullName.indexOf(' ');
          const firstName = playerFullName.substring(0, 1);
          const lastName = playerFullName.substring(separator + 1);
          const { seasonTotal } = allPlays[scoreId].players[0];
          playerFullName = `${firstName}.${lastName} (${seasonTotal})`;
          return {
            id: index,
            team,
            periodType: allPlays[scoreId].about.ordinalNum,
            goalTime: allPlays[scoreId].about.periodTime,
            isPowerPlay: allPlays[scoreId].result.strength.name,
            playerFullName,
          };
        }
      );

      const shootsDetails = {
        homeTeamShoots: data.liveData.linescore.teams.home.shotsOnGoal,
        awayTeamShoots: data.liveData.linescore.teams.away.shotsOnGoal,
      };
      const homeTeamGoals = goalsInfo.filter(
        (goal: GoalInfo) => goal.team === homeTeam && goal.periodType !== 'SO'
      );
      const awayTeamGoals = goalsInfo.filter(
        (goal: GoalInfo) => goal.team === awayTeam && goal.periodType !== 'SO'
      );
      setHomeTeamGoalsInfo(homeTeamGoals);
      setAwayTeamGoalsInfo(awayTeamGoals);
      setIsLoaded(true);
      setShootsInfo(shootsDetails);
    }
    getGameInfo();
  }, [gameId]);

  return (
    <div>
      {isLoaded ? (
        <div>
          <div className={style.shootsInfo}>
            <span>{shootsInfo.homeTeamShoots}</span>
            <span> Shoots </span>
            <span>{shootsInfo.awayTeamShoots}</span>
          </div>
          <div className={style.infoTitle}> Goals </div>
          <div className={style.allGoalsInfo}>
            <div className={style.goalsInfo}>
              {homeTeamGoalsInfo.map((goalInfo) => (
                <div key={goalInfo.id}>
                  <span>
                    {goalInfo.periodType} [{goalInfo.goalTime}] -{' '}
                    {goalInfo.playerFullName}
                  </span>
                </div>
              ))}
            </div>
            <div className={style.goalsInfo}>
              {awayTeamGoalsInfo.map((goalInfo) => (
                <div key={goalInfo.id}>
                  <span>
                    {goalInfo.periodType} [{goalInfo.goalTime}] -{' '}
                    {goalInfo.playerFullName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>- Матч не начался - </div>
      )}
    </div>
  );
}

export default GameDetails;

// homeTeamGoals = goalsInfo.map((goal: GoalInfo): GoalInfo | null => {
//   if (goal.team === homeTeam) {
//     return {
//       id: goal.id,
//       team: goal.team,
//       goalPeriod: goal.goalPeriod,
//       goalTime: goal.goalTime,
//       isPowerPlay: goal.isPowerPlay,
//       playerFullName: goal.playerFullName,
//     };
//   }
//   return null;
// });
