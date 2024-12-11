const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs') // this library will help us to secure password
require("../models/userModel");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const rsa = require("../utilis/rsa");
// const JSEncrypt = require("jsencrypt"); // Ensure you have the package for decryption


//Generating the JSON Webtoken.
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,
        {
            expiresIn: "1d" //if user logins after one day login session will be expired
        }
    )
}


// Decrypt Data
const decryptData = (encryptedData) => {
    try {
        // Ensure the encrypted data is in the correct format (base64 encoded)
        if (!encryptedData) throw new Error("Encrypted data is required");

        // Decrypt using the private key (this will decrypt to a UTF-8 string)
        const decrypted = rsa.private.decrypt(encryptedData, 'utf8');
        return decrypted;
    } catch (error) {
        throw new Error("Invalid encrypted data: " + error.message);
    }
};


const registerUser = asyncHandler(async (req, res) => {
    const { encryptedPassword, ...userData } = req.body;

    if (!encryptedPassword) {
        res.status(400).json({ message: "Encrypted password is required!" });
        return;
    }

    try {
        // Decrypt the password
        const decryptedPassword = decryptData(encryptedPassword);
        console.log("Decrypted password during registration:", decryptedPassword);
        /*******************************************************************************************/
        /*Please keep on mind that userModel considers hashing, so when you save your password decrypted it will be hashed as the part of
        the model. Code above will done hashing two times, and then bycript.compare() would always return false*/

        // // Hash the decrypted password
        // const hashedPassword = await bcrypt.hash(decryptedPassword, 10);
        // console.log("Hashed password during registration:", hashedPassword);

        /*******************************************************************************************/

        // Check if user already exists
        const userExists = await User.findOne({ email: userData.email });
        if (userExists) {
            res.status(409).json({ message: "User already exists!" });
            return;
        }

        // Create the user with the hashed password
        const user = await User.create({ ...userData, password: decryptedPassword });

        if (user) {
            // Generate JWT token
            const token = generateToken(user._id);

            res.cookie("token", token, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "none",
                expires: new Date(Date.now() + 1000 * 86400), // 1 day
            });

            res.status(201).json({
                success: true,
                message: "User registered successfully!",
                data: {
                    token,
                    id: user._id,
                    email: user.email,
                    role: user.role,
                },
            });
        } else {
            res.status(400).json({ message: "Invalid user data!" });
        }
    } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});



// Login User

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, encryptedPassword } = req.body;
    console.log("Enkriptovani pass: " + encryptedPassword);

    try {
        console.log("Login attempt:", { email });

        // Decrypt the password from the client
        const decryptedPassword = decryptData(encryptedPassword);
        console.log("Decrypted password:", decryptedPassword.trim());

        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found.");
        }

        console.log("Korisnički password:"+ user.password.trim());
        // Compare the decrypted password with the stored hashed password

        try {
            var isPasswordCorrect = await bcrypt.compare(decryptedPassword.trim(), user.password.trim());

            if (isPasswordCorrect) {
                console.log("Password match");
            } else {
                console.log("Password does not match");
            }
        } catch (err) {
            console.error("Error comparing passwords", err);
        }
        console.log("Direct bcrypt comparison result:", isPasswordCorrect);

        if (!isPasswordCorrect) {
            throw new Error("Invalid email or password.");
        }

        // Generate token
        const token = generateToken(user._id);

        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
        });

        res.status(200).json({
            success: true,
            message: "Login successful!",
            data: {
                id: user._id,
                email: user.email,
                role: user.role,
                token,
            },
        });
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ message: error.message });
    }
});


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