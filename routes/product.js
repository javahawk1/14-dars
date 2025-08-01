const app = require("express").Router()
const { Product, validateProduct } = require("../models/product.model")
const auth = require("../middleware/auth")

app.post("/", auth, async (req, res) => {
    try {
        const { value, error } = validateProduct.validate(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        const product = await Product.create(value)
        res.send(product)
    } catch (err) {
        res.status(400).send(err)
    }
});

app.get("/", async (req, res) => {
    try {
        let { page = 1, limit = 10} = req.query
        page = Number(page)
        limit = Number(limit)

        let skip = (page - 1) * limit

        const products = await Product.find().skip(skip).limit(limit).populate("category")
        res.send(products)
    } catch (err) {
        res.status(400).send(err)
    }
});

app.get("/category/:id", async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.id }).populate("category")
        res.send(products)
    } catch (err) {
        res.status(400).send(err)
    }
})

app.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category")
        if (!product) {
            return res.status(404).send({ message: "not found" })
        }
        res.send(product)
    } catch (err) {
        res.status(400).send(err)
    }
});

app.patch("/:id", auth, async (req, res) => {
    try {
        const { value, error } = validateProduct.validate(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        const updated = await Product.findByIdAndUpdate(req.params.id, value, { new: true })
        res.send(updated)
    } catch (err) {
        res.status(500).send({ message: "Server error" })
    }
});

app.delete("/:id", auth, async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id)
        if (!deleted) {
            return res.status(404).send({ message: "not found" })
        }

        res.send("deleted");
    } catch (err) {
        res.status(400).send(err)
    }
});

module.exports = app
