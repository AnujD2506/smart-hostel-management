const Room = require("../models/Room");
const Student = require("../models/Student");

// CREATE ROOM (warden only)
exports.createRoom = async (req, res) => {
  try {
    const { roomNumber, unit, capacity, price, features } = req.body;

    const room = await Room.create({
      roomNumber,
      unit,
      capacity,
      price,
      features,
    });

    res.status(201).json({
      message: "Room created successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all the rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("occupants", "name email");

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//allocate room
exports.allocateRoom = async (req, res) => {
  try {
    const { studentId, roomId } = req.body;


    //check if room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if student exists
    const student = await Student.findOne({ user: studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if student already has a room
    if (student.roomNumber) {
      return res.status(400).json({
        message: "Student already assigned to a room",
      });
    }

    // check capacity
    if (room.occupants.length >= room.capacity) {
      return res.status(400).json({ message: "Room is full" });
    }


        //Prevent duplicate in same room
    if (room.occupants.includes(studentId)) {
      return res.status(400).json({
        message: "Student already in this room",
      });
    }

    // add student to room
    room.occupants.push(studentId);
    await room.save();

    // update student
    await Student.findOneAndUpdate(
      { user: studentId },
      {
        roomNumber: room.roomNumber,
        hostelUnit: room.unit,
        sharingType: room.capacity === 2 ? "double" : "triple",
      }
    );

    res.json({
      message: "Room allocated successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
