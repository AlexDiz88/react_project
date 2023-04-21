import React, { useEffect, useState } from 'react';
import style from './PlayoffContainer.module.css';
import PlayoffStagesContainer from '../PlayoffStagesContainer/PlayoffStagesContainer';

function PlayoffContainer(): JSX.Element {
  const [series1, setSeries1] = useState<any[]>([]);
  const [series2, setSeries2] = useState<any[]>([]);
  const [series3, setSeries3] = useState<any[]>([]);
  const [series4, setSeries4] = useState<any[]>([]);
  const [series5, setSeries5] = useState<any[]>([]);
  const [series6, setSeries6] = useState<any[]>([]);
  const [series7, setSeries7] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    async function getPlayoffStandings(): Promise<void> {
      const response = await fetch(
        'https://statsapi.web.nhl.com/api/v1/tournaments/playoffs?expand=round.series,schedule.game.seriesSummary&season=20222023'
      );
      const data = await response.json();
      // console.log(data);
      setSeries1([
        data.rounds[0].series[6],
        data.rounds[0].series[7],
        data.rounds[0].series[4],
        data.rounds[0].series[5],
      ]);

      setSeries2([
        data.rounds[0].series[0],
        data.rounds[0].series[1],
        data.rounds[0].series[2],
        data.rounds[0].series[3],
      ]);

      setSeries3([data.rounds[1].series[0], data.rounds[1].series[1]]);
      setSeries4([data.rounds[1].series[2], data.rounds[1].series[3]]);

      setSeries5([data.rounds[2].series[0]]);
      setSeries6([data.rounds[2].series[1]]);

      setSeries7([data.rounds[3].series[0]]);
      //  console.log(series2);
    }
    setIsLoaded(true);
    getPlayoffStandings();
  }, []);

  return (
    <div>
      {isLoaded ? (
        <div className={style.wrapper}>
          <div className={style.title}>NHL Playoffs 2023</div>
          <div className={style.stageWrapper}>
            <PlayoffStagesContainer stageStyle="firstRound" series={series1} />
            <PlayoffStagesContainer stageStyle="secondRound" series={series3} />
            <PlayoffStagesContainer stageStyle="conferenceFinal" series={series5} />
            <PlayoffStagesContainer stageStyle="stanleyCupFinal" series={series7} />
            <PlayoffStagesContainer stageStyle="conferenceFinal" series={series6} />
            <PlayoffStagesContainer stageStyle="secondRound" series={series4} />
            <PlayoffStagesContainer stageStyle="firstRound" series={series2} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default PlayoffContainer;
