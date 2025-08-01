const mongoose = require("mongoose")
const joi = require("joi")

const categorySchema = new mongoose.Schema({
    name: String
})

const Category = mongoose.model("Category", categorySchema)

const validationCategory = joi.object({
    name: joi.string().required()
})



module.exports = { Category, validationCategory }