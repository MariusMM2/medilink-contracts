// /api/users
const express = require("express");
const cors = require('cors');

const router = new express.Router();
const contractController = require("../controllers/contract.controller");

router.post("/api/contracts/create", contractController.createContract);
router.get("/api/contracts/:id", contractController.readContract);
router.get("/api/contracts", contractController.readAllContracts);
router.put("/api/contracts/:id", contractController.updateContract);
router.delete("/api/contracts/:id", contractController.deleteContract);

module.exports = router;
