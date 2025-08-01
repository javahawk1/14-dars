const mongoose = require("mongoose");
const joi = require("joi");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: {
        type: mongoose.Types.ObjectId, 
        ref: "Category", 
    },
});

const Product = mongoose.model("Product", productSchema);

const validateProduct = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    category: joi.string().required(),
});

module.exports = { Product, validateProduct };
