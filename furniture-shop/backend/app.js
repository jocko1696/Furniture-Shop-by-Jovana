const express = require("express");
const app = express();
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require('fs');
app.use(cors());
app.use(bodyParser.json())

const JWT_SECRET = "jhdgfasoirnfnkfririrjrj67125621525jkfjkfjkčldsčl0'5095409jkjnsxnbjkwuheuje";
const mongoURL = "mongodb+srv://administrator:Uy5hujt3whANZTpl@cluster0.o4git9b.mongodb.net/?retryWrites=true&w=majority";


// Use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
mongoose.connect(
    mongoURL,
    {
        //   these are options to ensure that the connection is done properly
        useNewUrlParser: true,

    }
)
    .then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
    });


//Function that listens if the Server is started
app.listen(5000, () => {
    console.log("Server started");
})

//Create products Schema in Mongo DB
require("./models/productsModel");
const Products = mongoose.model("products");

const data = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));


//Function for importing data into products collection
const importData = async () => {
    try {
        await Products.create(data)
        console.log('data successfully imported')
        // to exit the process
        process.exit()
    } catch (error) {
        console.log('error while importing data', error)
    }
}

//Insert data into products collection if the collection is empty
mongoose.connection.collection('products').count(function (err, count) {
    console.dir(err);
    console.dir(count);

    if (count === 0) {
        console.log("No Found Records.");
        importData();
    } else {
        console.log("Found Records : " + count);
    }
});


//Create collection in Mongo database called users
require("./models/userModel");
const User = mongoose.model("users");

//Register user into MongoDB
app.post("/register", async (req, res) => {


    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    try {

        const oldUser = await User.findOne({email: req.body.email});
        if (oldUser) {
            return res.json({error: "User exists"});
        }

        await User.create({
                email: req.body.email,
                password: encryptedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                street: req.body.street,
                streetNumber: req.body.streetNumber,
                postalCode: req.body.postalCode,
            }
        );

        res.send({status: "ok"});
    } catch (error) {
        res.send({status: "error"});

    }


});


//Login user. Authenticate if user exists and proceed the login logic.
app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({email});
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({}, JWT_SECRET);

        if (res.status(201)) {
            return res.json({status: "ok", data: token});
        } else {
            return res.json({status: "error", error: "error"});
        }
    }

    res.json({status: "error", error: "Invalid password"});
});


//Get the name of the selected product type from the client
app.post("/getProducts", async (req, res) => {

    const productType = req.body.id;
    console.log(productType);


    // Don't forget the try/catch block if you use Async/Await!
    try {
        // Retrieve data from your source
        const importantData = await Products.find({'type': productType});
        console.log("Important Data found! ", importantData)

        //Send collected data from Node.js to React.js
        // app.get('/api/data', (req, res) => {

        // Send the data as a JSON response
        res.json(importantData);
        // });

    } catch (exception) {
        console.log(exception)
    }

});





//////////Section for Google reviews///////////////

//Create review Schema in Mongo DB
require("./models/reviewModel");
const Review = mongoose.model("Review");
const review_data = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));


//Function for importing data into reviews collection
const importReviewData = async () => {
    try {
        await Review.create(review_data)
        console.log('review data successfully imported')
        // to exit the process
        process.exit()
    } catch (error) {
        console.log('error while importing review data', error)
    }
}

//Insert review data into products collection if the collection is empty
mongoose.connection.collection('reviews').count(function (err, count) {
    console.dir(err);
    console.dir(count);

    if (count === 0) {
        console.log("No Found Review Records.");
        importReviewData();
    } else {
        console.log("Found Review Records : " + count);
    }
});




