import React, { useEffect, useState } from 'react';
import style from './NhlStandings.module.css';

interface Division {
  name: string;
  conference: string;
  teams: Team[];
}

interface Team {
  name: string;
  gamesPlayed: number;
  wins: number;
  winsOT: number;
  losses: number;
  goalsScored: number;
  goalsAgainst: number;
  points: number;
}

function NhlStandings(): JSX.Element {
  const [standingsData, setStandingsData] = useState<Division[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function getStandings(): Promise<void> {
      const response = await fetch('https://statsapi.web.nhl.com/api/v1/standings');
      const completeData = await response.json();
      const divisions = completeData.records.map(
        (divisionRecord: any): Division => ({
          name: divisionRecord.division.name,
          conference: divisionRecord.conference.name,
          teams: divisionRecord.teamRecords.map(
            (team: any): Team => ({
              name: team.team.name,
              gamesPlayed: team.gamesPlayed,
              wins: team.leagueRecord.wins,
              winsOT: team.leagueRecord.ot,
              losses: team.leagueRecord.losses,
              goalsScored: team.goalsScored,
              goalsAgainst: team.goalsAgainst,
              points: team.points,
            })
          ),
        })
      );
      setStandingsData(divisions);
      setIsLoaded(true);
    }
    getStandings();
  }, []);

  return (
    <div className={style.wrapper}>
      <div>
        {isLoaded ? (
          <div className={style.table}>
            {standingsData.map((division) => (
              <div key={division.name} className={style.divisionWrapper}>
                <span className={style.divisionTitle}>
                  Division: {division.name}, {division.conference} Conference
                </span>
                <div className={style.statsInfo}>
                  <span className={style.teamStatInfo}> </span>
                  <span className={style.gamesPlayedStatInfo}>И</span>
                  <span className={style.teamWinsStatInfo}>В</span>
                  <span className={style.teamWinsOTStatInfo}>ОТ</span>
                  <span className={style.teamLossesStatInfo}>П</span>
                  <span className={style.teamGoalsStatInfo}>Р/Ш</span>
                  <span className={style.teamPointsStatInfo}>О</span>
                </div>
                {division.teams.map((team) => (
                  <div key={team.name} className={style.tableRow}>
                    <span className={style.teamName}>
                      <img
                        className={style.teamLogo}
                        src={`${process.env.PUBLIC_URL}/teams_logo/${team.name}.png`}
                        alt="Logo"
                      />
                      {team.name}
                    </span>
                    <span className={style.gamesPlayed}>{team.gamesPlayed}</span>
                    <span className={style.teamWins}>{team.wins}</span>
                    <span className={style.teamWinsOT}>{team.winsOT}</span>
                    <span className={style.teamLosses}>{team.losses}</span>
                    <span className={style.teamGoalsScored}>
                      {team.goalsScored}-
                    </span>
                    <span className={style.teamGoalsAgainst}>
                      {team.goalsAgainst}
                    </span>
                    <span className={style.teamPoints}>{team.points}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={style.footnote}>
        <div>И - игр сыграно</div>
        <div>В - выиграно матчей</div>
        <div>ОТ - поражения в овертайме или по буллитам</div>
        <div>П - поражения в основное время</div>
        <div>Р/Ш - количество забитых и пропущенных шайб</div>
        <div>О - очки</div>
      </div>
    </div>
  );
}

export default NhlStandings;
