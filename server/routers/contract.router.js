// /api/users
const express = require("express");
const cors = require('cors');

const router = new express.Router();
const contractController = require("../controllers/contract.controller");
const auth = require("../middleware/auth");

// router.post("/api/contracts/create", cors(), contractController.createContract);
// router.get("/api/contracts/:id", cors(), contractController.readContract);
// router.get("/api/contracts/getAll", cors(), contractController.readAllContracts);
// router.put("/api/contracts/update", cors(), contractController.updateContract);
// router.delete("/api/contracts/:id", cors(), contractController.deleteContract);

// router.post("/api/contracts/create", cors(), auth, contractController.createContract);
// router.get("/api/contracts/:id", cors(), auth, contractController.readContract);
// router.get("/api/contracts", cors(), auth, contractController.readAllContracts);
// router.put("/api/contracts/:id", cors(), auth, contractController.updateContract);
// router.delete("/api/contracts/:id", cors(), auth, contractController.deleteContract);

router.post("/api/contracts/create", contractController.createContract);
router.get("/api/contracts/:id", contractController.readContract);
router.get("/api/contracts", contractController.readAllContracts);
router.put("/api/contracts/:id", contractController.updateContract);
router.delete("/api/contracts/:id", contractController.deleteContract);

module.exports = router;
