const express = require('express')
const {getallproduct} = require("../controller/productController")
const router = express.Router()

router.route("/product").get(getallproduct)


module.exports = router