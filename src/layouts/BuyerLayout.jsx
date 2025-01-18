import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';  // Import the Sidebar component

const BuyerLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar role="buyer" /> {/* Sidebar component with the role as "buyer" */}
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet />  {/* This renders the child routes (like Wishlist) */}
      </div>
    </div>
  );
};

export default BuyerLayout;
