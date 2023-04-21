import React from 'react';
import style from './NhlPlayoffs.module.css';
import PlayoffContainer from '../PlayoffContainer/PlayoffContainer';

function NhlPlayoffs(): JSX.Element {
  return (
    <div className={style.wrapper}>
      <PlayoffContainer />
    </div>
  );
}

export default NhlPlayoffs;
