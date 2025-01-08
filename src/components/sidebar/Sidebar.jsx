import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ role }) => {
    const menuItems = {
        buyer: [
            { name: 'Dashboard', path: '' }, // Match the default route
            { name: 'Orders', path: '/user-dashboard/orders' },
            { name: 'Wishlist', path: '/buyer/wishlist' },
            { name: 'Support', path: '/buyer/support' },
        ],
    };

    return (
        <div style={{ width: '150px', background: '#f4f4f4', padding: '10px' , fontFamily: 'sans-serif' }} >
            <ul style={{ listStyle: 'none', padding: 0 , position:'fixed'}} >
                {menuItems[role]?.map((item, index) => (
                    <li key={index} style={{ marginBottom: '20px' }} >
                        <NavLink
                            to={item.path}
                            style={{ textDecoration: 'none', }}
                            activeStyle={{ fontWeight: 'bold', color: 'blue' }}
                            className='menu'
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
