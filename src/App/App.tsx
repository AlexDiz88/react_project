import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import NhlPlayoffs from '../NhlPlayoffs/NhlPlayoffs';
import NhlStats from '../NhlStats/NhlStats';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/nhl-playoff" element={<NhlPlayoffs />} />
        <Route path="/nhl-stats" element={<NhlStats />} />
      </Route>
    </Routes>
  );
}

export default App;
