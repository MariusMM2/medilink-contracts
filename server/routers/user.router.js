// /api/users
const express = require("express");
const cors = require('cors');

const router = new express.Router();
const userController = require("../controllers/user.controller");

router.post("/api/users/register", cors(), userController.register);
router.post("/api/users/login", cors(), userController.login);
router.get("/api/users/:id", userController.readUser);
router.get("/api/users", userController.readAllUsers);
router.put("/api/users/:id", userController.updateUser);


module.exports = router;
