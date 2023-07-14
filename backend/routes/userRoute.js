const express =  require('express')
const { registeruser, loginUser, logout, forgetPassword, resetPassword } = require('../controller/userController')
const router = express.Router()


router.route("/register").post(registeruser)
router.route("/login").post(loginUser)

router.route("/password/forgot").post(forgetPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout)



module.exports = router