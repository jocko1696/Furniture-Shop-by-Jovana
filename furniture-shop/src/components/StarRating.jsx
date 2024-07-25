import React, { useState } from 'react';
import Star from './Star';

const StarRating = ({ rating, totalStars = 5 }) => {
    return (
        <div>
            {Array.from({ length: totalStars }, (_, index) => (
                <Star key={index} filled={index < rating} />
            ))}
        </div>
    );
};

export default StarRating;