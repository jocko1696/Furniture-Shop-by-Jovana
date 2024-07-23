const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
require('../models/productModel');
const mongoose = require("mongoose");
//const {ObjectId} = require("mongoose");
const Product = mongoose.model("Product");
// const mongoosePaginate = require('mongoose-paginate');


const createProduct = asyncHandler(async (req, res) => {
    res.send("Correct")
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

    // console.log("U Funkcijiiiiiiiii");

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

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    getProductsByParameters,
}