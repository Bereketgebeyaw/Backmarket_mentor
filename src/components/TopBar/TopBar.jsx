import React from 'react';
import './TopBar.css';

const TopBar = () => {
    return (
        <div className="topbar">
            <div className="topbar-left">
                <h1>Dashboard</h1>
            </div>
            <div className="topbar-right">
                <span>Admin</span>
                <button>Logout</button>
            </div>
        </div>
    );
};

export default TopBar;
