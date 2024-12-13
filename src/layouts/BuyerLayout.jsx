import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import TopBar from '../components/TopBar/TopBar';

const BuyerLayout = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar role="buyer" />
            <div style={{ flex: 1 }}>
                <TopBar />
                <div style={{ padding: '20px' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default BuyerLayout;
