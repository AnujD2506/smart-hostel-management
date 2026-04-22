const express = require("express");
const router = express.Router();
const { createRoom, getRooms, allocateRoom,} = require("../controllers/roomController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// create room (warden only)
router.post("/", protect, authorizeRoles("warden"), createRoom);

// get all rooms
router.get("/", protect, getRooms);

// allocate room (warden only)
router.post("/allocate", protect, authorizeRoles("warden"), allocateRoom);

module.exports = router;