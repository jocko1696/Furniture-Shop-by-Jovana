const asyncHandler = require("express-async-handler");
const express = require("express");
require('../models/orderModel');
const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const Stripe = require("stripe");
const stripe = Stripe(process.env.SK_TEST_SECRET_KEY); // Replace with your Stripe secret key
const nodemailer = require("nodemailer");


const stripeCheckout = asyncHandler(async (req, res) => {

    const {items, clientDetails} = req.body; // Items + client data from frontend
    if (!items || !clientDetails) {
        return res.status(400).json({error: "Missing items or client details"});
    }
    // console.log(items);
    // console.log(clientDetails);

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
            cancel_url: "http://localhost:5173/order-canceled",
        });

        res.json({url: session.url});
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({error: error.message});
    }

});

const createOrder = asyncHandler(async (req, res) => {
    const { clientDetails, items } = req.body;

    try {
        const newOrder = new Order({ clientDetails, items });
        await newOrder.save();

        // Send confirmation emails
        await sendOrderEmails(clientDetails, items);

        console.log("Order created successfully for COD");
        res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Error creating order" });
    }
});

const sendOrderEmails = asyncHandler(async (clientDetails, items)=>{
    try {


        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // Replace with your SMTP host
            port: 587, // Secure port
            secure: false, // Use SSL
            auth: {
                user: process.env.SMTP_USERNAME, // SMTP username
                pass: process.env.SMTP_PASSWORD , // SMTP password
            },
            logger: true, // Log detailed output
            debug: true,  // Include debug info
            tls: {
                rejectUnauthorized: false, // Allow self-signed certificates
            },
        });

        const generateEmailHTML = (isAdmin = false) => {
            const itemsHTML = items
                .map(
                    (item) => `
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px;">
                            <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;" />
                        </td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">$${item.price.toFixed(2)}</td>
                    </tr>`
                )
                .join("");

            const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

            const customerName = `${clientDetails.firstName} ${clientDetails.lastName}`;
            const address = `${clientDetails.address}, ${clientDetails.city}, ${clientDetails.postalCode}`;

            const greeting = isAdmin
                ? `<p>A new order has been received from ${customerName}.</p>`
                : `<p>Dear ${customerName},</p><p>Thank you for your order! Below are the details:</p>`;

            return `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <h1 style="color: #4CAF50;">${isAdmin ? "New Order Received" : "Order Confirmation"}</h1>
                ${greeting}
                <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px;">Product Image</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Product Name</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHTML}
                    </tbody>
                </table>
                <p><strong>Total Price:</strong> $${totalPrice}</p>
                ${!isAdmin ? `<p><strong>Shipping Address:</strong> ${address}</p>` : ""}
                <p>${isAdmin ? "Please process the order as soon as possible." : "If you have any questions, feel free to contact us."}</p>
                <p>Best regards,<br>Your Company Team</p>
            </div>`;
        };

        // Customer email content
        const customerEmail = {
            from: process.env.SMTP_USERNAME,
            to: clientDetails.email,
            subject: "Your Order Confirmation",
            // text: `Thank you for your order, ${clientDetails.firstName}! Here are your order details:\n\n${items.map(
            //     (item) => `${item.name} - $${item.price} x ${item.quantity}`
            // ).join("\n")}\n\nTotal: $${items.reduce((acc, item) => acc + item.price * item.quantity, 0)}`,
            html: generateEmailHTML(false), // Customer version
        };

        // Admin email content
        const adminEmail = {
            from: clientDetails.email,
            to: process.env.SMTP_USERNAME,
            subject: "New Order Received",

            html: generateEmailHTML(true), // Admin version
        };

        // Send both emails
        await transporter.sendMail(customerEmail);
        await transporter.sendMail(adminEmail);

        console.log("Emails sent successfully");
    } catch (error) {
        console.error("Error sending emails:", error);
    }

});

module.exports = {
    stripeCheckout,
    createOrder,
    sendOrderEmails,
}