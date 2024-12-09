import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BreadCrumb from "./BreadCrumb.jsx";

const SingleBlogPage = () => {
    const { id } = useParams(); // Get the blog ID from the URL
    const [blog, setBlog] = useState(null);

    // Fetch the single blog by its ID
    const fetchBlogById = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/blogs/${id}`);
            setBlog(data);
        } catch (error) {
            console.error("Error fetching blog by ID:", error);
        }
    };

    useEffect(() => {
        fetchBlogById();
    }, [id]); // Re-run the effect if the ID changes

    if (!blog) {
        return <div>Loading...</div>; // Render loading message while the data is being fetched
    }

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

            <div className="max-w-7xl mx-auto px-4 py-8 centerContainer blogSingleContainer">

                {/* Blog Image */}
                <div className="relative mb-8">
                    <img
                        src={blog.image[0]}
                        alt={blog.name}
                        className="w-full h-96 object-cover rounded-lg"
                    />
                </div>
                {/*Blog Name*/}
                <h1 className="text-4xl font-bold text-left mb-8">{blog.name}</h1>
                {/* Blog Content */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {(Array.isArray(blog.category) ? blog.category : [blog.category]).map((cat, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full"
                            >
                            {cat}
                        </span>
                        ))}
                    </div>

                    {/* Date */}
                    <span className="text-sm text-gray-500 mb-4 block">
                    {new Date(blog.date).toLocaleDateString()}
                </span>

                    {/* Blog Description */}
                    <p className="text-gray-600 text-lg">{blog.description}</p>
                </div>

                {/* Back to Blogs Link */}
                <div className="mt-8 text-center">
                    <a href="/blog" className="text-purple-600 hover:underline">
                        Back to Blogs
                    </a>
                </div>
            </div>
        </section>

    );
};

export default SingleBlogPage;
