const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {


        name: {
            type: String,
            required: [true, "Please add name and surname."],
            unique: false
        },

        email: {
            type: String,
            required: [true, "Please provide an Email!"],
            unique: [true, "Email Exist"],
            trim: true,
            // match: [/^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\. [a-zA-Z]{2,}$/],

        },

        message:{
            type: String,
            required: [true, "Please add mesage."],
            unique: false
        },
    },

    {
        collection: "contact",
    },
    {
        timestamps:true,
    }

);


module.exports = mongoose.model("Contact", ContactSchema);
