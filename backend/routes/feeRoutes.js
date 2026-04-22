const express = require("express");
const router = express.Router();

const {
  payFee,
  verifyFee,
  getFees,
} = require("../controllers/feeController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// student pays fee
router.post("/", protect, authorizeRoles("student"), payFee);

// warden verifies
router.post("/verify", protect, authorizeRoles("warden"), verifyFee);

// view all payments
router.get("/", protect, getFees);

module.exports = router;