import React from 'react';
import BreadCrumb from "../components/BreadCrumb.jsx";
import Blog from "../components/Blog";
import CardSection from "../components/CardSection.jsx";

const Contact = () => {
    return (
        <section className="heroSectionContact pageSection">
            <div className="overlay-wrapper">
                <div className="centerContainer">
                    <div className="flex flex-col relative z-20 breadcrumb-wrapper">
                        <h1 className="pageHeaderTitle">Contact Us</h1>
                        <BreadCrumb/>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
            <Blog />
            <CardSection />
        </section>
    );
};

export default Contact;