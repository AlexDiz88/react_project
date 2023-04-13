import React from 'react';
import style from './Home.module.css';
import GameListContainer from '../GameListContainer/GameListContainer';

function Home(): JSX.Element {
  return (
    <div className={style.pageWrapper}>
      <GameListContainer />
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
