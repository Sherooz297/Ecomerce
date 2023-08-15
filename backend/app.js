const express = require('express')
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const dotenv = require('dotenv')

dotenv.config({path:"backend/config/config.env"});



const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute")

const errorMiddleware = require('./middleware/error')
const cookie = require('cookie-parser')
const core = require("cors")


const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cookie())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(core())

app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)




//middleware for error
app.use(errorMiddleware);


module.exports = app
