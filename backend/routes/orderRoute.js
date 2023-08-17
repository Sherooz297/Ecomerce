const express = require('express')
const router = express.Router()
const { isAuthenticationUser, autherizedRole } = require('../middleware/auth')
const { newOrder, getSingleOrder, myOrder, getallordets, updateOrder, deleteOrder } = require('../controller/orderController')


router.route("/order/new").post(isAuthenticationUser,newOrder)
router.route("/orders/:id").get(isAuthenticationUser,getSingleOrder)
router.route("/orders/me").get(isAuthenticationUser,myOrder)
router.route("/admin/allOrders").get(isAuthenticationUser,autherizedRole("admin"),getallordets)
router.route("/admin/updateOrder/:id").put(isAuthenticationUser,autherizedRole("admin"),updateOrder)
router.route("/admin/deleteOrder/:id").delete(isAuthenticationUser,autherizedRole("admin"),deleteOrder)


module.exports = router 