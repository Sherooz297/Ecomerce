const express = require('express')
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const errorMiddleware = require('./middleware/error')
const cookie = require('cookie-parser')
const app = express()
app.use(express.json())
app.use(cookie())

app.use("/api/v1",product)
app.use("/api/v1",user)


//middleware for error
app.use(errorMiddleware);


module.exports = app
