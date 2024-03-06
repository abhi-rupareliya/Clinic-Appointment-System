const express = require("express");
const {
  userController: { addUser, loginUser, requestOTP, resetPassword, verifyUser ,getIP },
} = require("../Controllers");
const {
  authMiddleware: { AuthMiddleware },
} = require("../Middlewares");


const router = express.Router();
router.post("/add", addUser);
router.post("/login", loginUser);
router.post("/forgetpassword", requestOTP);
router.post("/resetpassword", resetPassword);
router.get("/verify", AuthMiddleware, verifyUser);
router.get("/ip", getIP);

module.exports = router;