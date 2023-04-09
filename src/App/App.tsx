import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import NhlPlayoffs from '../NhlPlayoffs/NhlPlayoffs';
import NhlStats from '../NhlStats/NhlStats';
import NhlStandings from '../NhlStandings/NhlStandings';

function App(): JSX.Element {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/nhl-playoff" element={<NhlPlayoffs />} />
          <Route path="/nhl-standings" element={<NhlStandings />} />
          <Route path="/nhl-stats" element={<NhlStats />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
