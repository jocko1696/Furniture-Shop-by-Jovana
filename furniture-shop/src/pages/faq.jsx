import React from 'react';
import BreadCrumb from "../components/BreadCrumb.jsx";
import FAQ from "../components/FAQ.jsx";

const Faq = () => {
    return (
        <section className="heroSectionBlog pageSection">
            <div className="overlay-wrapper">
                <div className="centerContainer">
                    <div className="flex flex-col relative z-20 breadcrumb-wrapper">
                        <h1 className="pageHeaderTitle">FAQ</h1>
                        <BreadCrumb/>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
            <div className="centerContainer blogsContainer">
                <FAQ/>
            </div>
        </section>
    );
};

export default Faq;