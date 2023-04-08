import React, { useEffect, useState } from 'react';
import style from './Home.module.css';

interface TeamInfo {
  id: number;
  name: string;
  gamesPlayed: number;
  wins: number;
  winsOT: number;
  losses: number;
  points: number;
  goalsScored: number;
  goalsAgainst: number;
}

function Home(): JSX.Element {
  const [teamData, setTeamData] = useState<TeamInfo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [divisionMetropolitanTeams, setDivisionMetropolitanTeams] = useState<
    TeamInfo[]
  >([]);
  const [divisionAtlanticTeams, setDivisionAtlanticTeams] = useState<TeamInfo[]>([]);
  const [divisionCentralTeams, setDivisionCentralTeams] = useState<TeamInfo[]>([]);
  const [divisionPacificTeams, setDivisionPacificTeams] = useState<TeamInfo[]>([]);

  useEffect(() => {
    async function getStandings(divisionId: number): Promise<TeamInfo[]> {
      const response = await fetch('https://statsapi.web.nhl.com/api/v1/standings');
      const obj = await response.json();
      const data = obj.records[divisionId].teamRecords;
      const newTeamData = data.map((record: any, index: number) => {
        const teamId: number = index;
        const teamName: string = record.team.name;
        const teamGamesPlayed: number = record.gamesPlayed;
        const teamWins: number = record.leagueRecord.wins;
        const teamWinsOT: number = record.leagueRecord.ot;
        const teamLosses: number = record.leagueRecord.losses;
        const teamPoints: number = record.points;
        const teamGoalsScored: number = record.goalsScored;
        const teamGoalsAgainst: number = record.goalsAgainst;
        return {
          id: teamId,
          name: teamName,
          gamesPlayed: teamGamesPlayed,
          wins: teamWins,
          winsOT: teamWinsOT,
          losses: teamLosses,
          points: teamPoints,
          goalsScored: teamGoalsScored,
          goalsAgainst: teamGoalsAgainst,
        };
      });
      console.log(teamData);
      setTeamData(newTeamData);
      setIsLoaded(true);
      return newTeamData;
    }

    async function getAllDivisons(): Promise<void> {
      const divMetropolitanTeams = await getStandings(0);
      const divAtlanticTeams = await getStandings(1);
      const divCentralTeams = await getStandings(2);
      const divPacificTeams = await getStandings(3);
      setDivisionMetropolitanTeams(divMetropolitanTeams);
      setDivisionAtlanticTeams(divAtlanticTeams);
      setDivisionCentralTeams(divCentralTeams);
      setDivisionPacificTeams(divPacificTeams);
    }
    getAllDivisons();
  }, []);

  return (
    <div className={style.wrapper}>
      <div>
        {isLoaded ? (
          <div className={style.table}>
            <div className={style.divisionWrapper}>
              <span className={style.divisionTitle}>
                Division: Metropolitan, Eastern Conference
              </span>
              {divisionMetropolitanTeams.map((team) => (
                <div key={team.id} className={style.tableRow}>
                  <span className={style.teamName}>{team.name}</span>
                  <span className={style.gamesPlayed}>{team.gamesPlayed}</span>
                  <span className={style.teamWins}>{team.wins}</span>
                  <span className={style.teamWinsOT}>{team.winsOT}</span>
                  <span className={style.teamLosses}>{team.losses}</span>
                  <span className={style.teamGoalsScored}>{team.goalsScored}</span>
                  <span className={style.teamGoalsAgainst}>{team.goalsAgainst}</span>
                  <span className={style.teamPoints}>{team.points}</span>
                </div>
              ))}
            </div>
            <div className={style.divisionWrapper}>
              <span className={style.divisionTitle}>
                Division: Atlantic, Eastern Conference
              </span>
              {divisionAtlanticTeams.map((team) => (
                <div key={team.id} className={style.tableRow}>
                  <span className={style.teamName}>{team.name}</span>
                  <span className={style.gamesPlayed}>{team.gamesPlayed}</span>
                  <span className={style.teamWins}>{team.wins}</span>
                  <span className={style.teamWinsOT}>{team.winsOT}</span>
                  <span className={style.teamLosses}>{team.losses}</span>
                  <span className={style.teamGoalsScored}>{team.goalsScored}</span>
                  <span className={style.teamGoalsAgainst}>{team.goalsAgainst}</span>
                  <span className={style.teamPoints}>{team.points}</span>
                </div>
              ))}
            </div>
            <div className={style.divisionWrapper}>
              <span className={style.divisionTitle}>
                Division: Central, Western Conference
              </span>
              {divisionCentralTeams.map((team) => (
                <div key={team.id} className={style.tableRow}>
                  <span className={style.teamName}>{team.name}</span>
                  <span className={style.gamesPlayed}>{team.gamesPlayed}</span>
                  <span className={style.teamWins}>{team.wins}</span>
                  <span className={style.teamWinsOT}>{team.winsOT}</span>
                  <span className={style.teamLosses}>{team.losses}</span>
                  <span className={style.teamGoalsScored}>{team.goalsScored}</span>
                  <span className={style.teamGoalsAgainst}>{team.goalsAgainst}</span>
                  <span className={style.teamPoints}>{team.points}</span>
                </div>
              ))}
            </div>
            <div className={style.divisionWrapper}>
              <span className={style.divisionTitle}>
                Division: Pacific, Western Conference
              </span>
              {divisionPacificTeams.map((team) => (
                <div key={team.id} className={style.tableRow}>
                  <span className={style.teamName}>{team.name}</span>
                  <span className={style.gamesPlayed}>{team.gamesPlayed}</span>
                  <span className={style.teamWins}>{team.wins}</span>
                  <span className={style.teamWinsOT}>{team.winsOT}</span>
                  <span className={style.teamLosses}>{team.losses}</span>
                  <span className={style.teamGoalsScored}>{team.goalsScored}</span>
                  <span className={style.teamGoalsAgainst}>{team.goalsAgainst}</span>
                  <span className={style.teamPoints}>{team.points}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
