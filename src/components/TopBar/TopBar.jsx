import React from 'react';

const TopBar = () => {
    return (
        <div
            style={{
                height: '60px',
                background: '#333',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
            }}
        >
            <h2>Buyer Dashboard</h2>
        </div>
    );
};

export default TopBar;
