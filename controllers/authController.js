import bcrypt from 'bcrypt';
import usermodel from '../models/user.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

//Register Controller
export const register = async (req,res)=>{
    let {username,email,password,age} = req.body;
    if(!username || !email || !password || !age){
        res.json({
            success: false,
            message: 'Missing details'
        })
    }
    try {
        const existingUser = await usermodel.findOne({email:req.body.email});
        if(existingUser){
            res.json({success: false, message:"User Already Exists"})
        }

        bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            if(err){
            console.log(err);
            return;
        }
        let createdUser=await usermodel.create({
        username,
        email,
        password:hash,
        age
    })
    let token=jwt.sign({email},process.env.JWT_secret,{ expiresIn: "1h"});
    res.cookie("token",token,{
        maxAge: 1*60*60*1000
    });
    res.json({ success: true,message: "Signup successful", user: { id: createdUser._id, username: createdUser.username, email: createdUser.email } });
    })
})
        
    } catch (error) {
        res.json({ success: false,message: error.message});
        
    }
       
}

//Login Controller
export const login = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.json({success: false,message:"missing details"});
    }
    try {
        let user= await usermodel.findOne({email:req.body.email});
     if (!user) {
      return res.status(404).json({ success: false,message: "User not found" });
    
    }
    console.log(req.body.password);
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if (result) {
        let token=jwt.sign({email},process.env.JWT_secret,{ expiresIn: "1h"});
        res.cookie("token",token,{ // cookie changed to token
        maxAge: 1*60*60*1000,
        httpOnly: false
        });
       
        return res.json({ tokengen:token,success:true,message: "Login successful", user: { email: user.email, id: user._id } });
      } 
      else {
        return res.status(401).json({ success:false,message: "Invalid password" });
      }
    }) 
    
        
    } catch (error) {

        res.json({success:false,message: error.message});
        
    }
    
    
}

//Loggout Controller
export const loggout = async(req,res)=>{
    try {
        res.clearCookie("token", {
            httpOnly: false,
            secure: false, // match your login cookie if not using HTTPS
            sameSite: "lax", // match your login cookie
            path: "/" // ensure path matches
        })
        res.redirect('/');
        return res.json({message:"Logged out"})
    } catch (error) {
        res.json({message:"server error"})
    }
    
}