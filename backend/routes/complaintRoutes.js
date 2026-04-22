const express = require("express");
const router = express.Router();

const {
  createComplaint,
  assignWorker,
  updateStatus,
  getComplaints,
} = require("../controllers/complaintController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// student creates complaint
router.post("/", protect, authorizeRoles("student"), createComplaint);

// warden assigns worker
router.post("/assign", protect, authorizeRoles("warden"), assignWorker);

// worker updates status
router.post("/status", protect, authorizeRoles("worker"), updateStatus);

// get all complaints
router.get("/", protect, getComplaints);

module.exports = router;