const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        //validation
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'User Already Exists'
            });
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword; 
        //rest data
        const user = new userModel(req.body);
        await user.save();
        return res.status(201).send({
            success: true, 
            message: 'User Registered Successfully',
            user
        });
    } catch (error) {
        console.log(error);
        console.log('Stack trace: ', error.stack);
        res.status(500).send({
            success: false,
            message: error.message,
            error
        });
    }
};

//login call back
const loginController = async (req,res) => {
    try{
        const existingUser = await userModel.findOne({email:req.body.email})
        if(!existingUser){
            return res.status(404).send({
                success:false,
                message:'User Not Found'
            })
        }
        //Check role
        if(existingUser.role !== req.body.role){ // Use existingUser instead of user
            return res.status(500).send({
                success:false,
                message:"role doesn't match",
            })
        }
        //compare password
        const comparePassword = await bcrypt.compare(req.body.password, existingUser.password)
        if(!comparePassword){
            return res.status(500).send({
                success:false,
                message:'Invalid Credentials'
            })
        }
        const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        return res.status(200).send({
            success:true,
            message:'Login Succesfully',
            token,
            existingUser,
        })    
     
    }   catch (error){
        console.log(error)
        res.status(500).send({
        success:false,
        message:'Login Error',
        error
      })
    }
};


// GET CURRENT USER
const currentUserController = async (req, res) =>{
    try{
        const user = await userModel.findOne({_id: req.body.userId});
        return res.status(200).send({
            success:true,
            message:"User Fetched Successfully",
            user,
        })
    }   catch (error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Unable to Fetch current User",
            error,
        })
    }
};

module.exports = { registerController , loginController , currentUserController };
