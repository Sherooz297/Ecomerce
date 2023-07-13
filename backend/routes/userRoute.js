const express =  require('express')
const { registeruser, loginUser, logout } = require('../controller/userController')
const router = express.Router()


router.route("/register").post(registeruser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)



module.exports = router