const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    user:{
        //link to main user
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },

    //college details
    usn: {
        type: String,
        required:true,
        unique: true,

    },

    year:{
        type: Number,
        enum: [1,2,3,4],
        required: true,
    },

    //hostel allocation
    hostelUnit:{
        type: Number, //1 to 5
    },

    roomNumber:{
        type: String,
    },

    sharingType:{
        type: String,
        enum: ["double","triple"],
    },

    //roommate matching 
    preferences: {
        sleepTime: String,
        cleanliness: String,
        studyHabits: String,
    },

    //fee tracking 
    feeStatus:{
        type: String,
        enum: ["paid","unpaid"],
        default: "unpaid",
    },

    feePaidAt: {
        type: Date,
    },

    //profile image
    profileImage: {
        type: String,
    },


}, {timestamps: true}
);

module.exports = mongoose.model("Student", studentSchema);