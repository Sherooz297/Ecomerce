const express = require('express')
const product = require("./routes/productRoute")
const errorMiddleware = require('./middleware/error')
const app = express()
app.use(express.json())

app.use("/api/v1",product)


//middleware for error
app.use(errorMiddleware);


module.exports = app
