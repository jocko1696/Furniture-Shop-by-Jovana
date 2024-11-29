const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB order schema
const orderSchema = new mongoose.Schema({
    clientDetails: {
        email: String,
        phone: String,
        firstName: String,
        lastName: String,
        address: String,
        apartment: String,
        city: String,
        country: String,
        postalCode: String,
        paymentMethod: String,
    },
    items: [
        {
            name: String,
            price: Number,
            image:String,
            quantity: Number,

        },
    ],
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);