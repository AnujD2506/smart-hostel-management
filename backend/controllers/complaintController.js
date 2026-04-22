const Complaint = require("../models/Complaint");

// STUDENT CREATES COMPLAINT
exports.createComplaint = async (req, res) => {
  try {
    const { type, description } = req.body;

    const complaint = await Complaint.create({
      student: req.user._id,
      type,
      description,
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//WARDEN ASSIGNS WORKER
exports.assignWorker = async (req, res) => {
  try {
    const { complaintId, workerId } = req.body;

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.assignedWorker = workerId;
    complaint.status = "assigned";

    await complaint.save();

    res.json({
      message: "Worker assigned successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//WORKER UPDATES STATUS
exports.updateStatus = async (req, res) => {
  try {
    const { complaintId, status } = req.body;

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status; // "resolved"

    await complaint.save();

    res.json({
      message: "Status updated",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GETTING COMPLAINTS
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("student", "name email")
      .populate("assignedWorker", "name email");

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};