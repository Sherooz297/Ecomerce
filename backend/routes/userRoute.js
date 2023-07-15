const express =  require('express')
const {isAuthenticationUser} = require('../middleware/auth')
const { registeruser, loginUser, logout, forgetPassword, resetPassword, getUserDetail, updatePassword } = require('../controller/userController')

const router = express.Router()


router.route("/register").post(registeruser)
router.route("/login").post(loginUser)

router.route("/password/forgot").post(forgetPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout)

//User routes

router.route("/me").get(isAuthenticationUser, getUserDetail)
router.route("/password/update").put(isAuthenticationUser, updatePassword)



module.exports = router