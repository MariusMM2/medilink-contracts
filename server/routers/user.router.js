// /api/users
const express = require("express");
const cors = require('cors');

const router = new express.Router();
const userController = require("../controllers/user.controller");

router.post("/api/users/register", cors(), userController.register);
router.get("/api/users/confirmation/:token", cors(), userController.confirmEmail);
router.post("/api/users/login", cors(), userController.login);
router.post("/api/users/forgotPwd", cors(), userController.forgotPassword);
router.post("/api/users/resetPwd/:token", cors(), userController.resetPassword);


module.exports = router;
