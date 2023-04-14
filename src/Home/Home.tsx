import React from 'react';
import style from './Home.module.css';
import GameListContainer from '../GameListContainer/GameListContainer';

function Home(): JSX.Element {
  return (
    <div className={style.wrapper}>
      <GameListContainer />
    </div>
  );
}

export default Home;
