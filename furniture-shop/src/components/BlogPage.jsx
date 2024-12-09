import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("");

    const fetchBlogs = async (page = 1, category = "") => {
        try {
            const { data } = await axios.get("http://localhost:5000/blogs", {
                params: { page, category },
            });

            setBlogs(data.docs);
            setTotalPages(data.totalPages);
            setCurrentPage(data.page);

            if (categories.length === 0) {
                const uniqueCategories = [...new Set(data.docs.flatMap(blog => blog.category))];
                setCategories(uniqueCategories);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fetchBlogs(currentPage, category);
    }, [currentPage, category]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Blog Page</h1>

            {/* Category Filter Dropdown */}
            <div className="mb-6 flex justify-center">
                <select
                    className="border rounded-lg p-2 bg-gray-100"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                >
                    <option value="">All Categories</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden w-full group"
                    >
                        <div className="relative">
                            {/* Wrap the image with a Link */}
                            <Link to={`/blog/${blog._id}`} className="block">
                                <img
                                    src={blog.image[0]}
                                    alt={blog.name}
                                    className="w-full h-64 object-cover rounded-t-lg transition-transform transform group-hover:scale-105 duration-500"
                                />
                                {/* Image Overlay */}
                                <div className="absolute inset-0 bg-pink-600 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                            </Link>
                        </div>
                        <div className="p-4">
                            <div className="flex flex-wrap gap-2 mb-2">
                                {/* Loop through categories and display each in its own bubble */}
                                {(Array.isArray(blog.category) ? blog.category : [blog.category]).map((cat, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full opacity-80"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>

                            {/* Date Display */}
                            <span className="text-sm text-gray-500 mb-3 block">
                                {new Date(blog.date).toLocaleDateString()}
                            </span>

                            {/* Wrap the blog name with a Link */}
                            <Link to={`/blog/${blog._id}`} className="text-xl font-semibold mb-3 group-hover:text-pink-600 transition-colors duration-300">
                                {blog.name}
                            </Link>
                            <p className="text-gray-600">
                                {blog.description.slice(0, 100)}...
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination mt-8 flex justify-center space-x-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
                >
                    Prev
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BlogPage;
