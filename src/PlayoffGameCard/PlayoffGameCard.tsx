import React from 'react';
import style from './PlayoffGameCard.module.css';

interface PlayoffSerieInfo {
  game: any;
}

function PlayoffGameCard({ game }: PlayoffSerieInfo): JSX.Element {
  //   console.log(game);
  return (
    <div>
      {game.currentGame.seriesSummary.gameLabel !== '' ? (
        <div className={style.wrapper}>
          <div className={style.game}>
            <span className={style.team}>
              <span className={style.teamTitle}>{game.names.teamAbbreviationA}</span>
              <span>
                <img
                  className={style.teamLogo}
                  src={`${process.env.PUBLIC_URL}/teams_logo/${game.matchupTeams[0].team.name}.png`}
                  alt="Logo"
                />
              </span>
            </span>
            <span className={style.team}>
              <span className={style.teamTitle}>{game.names.teamAbbreviationB}</span>
              <span>
                <img
                  className={style.teamLogo}
                  src={`${process.env.PUBLIC_URL}/teams_logo/${game.matchupTeams[1].team.name}.png`}
                  alt="Logo"
                />
              </span>
            </span>
          </div>
          {game.currentGame.seriesSummary.seriesStatusShort === '' ? (
            <div className={style.serieStatus}>Series tied 0-0</div>
          ) : (
            <div className={style.serieStatus}>
              {game.currentGame.seriesSummary.seriesStatusShort}
            </div>
          )}
        </div>
      ) : (
        <div className={style.wrapper}>
          <div className={style.game}>
            <span>
              <img
                className={style.teamLogo}
                src={`${process.env.PUBLIC_URL}/teams_logo/nhl_logo.png`}
                alt="Logo"
              />
            </span>
            <span>
              <img
                className={style.teamLogo}
                src={`${process.env.PUBLIC_URL}/teams_logo/nhl_logo.png`}
                alt="Logo"
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayoffGameCard;
