const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
    },

    unit: {
      type: Number, // 1–5
      required: true,
    },

    capacity: {
      type: Number, // 2 or 3
      required: true,
    },

    occupants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    features: {
      type: [String], // ["AC", "Attached Bathroom"]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);