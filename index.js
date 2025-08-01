const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Category = require("./routes/category")
const cors = require("cors")
const Product = require("./routes/product")
const User = require("./routes/user")


mongoose.connect("mongodb+srv://djakhadeveloper:EkaHPZGv9I6mSFHd@cluster0.czghfvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err))


app.use(express.json())
app.use(cors())
app.use("/products", Product)
app.use("/category", Category)
app.use("/user", User)


app.listen(3000, () => {
    console.log("server started")
})