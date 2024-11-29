const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
require('../models/contactModal');
const mongoose = require("mongoose");
const Contact = mongoose.model("Contact");
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


const getAllContacts = asyncHandler(async (req, res) => {

    try {
        const contacts = await Contact.find({});
        // console.log(contacts);
        res.status(200).send(contacts);
    } catch (error) {
        res.status(500).send();
    }
});


const writeContact = asyncHandler(async (req, res) => {
    console.log("Upisujemo kontakt u bazu");
    const {name, email, message} = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({error: 'All fields are required'});
    }

    // try {
    const newContact = new Contact({name, email, message});
    await newContact.save();

    //Very important to notice:
    /*If you have enabled 2-factor authentication on your Google account you can't use your regular password to access Gmail
     programmatically. You need to generate an app-specific password and use that in place of your actual password.

     STEPS:

     Log in to your Google account Go to My Account > Sign-in & Security > App Passwords (Sign in again to confirm it's you) Scroll down to Select App (in the Password & sign-in method box) and choose Other (custom name) Give this app password a name, e.g. "nodemailer"
     Choose Generate Copy the long generated password and paste it into your Node.js script
     instead of your actual Gmail password.

     */
    const transporter = nodemailer.createTransport({

        // service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 587, // or 465 for SSL
        secure: false, // true for 465, false for other ports
         //requireTLS:true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,

        },
        debug: true, // show debug output
        logger: true, // log information in console
        tls: {
            rejectUnauthorized: false, // Allow self-signed certificates
        },
    });

    transporter.verify(function (error, success) {
        if (error) {
            console.log("Connection error" + error);
        } else {
            console.log('Server is ready to take our messages');
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.SMTP_USERNAME,
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {

        if (error) {
            return res.status(500).json({error: 'Failed to send email'});
        } else {
            return res.status(200).json({message: 'Message sent successfully'});
        }
    });
    // } catch (error) {
    //     console.log("U catchu  smo")
    //     res.status(500).json({ error: 'Failed to save message' });
    // }

});

module.exports = {
    getAllContacts,
    writeContact
}