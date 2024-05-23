const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate-v2");



const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Please add a price"],
            trim: true,

        },

        sale: {
            type: Number,
            // required:[true,"Please add a price"],
            trim: true,

        },

        // category: {
        //     type: [String],
        //     required: [true, "Please add a category"],
        //     trim: true,
        // },

        category: [{
            type: [String],
            required: [true, "Please add a category"],
            trim: true,
        }]
        ,
        quantity: {
            type: Number,
            required: [true, "Please add a quantity"],
            trim: true,
        },

        sold: {
            type: Number,
            default: 0,
            trim: true,
        },


        description: {
            type: String,
            required: [true, "Please add a description"],
            trim: true,
        },

        image: {
            type: [String],

        },

        // ratings: {
        //     type: [Object],
        //
        // },

        code: {
            type: String,
            required: true,
            default: "SKU",
            trim: true,
        },

        tags: {
            type: [String],
            required: [true, "Please add a mark"],
            trim: true,
        },

    },
    {
        timestamps: true,
    }
);


//Indexes are already created through Visual Editor
// productSchema.index({ name: 'text', description:'text' }, function (err) {
//     if (err) console.error('Error creating index:', err);
//     else console.log('Index created successfully');
// }); // Add text index for searching

productSchema.plugin(mongoosePaginate);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

