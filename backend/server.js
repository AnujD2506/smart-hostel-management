require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// -------------------- MIDDLEWARE --------------------
app.use(cors());
app.use(express.json());

// -------------------- DATABASE CONNECTION --------------------
const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host} `);
    }catch(error){
    console.error("Database connection error:",error.message);
    process.exit(1);
}
    
};

connectDB();

// -------------------- ROUTES --------------------

// -------------------- ERROR HANDLING --------------------
//404 handler
app.use((req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({
        message:"something went wrong",
        error: err.message,
    })
})

// -------------------- SERVER --------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`SERVER running on port {PORT}`);

});