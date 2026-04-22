const User = require("../models/User");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

//generate JWT token
const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d"});

};

//---------signup---------------
exports.registerUser = async(req,res) => {
    try{
        const{name,email,password,role,usn,year}=req.body;

        //validation for students
        if (role === "student" && (!usn || !year)) {
            return res.status(400).json({
            message: "USN and year are required for students",
            });
        }

        //check if user exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }

        //create user (password will be hashed)

        const user = await User.create({
            name,
            email,
            password,
            role,
        });

        let studentData = null;

        //if student , create student profile
        if(role==="student"){
            studentData = await Student.create({
                user: user._id,
                usn,
                year,
            })
        }


        res.status(201).json({
        message: "User registered successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
        });

    }catch(error){
        res.status(500).json({message: error.message});
    }

}; 

//------------------LOGIN---------------------
exports.loginUser = async(req,res)=>{
    try{
        const{email,password} = req.body;
        
        //find user
        const user = await User.findOne({email})

        //check user + password
        if(user && (await user.matchPassword(password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),

            });
            

        }else{
            res.status(401).json({ message: "Invalid email or password"});
        }

    } catch(error){
        res.status(500).json({message: error.message});
    }
}


//-------------STUDENT---------------
