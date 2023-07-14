const express = require('express')

const {getallproduct, createproduct, updateproduct, deleteproduct, getsingleproduct} = require("../controller/productController")
const { isAuthenticationUser, autherizedRole } = require('../middleware/auth')
const router = express.Router()

router.route("/product").get(getallproduct)
router.route("/createproduct").post(isAuthenticationUser, autherizedRole("admin"),createproduct)
router.route("/updateproduct/:id").put(isAuthenticationUser, autherizedRole("admin"),updateproduct)
router.route("/deleteproduct/:id").delete(isAuthenticationUser, autherizedRole("admin"),deleteproduct)
router.route("/getsingleproduct/:id").get(getsingleproduct)


module.exports = router