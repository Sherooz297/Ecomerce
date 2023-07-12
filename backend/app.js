const express = require('express')
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const errorMiddleware = require('./middleware/error')
const app = express()
app.use(express.json())

app.use("/api/v1",product)
app.use("/api/v1",user)


//middleware for error
app.use(errorMiddleware);


module.exports = app
