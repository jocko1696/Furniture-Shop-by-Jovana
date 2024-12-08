const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate-v2");

const blogSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
            trim: true,
        },

        category: [{
            type: [String],
            required: [true, "Please add a category"],
            trim: true,
        }],


        description: {
            type: String,
            required: [true, "Please add a description"],
            trim: true,
        },

        image: {
            type: [String],

        },

        date:{
            type: Date
        }

    },
    {
        timestamps: true,
    }
);


blogSchema.plugin(mongoosePaginate);
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

