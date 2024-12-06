const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // this library will help us to secure password
require("../models/userModel");
const mongoose = require("mongoose");
const User = mongoose.model("users");


//Generating the JSON Webtoken.
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,
        {
            expiresIn: "1d" //if user logins after one day login session will be expired
        }
    )
}

//Register User
const registerUser = asyncHandler(async (req, res) => {


    console.log("U funkciji za registraciju!")
    const {
        email,
        password,
        role,
        photo,
        firstName,
        lastName,
        street,
        streetNumber,
        postalCode,
        city,
        phone
    } = req.body;

    // //Validation of the information that we'we got from request body
    // if (!email || !password || !role || !photo || !firstName || !lastName || !street || !address || !streetNumber || !postalCode || !city || !phone) {
    //     res.status(400); //Bad request if any of the parametars is missing in the response
    //     throw newError("Please fill in all required fields");
    // }
    //
    // //Also need the check the length of the password
    // if (password.length < 6) {
    //     res.status(400);
    //     throw newError("Password must be up to 6 characters");
    // }


    //Validation if the email of the registered user is unique and we don't already have it in the databse
    // const userExists = await User.findOne({email: email});
    // if (userExists) {
    //     res.status(400);
    //     throw newError("User has already been registered! ");
    // }

    const userExists = await User.findOne({email: email});
    if (userExists) {
        res.status(409).json({message: "User already exists!"});
    } else {
        // Register the user in the database
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            street: req.body.street,
            streetNumber: req.body.streetNumber,
            postalCode: req.body.postalCode,
            city: req.body.city,
            photo: req.body.photo,
            phone: req.body.phone,
            role: req.body.role,
        })


        //Generate token
        //We are generating token with the id of the current user.Doing this in registration,when user is registered he will automatically be signed in
        const token = generateToken(user._id); //reference token for user on cookie
        console.log(token);
        if (user) { //if user is created send token to frontend
            const {_id, email, role} = user;
            // Assign JWT to cookie
            res.cookie("token", token, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400),
                secure:true,
                sameSite:'none',
            });

            res.status(201).json({
                success: true,
                message: 'User registered successfully!',
                data: {
                    id: _id,
                    email: email,
                    role: role,
                    token: token,
                },
            });

        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    }


});

//Method for login user
const loginUser = asyncHandler(async (req, res) => {
    // console.log("U funkciji za login usera!");
    const {email, password} = req.body;

    //Validate Request
    if (!email || !password) {
        res.status(400);
        throw  new Error("Please add email and password.");
    }

    //Check if user exists, and if user exists check if password is correct
    const user = await User.findOne({email: email});
    if (!user) {
        res.status(400);
        throw new Error("User not exist.");

    }
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    //Generate token
    const token = generateToken(user._id);
    console.log(token);
    if (user && passwordIsCorrect) {

        //Delete the password so the password is not visible
        const newUser = await User.findOne({email: email}).select("-password");

        // Assign JWT to cookie
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            secure:true,
            sameSite:'none',
        });


        res.status(201).json({
            success: true,
            message: 'User successfully logged in!',
            data: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role,
                token: token,
                isAdmin: newUser.role === "admin", // Check if the user is an admin
            },
        });

        console.log("User logged in");
    } else {
        res.status(400);
        throw new Error("Invalid email or password.");
    }


})

//Logout
const logout = asyncHandler(async (req, res) => {

    console.log("Logged out");
    //Sending empty token
    // res.cookie("token", "none", {
    //     path: "/",
    //     httpOnly: true,
    //     expires: new Date(0),
    //     // secure:true,
    //     // sameSite: 'none',
    // });

    res.cookie('token', '', { httpOnly: true, maxAge: 0 });


    res.status(200).json(
        {
            message: "User is successfully logged out!",
        }
    )


})

//Get User data
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
        res.status(201).json(user);
    } else {
        res.status(400);
        throw new Error("User Not Found");
    }
})

//Get Login Status
const getLoginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false);
    }

    //Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
        res.json(true);
    } else {
        res.json(false);
    }


})


module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    getLoginStatus
}