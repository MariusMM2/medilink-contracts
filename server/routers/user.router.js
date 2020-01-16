// /api/users
const express = require("express");

const router = new express.Router();
const userController = require("../controllers/user.controller");

router.post("/api/users/register", userController.register);
router.get("/api/users/confirmation/:token", userController.confirmEmail);
router.post("/api/users/login", userController.login);
router.post("/api/users/forgotPwd", userController.forgotPassword);
router.post("/api/users/resetPwd/:token", userController.changePassword);

router.get("/api/users/:id", userController.readUser);
router.get("/api/users", userController.readAllUsers);
router.put("/api/users/:id", userController.updateUser);


module.exports = router;
