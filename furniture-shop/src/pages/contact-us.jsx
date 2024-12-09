import React, {useEffect, useState} from 'react';
import BreadCrumb from "../components/BreadCrumb.jsx";
import Blog from "../components/Blog";
import CardSection from "../components/CardSection.jsx";
import ContactComponent from "../components/ContactComponent.jsx";

const Contact = () => {

    return (
        <section className="heroSectionContact pageSection contact-page">
            <div className="overlay-wrapper">
                <div className="centerContainer">
                    <div className="flex flex-col relative z-20 breadcrumb-wrapper">
                        <h1 className="pageHeaderTitle">Contact Us</h1>
                        <BreadCrumb/>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
            {/*<Blog/>*/}
            {/*<CardSection/>*/}
           <div className="centerContainer contactPageSection">
               <ContactComponent />
           </div>

        </section>
    );
};

export default Contact;