import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Layout(): JSX.Element {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
