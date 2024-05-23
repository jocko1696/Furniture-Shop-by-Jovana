import React from 'react';
import BreadCrumb from "../components/BreadCrumb.jsx";

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
        </section>
    );
};

export default Contact;