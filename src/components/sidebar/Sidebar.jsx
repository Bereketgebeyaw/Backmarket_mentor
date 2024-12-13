import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ role }) => {
    const menuItems = {
        buyer: [
            { name: 'Dashboard', path: '/buyer' }, // Match the default route
            { name: 'Orders', path: '/buyer/orders' },
            { name: 'Wishlist', path: '/buyer/wishlist' },
            { name: 'Support', path: '/buyer/support' },
        ],
    };

    return (
        <div style={{ width: '200px', background: '#f4f4f4', padding: '10px' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {menuItems[role]?.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <NavLink
                            to={item.path}
                            style={{ textDecoration: 'none', color: 'black' }}
                            activeStyle={{ fontWeight: 'bold', color: 'blue' }}
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
