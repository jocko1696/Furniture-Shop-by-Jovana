const mongoose = require("mongoose");
const {Double, Int32} = require("mongodb");

const ProductsSchema = new mongoose.Schema(
    {

        name: {
            type:String
        },
        price: {
            type:Number,
        },

        image:{
            type:String,
        },
        code:{
            type:String
        },
        tags:[{
            type: String
        }],
        sale:{
            type:Number,
        },
        quantity:{
            type:Number,
        },
        stock:{
            type: String
        },
        type:{
            type: String
        },
    },

    {
        collection:"products",
    }

);

module.exports =  mongoose.model("products", ProductsSchema);
