const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
require('../models/blogModel');
const mongoose = require("mongoose");
const Blog = mongoose.model("Blog");
// const mongoosePaginate = require('mongoose-paginate');

const createBlog = asyncHandler(async (req, res) => {
    const {name, category, description, image, date} = req.body;
    console.log(req.body)

    // Validate required fields
    if (
        !name ||
        !category ||
        category?.[0] === undefined ||
        !description ||
        !image ||
        !date
    ) {
        return res.status(400).json({
            error: "Please fill in all required fields, including at least one category.",
        });
    }

    try {
        const product = new Product({
            name,
            category,
            description,
            image,
            date
        });

        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({error: "Server error while creating product."});
    }
});

const  getBlogs = asyncHandler(async (req, res) => {

    try {
        const blogs = await Blog.find({});
        res.status(200).send(blogs);
        // console.log(products);
    } catch (error) {
        res.status(500).send();
    }
});

const getBlogById = asyncHandler(async (req, res) => {

    try {
        let blogId = req.params.id;
        blogId = blogId.slice(1);

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({message: 'Blog not found'});
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching blog by ID:', error);
        res.status(500).json({message: 'Internal server error'});
    }

});


// Update Blog
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid blog ID" });
    }

    try {
        // Find the blog by ID and update it
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true } // Return the updated document
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the blog
        const blog = await Blog.findByIdAndDelete(id);

        // Check if the product exists
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error. Unable to delete blog." });
    }
});


module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    deleteBlog,
    updateBlog,
}