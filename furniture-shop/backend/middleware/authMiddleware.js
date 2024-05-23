//Function that check if user is logged in and based on that does something
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
require("../models/userModel");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const protect = asyncHandler(async (req, res, next) => {
    try {
        //We log in the user using the cookie. We need to access that cookie.
        const token = req.cookies.token;
        if (!token) {
            res.status(401);
            throw  new Error("Not authorized,please login.");
        }

        //Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        //Get user id from the token
        const user = await User.findById(verified.id).select("-password");

        //Validation
        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401);
        throw  new Error("Not authorized, please login");
    }
})


module.exports =
    {
        protect
    }