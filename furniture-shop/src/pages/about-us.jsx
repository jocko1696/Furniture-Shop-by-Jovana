import React, {useEffect, useState} from 'react';
import BreadCrumb from "../components/BreadCrumb.jsx";
import Blog from "../components/Blog";
import CardSection from "../components/CardSection.jsx";
import Reviews from "../components/Reviews.jsx";
import ReviewsPagination from "../components/ReviewsPagination.jsx";

const AboutUs = () => {
    return (
        <section className="heroSectionContact pageSection about-us-page">
            <div className="overlay-wrapper">
                <div className="centerContainer">
                    <div className="flex flex-col relative z-20 breadcrumb-wrapper">
                        <h1 className="pageHeaderTitle">About Us</h1>
                        <BreadCrumb/>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
            <Blog/>
            <CardSection/>
            {/*<div className="contact-section px-[70px] py-[20px]">*/}
            {/*    <div className="centerContainer ">*/}
            {/*        <Reviews/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="contact-section px-[70px] py-[20px] ">
                <div className="centerContainer ">
                    <ReviewsPagination/>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;