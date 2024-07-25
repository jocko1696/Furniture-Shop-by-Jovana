const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
require('../models/reviewModel');
const mongoose = require("mongoose");
const Review = mongoose.model("Review");


const getReviews= asyncHandler(async (req, res) => {

    try {
        const reviews = await Review.find({});
        console.log(reviews);
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = {
    getReviews,
}