import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState(""); // Ensure this state is defined

    // Function to fetch blogs with category filter and pagination
    const fetchBlogs = async (page = 1, category = "") => {
        try {
            const { data } = await axios.get("http://localhost:5000/blogs", {
                params: { page, category },
            });

            setBlogs(data.docs);
            setTotalPages(data.totalPages);
            setCurrentPage(data.page);

            // Fetch unique categories from blogs
            if (categories.length === 0) {
                const uniqueCategories = [...new Set(data.docs.flatMap(blog => blog.category))];
                setCategories(uniqueCategories);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    // Initial fetch when the component mounts
    useEffect(() => {
        fetchBlogs(currentPage, category);
    }, [currentPage, category]); // Fetch when page or category changes

    // Handle Next page click
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Handle Previous page click
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <h1>Blog Page</h1>
            {/* Category Filter Dropdown */}
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="">All Categories</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            {/* Blogs List */}
            <div className="blog-list">
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-item">
                        <img src={blog.image[0]} alt={blog.name} />
                        <h2>{blog.name}</h2>
                        <p>{blog.description.slice(0, 100)}...</p>
                        <button onClick={() => window.location.href = `/blog/${blog._id}`}>Read More</button>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default BlogPage;
