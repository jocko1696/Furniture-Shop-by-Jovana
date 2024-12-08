const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
require('../models/productModel');
const mongoose = require("mongoose");
//const {ObjectId} = require("mongoose");
const Product = mongoose.model("Product");
// const mongoosePaginate = require('mongoose-paginate');


const createProduct = asyncHandler(async (req, res) => {
    const { name, price, sale, category, quantity, sold, description, image, code, tags } = req.body;
    console.log(req.body)

    // Validate required fields
    if (
        !name ||
        !price ||
        !category ||
        category?.[0] === undefined ||
        !quantity ||
        !description ||
        !code ||
        !tags ||
        tags?.[0] === undefined
    ) {
        return res.status(400).json({
            error: "Please fill in all required fields, including at least one category and tag.",
        });
    }

    try {
        const product = new Product({
            name,
            price,
            sale,
            category,
            quantity,
            sold,
            description,
            image,
            code,
            tags,
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: "Server error while creating product." });
    }
});



const getProducts = asyncHandler(async (req, res) => {

    try {
        const products = await Product.find({});
        res.status(200).send(products);
        // console.log(products);
    } catch (error) {
        res.status(500).send();
    }
});

const getProductById = asyncHandler(async (req, res) => {

    try {
        let productId = req.params.id;
        productId = productId.slice(1);

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({message: 'Internal server error'});
    }

});

const getProductsByParameters = asyncHandler(async (req, res) => {

    try {
        const {categories, page, limit = '10', search} = req.query;
        let filter = {};
        let query = {};

        // console.log("Kategorije:"+categories + ", Stranica:" + page + " , Limit: " + limit + " Pretraga: " + search);
        console.log(categories);
        console.log(categories.split(','));
        if (categories) {
            filter = {"category": {$in: categories.split(',')}};
            console.log("Filter je: " + JSON.stringify(filter.categories));
        }


        if (search) {
            query = {$text: {$search: search, $caseSensitive: false}};

        }


        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
        };
        // console.log("Query je: " + query.text);
        // console.log("Filter je : " + filter);
        const products = await Product.paginate({...filter, ...query}, options);

        res.status(200).json(products);
        // console.log(query);


    } catch (error) {
        res.status(500).json({message: error.message});
    }

});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Find and delete the product
        const product = await Product.findByIdAndDelete(id);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error. Unable to delete product." });
    }
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    getProductsByParameters,
    deleteProduct,
    updateProduct,
}