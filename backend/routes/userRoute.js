const express =  require('express')
const {isAuthenticationUser, autherizedRole} = require('../middleware/auth')
const { registeruser, loginUser, logout, forgetPassword, resetPassword, getUserDetail, updatePassword, updateProfile, getAllUser, getSingleUser, updateRole, deleteUser } = require('../controller/userController')

const router = express.Router()


router.route("/register").post(registeruser)
router.route("/login").post(loginUser)

router.route("/password/forgot").post(forgetPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout)

//User routes

router.route("/me").get(isAuthenticationUser, getUserDetail)
router.route("/me/update").put(isAuthenticationUser, updateProfile)
router.route("/password/update").put(isAuthenticationUser,updatePassword)
router.route("/admin/user").get(isAuthenticationUser,autherizedRole('admin'),getAllUser)
router.route('/admin/user/:id').get(isAuthenticationUser,autherizedRole('admin'),getSingleUser)
router.route("/admin/update/role/:id").put(isAuthenticationUser,autherizedRole('admin'),updateRole)
router.route("/admin/user/delete/:id").delete(isAuthenticationUser,autherizedRole('admin'),deleteUser)




module.exports = router