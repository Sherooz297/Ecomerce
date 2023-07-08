const express = require('express')

const {getallproduct, createproduct} = require("../controller/productController")
const router = express.Router()

router.route("/product").get(getallproduct)
router.route("/createproduct").post(createproduct)


module.exports = router