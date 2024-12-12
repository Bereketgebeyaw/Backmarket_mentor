import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Add styling as needed

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Dashboard</h2>
            <nav>
                <NavLink to="/" exact activeClassName="active">
                    Home
                </NavLink>
                <NavLink to="/user-management" activeClassName="active">
                    User Management
                </NavLink>
                <NavLink to="/settings" activeClassName="active">
                    Settings
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
