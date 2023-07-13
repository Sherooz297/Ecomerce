const express = require('express')

const {getallproduct, createproduct, updateproduct, deleteproduct, getsingleproduct} = require("../controller/productController")
const { isAuthenticationUser, autherizedRole } = require('../middleware/auth')
const router = express.Router()

router.route("/product").get( isAuthenticationUser, autherizedRole("admin"), getallproduct)
router.route("/createproduct").post(isAuthenticationUser,createproduct)
router.route("/updateproduct/:id").put(isAuthenticationUser,updateproduct)
router.route("/deleteproduct/:id").delete(isAuthenticationUser,deleteproduct)
router.route("/getsingleproduct/:id").get(getsingleproduct)


module.exports = router