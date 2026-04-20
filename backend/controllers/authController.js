const User = require("../models/User");
const jwt = require("jsonwebtoken");

//generate JWT token
const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d"});

};

//---------signup---------------
exports.registerUser = async(req,res) => {
    try{
        const{name,email,password,role}=req.body;

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
        res.status(201).json({
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
