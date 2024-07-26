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
    let allReviews;
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

    allReviews = reviews.map((review, index) => {
        return <Review
            key={index}
            name={review.name}
            image={review.image}
            review={review.review}
            rating={review.rating}

        />
    })

    console.log(allReviews);

    return (
        <div className="flex items-center flex-col ">
            <h2 className="sectionHeadingText">Our Client Say!</h2>

            <Carousel showDots={true}
                      responsive={responsiveReviews}
                      infinite={true}
                      autoPlay={true}
                      autoPlaySpeed={3000}
                      containerClass="carousel-container w-full overflow-hidden justify-center	"
                      removeArrowOnDeviceType={["superLargeDesktop", "desktop", "tablet", "mobile"]}
                      dotListClass="custom-dot-list-style"
                      itemClass="carousel-item w-full"
                      swipeable={true}
                      draggable={true}
                      renderDotsOutside={false}
                      customDot={<CustomDot/>}
                      centerMode={true}
                      customTransition="transform 300ms ease-in-out"

            >
                {allReviews}
            </Carousel>

        </div>
    );
};

export default Reviews;
