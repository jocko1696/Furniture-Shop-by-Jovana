const express = require("express");
// const http = require('http');
// const socketIo = require('socket.io');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.SK_TEST_SECRET_KEY); // Replace with your Stripe secret key
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");
const {protect} = require("./middleware/authMiddleware");
const {registerUser, loginUser, getUser, logout} = require("./controllers/userController");
const { createProduct, getProducts, getProductById,getProductsByParameters } = require("./controllers/productController");
const { getReviews } = require("./controllers/reviewController");
const {getAllContacts,writeContact} = require("./controllers/contactController");
const{  addProductToCart, getAllProductsFromCart, deleteCart, deleteProductFromCart,calculateTotalPrice,cartUpdated }=require("./controllers/cartController");





const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);  // Initialize Socket.IO
const PORT = process.env.PORT || 5000;
//Include Error Middleware section
app.use(errorHandler);

// const io = socketIo(server, {
//     cors: {
//         origin: "http://localhost:3000", // Replace with your frontend URL
//         methods: ["GET", "POST", "DELETE"]
//     }
// });
// app.use(express.json());

// Middleware to add `io` to every request
// app.use((req, res, next) => {
//     req.io = io;
//     next();
// });


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

// Example event listener for Socket.io connections
// io.on('connection', (socket) => {
//     console.log('New client connected:', socket.id);
//
//     socket.on('disconnect', () => {
//         console.log('Client disconnected:', socket.id);
//     });
// });

//Creating MiddleWares
app.use(express.json()); //adding express.json
app.use(cookieParser()); //adding cookieParser which will help us to send and  receive the cookie from the backend
app.use(express.urlencoded({extended: false}));



app.use(cors({ origin: true, credentials: true }));


app.post("/create-checkout-session", async (req, res) => {
    //console.log(req.body);
    //const { orderData } = req.body;
    const { items, clientDetails } = req.body; // Items + client data from frontend

    if (!items || !clientDetails) {
        return res.status(400).json({ error: "Missing items or client details" });
    }
    console.log(items);
    console.log(clientDetails);

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: items.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100, // Convert price to cents
                },
                quantity: item.quantity,
            })),
            customer_email: clientDetails.email, // Send client's email
            success_url: "http://localhost:5173/order-completed",
            // cancel_url: "http://localhost:5173/cancel",
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: error.message });
    }
});

app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const payload = req.body;
    const sig = req.headers["stripe-signature"];
    const endpointSecret = "your-webhook-secret";

    try {
        const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            // Save client and payment details to the database
            const clientData = {
                email: session.customer_email,
                amount_total: session.amount_total / 100, // Convert back to dollars
            };

            console.log("Client data to save:", clientData);

            // Insert into database (replace with your DB code)
            // await database.collection('clients').insertOne(clientData);

            res.status(200).json({ received: true });
        }
    } catch (err) {
        console.error("Webhook Error:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
});


app.listen(4242, () => console.log("Server running on port 4242"));
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

//Write contact in database
app.post('/writeContact', writeContact);

/////CART //////////

//Add product to cart
app.post('/addProductToCart', addProductToCart);

//Get products from cart
app.get('/getAllProductsFromCart',getAllProductsFromCart);

app.delete('/deleteProductFromCart/:id',deleteProductFromCart);

// Route for calculating total price of items in the cart
app.get('/totalPrice', calculateTotalPrice);

//Listen if there is a change happened on cart collection
//  app.listen('/cartUpdated',cartUpdated);






