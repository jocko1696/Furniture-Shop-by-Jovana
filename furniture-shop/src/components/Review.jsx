import React from 'react';
import StarRating from "./StarRating.jsx";

const Review = (review) => {
    return (
        <div>
            <img alt="error" src={review.image}/>
            <p><strong>{review.name}</strong>: {review.review}</p>
            <p>Rating: {review.rating} stars</p>
            <StarRating rating={parseFloat(review.rating)}/>
        </div>
    );
};

export default Review;