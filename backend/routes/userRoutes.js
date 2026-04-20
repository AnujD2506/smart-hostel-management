const express = require("express");
const router = express.Router();
const {protect, authorizeRoles} = require("../middleware/authMiddleware");

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted ✅",
    user: req.user,
  });
});

//warden-only route
router.get(
  "/warden-only",
  protect,
  authorizeRoles("warden"),
  (req, res) => {
    res.json({ message: "Warden access granted 👑" });
  }
);


module.exports = router;