const asyncHandler = require("express-async-handler");
const express = require("express");
require("../models/cartModel");
const mongoose = require("mongoose");
const CartItem = mongoose.model("CartModel");



// const addProductToCart = asyncHandler(async (req, res) => {
//
//     console.log('Dodavanje itema u cart.');
//     console.log(req.body);
//     const { productId, name, price,image } = req.body;
//     try {
//         // Check if the product already exists in the cart
//         const existingItem = await CartItem.findOne({ productId });
//         if (existingItem) {
//             // If it exists, increment the quantity
//             existingItem.quantity += 1;
//             await existingItem.save();
//             res.json(existingItem);
//         } else {
//             // If it doesn't exist, create a new cart item
//             const cartItem = new CartItem({ productId, name, price, image, quantity: 1 });
//             await cartItem.save();
//             res.status(201).json(cartItem);
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to add to cart' });
//     }
// });
const addProductToCart = asyncHandler(async (req, res) => {
    console.log('Attempting to add item to cart.');
    console.log('Request body:', req.body);

    const { productId, name, price, image } = req.body;
    console.log("ID je: " + productId);

    try {
        // Check if the product already exists in the cart
        const existingItem = await CartItem.findOne({ productId });

        if (existingItem) {
            console.log(`Product with ID ${productId} already in cart. Incrementing quantity.`);
            // If it exists, increment the quantity
            existingItem.quantity += 1;
            await existingItem.save();
            console.log('Updated cart item:', existingItem);
            res.json(existingItem);
        } else {
            console.log(`Product with ID ${productId} not found in cart. Adding as new item.`);
            // If it doesn't exist, create a new cart item
            const cartItem = new CartItem({ productId, name, price, image, quantity: 1 });
            await cartItem.save();
            console.log('New cart item added:', cartItem);
            res.status(201).json(cartItem);
        }
    } catch (error) {
        console.error('Error saving to cart:', error);
        res.status(500).json({ message: 'Failed to add to cart', error: error.message });
    }
});
const getAllProductsFromCart = asyncHandler(async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cart items' });
    }
});

const deleteCart = asyncHandler(async (req, res) => {

    try {
        await CartItem.deleteMany();
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to clear cart' });
    }
});

const deleteProductFromCart = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await CartItem.findByIdAndDelete(id);
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove item' });
    }
});

module.exports = {
    addProductToCart,
    getAllProductsFromCart,
    deleteCart,
    deleteProductFromCart


}