const express = require("express");
const router = express.Router();

const {
  createNotice,
  getNotices,
} = require("../controllers/noticeController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// warden posts notice
router.post("/", protect, authorizeRoles("warden"), createNotice);

// all users can view
router.get("/", protect, getNotices);

module.exports = router;