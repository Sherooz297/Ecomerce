const express = require('express')

const {getallproduct, createproduct, updateproduct, deleteproduct, getsingleproduct, crateProductReview,getAllReveiws, deleteReview} = require("../controller/productController")
const { isAuthenticationUser, autherizedRole } = require('../middleware/auth')
const router = express.Router()

router.route("/product").get(getallproduct)
router.route("/admin/createproduct").post(isAuthenticationUser, autherizedRole("admin"),createproduct)
router.route("/admin/updateproduct/:id").put(isAuthenticationUser, autherizedRole("admin"),updateproduct)
router.route("/admin/deleteproduct/:id").delete(isAuthenticationUser, autherizedRole("admin"),deleteproduct)
router.route("/getsingleproduct/:id").get(getsingleproduct)
router.route("/review").put(isAuthenticationUser, crateProductReview)
router.route("/getAllReviews").get(getAllReveiws)
router.route("/deleteReview").delete(isAuthenticationUser,autherizedRole("admin"),deleteReview)


module.exports = router