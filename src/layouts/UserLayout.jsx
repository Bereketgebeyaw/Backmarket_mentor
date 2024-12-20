import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';


const UserLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      
      <Sidebar role="buyer" />
      
    
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
