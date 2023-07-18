const express = require('express')
const router = express.Router()
const { isAuthenticationUser, autherizedRole } = require('../middleware/auth')
const { newOrder } = require('../controller/orderController')


router.route("/order/new").post(isAuthenticationUser,newOrder)


module.exports = router 