const express = require('express')
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")

const order = require("./routes/orderRoute")
const errorMiddleware = require('./middleware/error')
const cookie = require('cookie-parser')
const core = require("cors")


const app = express()
app.use(express.json())
app.use(cookie())
app.use(core())

app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)



//middleware for error
app.use(errorMiddleware);


module.exports = app
