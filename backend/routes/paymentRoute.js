const express = require("express")
const router = express.Router();

const {isAuthenticationUser} = require("../middleware/auth");
const { processPayment, sendStripeApiKey } = require("../controller/paymentController");

router.route("/payment/process").post(isAuthenticationUser,processPayment)
router.route("/stripeapikey").get(isAuthenticationUser,sendStripeApiKey)


module.exports = router;