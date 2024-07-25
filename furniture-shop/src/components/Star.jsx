import React from 'react';

const Star = ({ filled }) => {
    return (
        <span style={{ color: filled ? 'yellow' : 'gray', fontSize: '24px' }}>
            ★
        </span>
    );
};

export default Star;