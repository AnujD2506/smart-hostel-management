const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["electricity", "plumbing", "mess"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "assigned", "resolved"],
      default: "pending",
    },

    assignedWorker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);