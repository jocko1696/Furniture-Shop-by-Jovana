import React from 'react';

const Blog = () => {
    return (
        <div className="centerContainer blogContainer grid grid-cols-2 gap-[40px] md:flex md:flex-col md:items-center">
            <div className="blog-picture-wrapper">
                <img alt="Error while loading photo" src="https://i.ibb.co/VM96g56/contact-us.png"/>
            </div>
            <div className="blog-info-wrapper flex flex-col">
                <h1 className="pb-[40px]">Know About Our Ecomerce
                    Business, History</h1>
                <p className="pb-[40px] text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices
                    mattis aliquam,
                    malesuada diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
                    vitae lobortis quis bibendum quam.</p>
                <div className="md:flex md:items-center md:justify-center"><a href="/contact-us" target="_self" className="contactUs pl-[40px] pr-[40px] pt-[11px] pb-[11px] text-center">Contact us</a>
                </div>

            </div>
        </div>
    );
};

export default Blog;