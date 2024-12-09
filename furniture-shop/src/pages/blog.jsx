import React from 'react';
import BreadCrumb from "../components/BreadCrumb.jsx";
import BlogPage from "../components/BlogPage.jsx";

const Blog = () => {
    return (
        <section className="heroSectionBlog pageSection">
            <div className="overlay-wrapper">
                <div className="centerContainer">
                    <div className="flex flex-col relative z-20 breadcrumb-wrapper">
                        <h1 className="pageHeaderTitle">Blog</h1>
                        <BreadCrumb/>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
            <div className="centerContainer blogsContainer">
                <BlogPage/>
            </div>
        </section>
    );
};

export default Blog;