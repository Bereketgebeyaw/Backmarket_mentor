import React from 'react';
import { Outlet } from 'react-router-dom';


const BuyerLayout = () => {
  return (
    
    
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </div>
   
  );
};

export default BuyerLayout;
