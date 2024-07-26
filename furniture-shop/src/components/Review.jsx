import React from 'react';
import StarRating from "./StarRating.jsx";

const Review = (review) => {
    return (
        <div>
            <img className="pb-[10px]" alt="error" src={review.image}/>
            <p className="pb-[10px] review-name"><strong>{review.name}</strong></p>
            <p className="pb-[5px] text-justify review-desc"> {review.review}</p>
            <StarRating rating={parseFloat(review.rating)}/>
        </div>
    );
};

export default Review;