import React from 'react';
import BreadCrumb from "../components/BreadCrumb.jsx";

const Blog = () => {
    return (
        <section className="heroSectionBlog pageSection">
            <div className="overlay-wrapper">
                <div className="centerContainer">
                    <div className="flex flex-col relative z-20 breadcrumb-wrapper">
                        <h1 className="pageHeaderTitle">Blog Page</h1>
                        <BreadCrumb/>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
        </section>
    );
};

export default Blog;