const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const parol = "dostlarimdansalom";

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        const find = await User.findOne({ username })

        if (find) {
            return res.status(400).send("username is alredy exists")
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({ username, password: hash });

        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).send("not found")
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).send("invalid")
        }

        const token = jwt.sign({ id: user._id, username: user.username }, parol)

        res.send(token)
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
