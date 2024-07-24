import React from 'react';

const Blog = () => {
    return (
        <div className="centerContainer grid grid-cols-2 gap-[40px] md:flex md:flex-col">
            <div className="blog-picture-wrapper"></div>
            <div className="blog-info-wrapper flex flex-col">
                <h1>Know About Our Ecomerce
                    Business, History</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam,
                    malesuada diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
                    vitae lobortis quis bibendum quam.</p>
                <a href="#footer">Contact us</a>
            </div>
        </div>
    );
};

export default Blog;