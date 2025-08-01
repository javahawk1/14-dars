const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).send("Token kere");
    }

    try {
        const user = jwt.verify(token, "dostlarimdansalom");
        next();
    } catch {
        res.status(400).send("invalid token");
    }
}

module.exports = auth;
