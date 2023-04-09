import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Navbar.module.css';
import logo from './Logo-NHL.svg';

function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const btnNavHome = (): void => navigate('/');
  const btnNavPlayoffs = (): void => navigate('/nhl-playoff');
  const btnNavStandings = (): void => navigate('/nhl-standings');
  const btnNavStats = (): void => navigate('/nhl-stats');
  return (
    <div className={style.wrapper}>
      <img className={style.logo} src={logo} alt="" />
      <button type="button" onClick={btnNavHome}>
        Home
      </button>
      <button type="button" onClick={btnNavPlayoffs}>
        Playoffs
      </button>
      <button type="button" onClick={btnNavStandings}>
        Standings
      </button>
      <button type="button" onClick={btnNavStats}>
        Stats
      </button>
    </div>
  );
}

export default Navbar;
