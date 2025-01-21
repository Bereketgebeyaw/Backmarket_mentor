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

        <div style={{ width: '150px', background: '#f4f4f4', padding: '10px' , fontFamily: 'sans-serif',  }} >
            <ul style={{ listStyle: 'none', padding: 0 , position:'fixed', marginTop: '-2rem',}} >
                {menuItems[role]?.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' , marginTop: '3rem', width: "1px"}} >
                        <NavLink
                            to={item.path}
                            style={{ textDecoration: 'none', }}
                            activeStyle={{ fontWeight: 'bold', color: 'blue' ,  }}
                            className='menub'
x
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
