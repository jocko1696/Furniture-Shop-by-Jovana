import React, {useEffect, useState} from 'react';
import StarRating from "./StarRating.jsx";
import Carousel from 'react-multi-carousel';
import CustomDot from "./CustomDot.jsx";
import 'react-multi-carousel/lib/styles.css';
import {responsiveReviews} from "../data/responsiveReviews";
import Review from "./Review.jsx";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    /******************GET REVIEWS FROM DATABASE***********************/

    useEffect(() => {
        fetch('http://localhost:5000/getReviews',)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setReviews(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    let allReviews = reviews.map((review, index) => {
        return <Review
            key={index}
            name={review.name}
            image={review.image}
            review={review.review}
            rating={review.rating}

        />
    })

    return (
        <div className="flex items-center">
            <h2>Our Client Say!</h2>

            <Carousel showDots={true}
                      responsive={responsiveReviews}
                      infinite={true}
                    // autoPlay={true}
                      autoPlaySpeed={3000}
                      customTransition="all .5"
                      transitionDuration={500}
                      containerClass="carousel-container"
                      removeArrowOnDeviceType={["superLargeDesktop", "desktop", "tablet", "mobile"]}
                      dotListClass="custom-dot-list-style"
                      itemClass="carousel-item-padding-40-px"
                      swipeable={true}
                      draggable={false}
                      renderDotsOutside={false}
                      customDot={<CustomDot/>}
            >
                {allReviews}
            </Carousel>
        </div>
    );
};

export default Reviews;
