const Notice = require("../models/Notice")

//CREATE NOTICE (WARDEN-ONLY)
exports.createNotice = async (req, res) => {
  try {
    const { title, content, audience } = req.body;

    const notice = await Notice.create({
      title,
      content,
      audience,
      postedBy: req.user._id,
    });

    res.status(201).json({
      message: "Notice posted successfully",
      notice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get notice for all users
exports.getNotices = async (req, res) => {
  try {
    const role = req.user.role;

    // filter based on audience
    const notices = await Notice.find({
      $or: [
        { audience: "all" },
        { audience: role === "student" ? "students" : role === "worker" ? "workers" : "all" },
      ],
    }).populate("postedBy", "name");

    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};