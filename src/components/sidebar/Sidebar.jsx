import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ role }) => {
    const menuItems = {
        buyer: [
            { name: 'Dashboard', path: '/user-dashboard' },
            { name: 'Orders', path: '/user-dashboard/orders' },
            { name: 'Wishlist', path: '/user-dashboard/wishlist' },
            { name: 'Support', path: '/buyer/support' },
        ],
    };

    return (
        <div style={{ width: '200px', background: '#f4f4f4', padding: '20px', fontFamily: 'sans-serif' }}>
            <ul style={{ listStyle: 'none', padding: 0, position: 'fixed' }}>
                {menuItems[role]?.map((item, index) => (
                    <li key={index} style={{ marginBottom: '20px' }}>
                        <NavLink
                            to={item.path}
                            style={({ isActive }) => ({
                                textDecoration: 'none',
                                fontWeight: isActive ? 'bold' : 'normal',
                                color: isActive ? 'blue' : 'black',
                            })}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
