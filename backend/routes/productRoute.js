const express = require('express')

const {getallproduct, createproduct, updateproduct, deleteproduct, getsingleproduct} = require("../controller/productController")
const router = express.Router()

router.route("/product").get(getallproduct)
router.route("/createproduct").post(createproduct)
router.route("/updateproduct/:id").put(updateproduct)
router.route("/deleteproduct/:id").delete(deleteproduct)
router.route("/getsingleproduct/:id").get(getsingleproduct)


module.exports = router