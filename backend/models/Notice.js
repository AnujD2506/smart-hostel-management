const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    postedBy: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: true,
    },

    audience: {
      type: String,
      enum: ["all", "students", "workers"],
      default: "all",
    },
},
{ timestamps: true}
);

module.exports = mongoose.model("Notice", noticeSchema);