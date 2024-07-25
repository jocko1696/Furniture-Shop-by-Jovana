const express = require("express");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");
const {protect} = require("./middleware/authMiddleware");
const {registerUser, loginUser, getUser, logout} = require("./controllers/userController");
const { createProduct, getProducts, getProductById,getProductsByParameters } = require("./controllers/productController");
const { getReviews } = require("./controllers/reviewController");


const app = express();
//Include Error Middleware section
app.use(errorHandler);
const PORT = process.env.PORT || 5000;


// Use mongoose to connect this app to  database on mongoDB using the DB_URL (connection string).Connection string is placed in
// .env file in the backend folder
mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    })
    .then(() => {

        //Function that listens if the Server is started
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`);
        })
    })
    .catch((err) => console.log(err))

//Creating MiddleWares
app.use(express.json()); //adding express.json
app.use(cookieParser()); //adding cookieParser which will help us to send and  receive the cookie from the backend
app.use(express.urlencoded({extended: false}));

// const corsOptions ={
//     origin:'http://localhost:5173',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

// app.use(
//     cors()
// );

// app.use(cors({
//     origin: 'http://localhost:5173', // Change this to your frontend URL
//     credentials: true,
// }));


app.use(cors({ origin: true, credentials: true }));


//Routes
// app.use("/api/users", userRoute);

// app.get("/", (req, res) => {
//     res.send("Home page!!!");
// })

app.get("/register", (req, res) => {
    res.send("This is register page!!!");
})

// Route to handle registration
app.post('/register', registerUser);

//Login user
app.post('/login', loginUser);

//Logout user
app.post('/logout', logout);

//Get all the products from database
app.get('/products',getProducts)

//Get single product with id from url from database
app.get('/products/:id',getProductById)

//Get products By parameters
app.get('/productsByParams',getProductsByParameters)

//Get Google Reviews

app.get('/getReviews',getReviews)





