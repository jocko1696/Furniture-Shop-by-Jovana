const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const errorHandler = require("./middleware/errorMiddleware");
const {protect} = require("./middleware/authMiddleware");
const {registerUser, loginUser, getUser, logout} = require("./controllers/userController");
const {
    createProduct,
    getProducts,
    getProductById,
    getProductsByParameters,
    deleteProduct,
    updateProduct
} = require("./controllers/productController");
const {getReviews} = require("./controllers/reviewController");
const {getAllContacts, writeContact} = require("./controllers/contactController");
const {
    addProductToCart,
    getAllProductsFromCart,
    deleteCart,
    deleteProductFromCart,
    calculateTotalPrice,
    cartUpdated
} = require("./controllers/cartController");
const {stripeCheckout, createOrder, sendOrderEmails} = require("./controllers/ordersController");
const {
    createBlog,
    getBlogs,
    getBlogById,
    deleteBlog,
    updateBlog,
    getBlogsByParameters
} = require ("./controllers/blogController");


const app = express();
const PORT = process.env.PORT || 5000;

//Include Error Middleware section
app.use(errorHandler);


// Use mongoose to connect this app to  database on mongoDB using the DB_URL (connection string).Connection string is placed in
// .env file in the backend folder

mongoose
    .connect(process.env.MONGO_URL, {
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

app.use(cors({origin: true, credentials: true}));

app.post("/create-checkout-session", stripeCheckout);
app.post("/create-order", createOrder);

// app.listen(4242, () => console.log("Server running on port 4242"));
app.get("/register", (req, res) => {
    res.send("This is register page!!!");
})

// Route to handle registration
app.post('/register', registerUser);

//Login user
app.post('/login', loginUser);

//Logout user
app.post('/logout', logout);

//create products in database
app.post("/createProducts", createProduct);

//Get all the products from database
app.get('/products', getProducts)

//Get single product with id from url from database
app.get('/products/:id', getProductById)

//Get products By parameters
app.get('/productsByParams', getProductsByParameters)

app.delete('/deleteProduct/:id', deleteProduct);

app.put("/updateProduct/:id", updateProduct);


/////REVIEWS//////////////

//Get Google Reviews
app.get('/getReviews', getReviews)

//Write contact in database
app.post('/writeContact', writeContact);

/////CART //////////

//Add product to cart
app.post('/addProductToCart', addProductToCart);

//Get products from cart
app.get('/getAllProductsFromCart', getAllProductsFromCart);

app.delete('/deleteProductFromCart/:id', deleteProductFromCart);

//Delete all products from cart
app.delete('/clearCart', deleteCart);

// Route for calculating total price of items in the cart
app.get('/totalPrice', calculateTotalPrice);

//Listen if there is a change happened on cart collection
//  app.listen('/cartUpdated',cartUpdated);

//Get all blogs
app.get("/blogs", getBlogsByParameters);
//Get blog by id
app.get("/blogs/:id", getBlogById);






