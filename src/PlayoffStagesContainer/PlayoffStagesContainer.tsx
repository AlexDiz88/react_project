import React from 'react';
import style from './PlayoffStagesContainer.module.css';
import PlayoffGameCard from '../PlayoffGameCard/PlayoffGameCard';

interface Props {
  stageStyle: string;
  series: any[];
}

function PlayoffStagesContainer({ stageStyle, series }: Props): JSX.Element {
  //   console.log(series);
  return (
    <div className={style.wrapper}>
      {series.map((game) => (
        <div key={game.seriesCode} className={style[stageStyle]}>
          {stageStyle === 'stanleyCupFinal' ? (
            <span className={style.cupImgWrapper}>
              <span className={style.title}>Winner</span>
              <img
                className={style.teamLogo}
                src={`${process.env.PUBLIC_URL}/teams_logo/Vegas Golden Knights.png`}
                alt="Logo"
              />
              <img
                className={style.cupImg}
                src={`${process.env.PUBLIC_URL}/teams_logo/stanley_cup.png`}
                alt="Logo"
              />
            </span>
          ) : (
            <> </>
          )}
          <PlayoffGameCard game={game} />
        </div>
      ))}
    </div>
  );
}

export default PlayoffStagesContainer;
