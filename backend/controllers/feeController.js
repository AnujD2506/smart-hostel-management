const Fee = require("../models/Fee");
const Student = require("../models/Student");

// CREATE PAYMENT (student pays fee)
exports.payFee = async (req, res) => {
  try {
    const { amount, paymentMethod, transactionId, screenshot } = req.body;

    const fee = await Fee.create({
      student: req.user._id,
      amount,
      paymentMethod,
      transactionId,
      screenshot,
    });

    res.status(201).json({
      message: "Payment submitted, waiting for verification",
      fee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//warden verifies payment
exports.verifyFee = async (req, res) => {
  try {
    const { feeId, status } = req.body; // verified / rejected

    const fee = await Fee.findById(feeId);

    if (!fee) {
      return res.status(404).json({ message: "Fee record not found" });
    }

    fee.status = status;
    await fee.save();

    // if verified → update student fee status
    if (status === "verified") {
      await Student.findOneAndUpdate(
        { user: fee.student },
        { feeStatus: "paid", feePaidAt: new Date() }
      );
    }

    res.json({
      message: `Fee ${status}`,
      fee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all payments
exports.getFees = async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate("student", "name email");

    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};