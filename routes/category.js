const app = require("express").Router()
const { Category, validationCategory } = require("../models/category.model")

app.get("/", async (req, res) => {
    try {
        let data = await Category.find()
        res.send(data)
    } catch (err) {
        res.send(400).send(err)
    }
})

app.post("/", async (req, res) => {
    try {
        const { value, error } = validationCategory.validate(req.body)
        const find = await Category.findOne({ name: req.body.name })

        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        if (find) {
            return res.status(400).send({ message: "This category is already exists" })
        }

        const category = await Category.create(value)
        res.status(201).send(category)
    } catch (err) {
        res.status(400).send(err)
    }
});

app.get("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.status(404).send({ message: "not found" })
        }

        res.send(category)
    } catch (err) {
        res.status(400).send(err)
    }
});

app.patch("/:id", async (req, res) => {
    try {
        const { value, error } = validationCategory.validate(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        const updated = await Category.findByIdAndUpdate(req.params.id, value, { new: true })

        if (!updated) {
            return res.status(404).send({ message: "not found" })
        }

        res.send(updated);
    } catch (err) {
        res.status(400).send(err)
    }
});

app.delete("/:id", async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id)
        if (!deleted) {
            return res.status(404).send({ message: "not found" })
        }
        res.send("deleted")
    } catch (err) {
        res.status(400).send(err)
    }
});

module.exports = app