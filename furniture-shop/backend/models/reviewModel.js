const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {


        name: {
            type: String,
            required: [true, "Please add name and surname."],
            unique: false
        },


        image: {
            type: String,
            required: [true, "Please add photo."],
            default: "https://ibb.co/album/mSMr3h",
        },

        review: {
            type: String,
            required: [true, "Please provide a first review!"],
            unique: false
        },

        rating: {
            type: String,
            required: [true, "Please provide a star!"],
            unique: false
        },

    },

    {
        collection: "reviews",
    },
    {
        timestamps:true,
    }

);


module.exports = mongoose.model("Review", ReviewSchema);

