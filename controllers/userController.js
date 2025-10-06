import usermodel from "../models/user.js";

export const getUserData = async (req, res) => {
    try {
        
        const user = await usermodel.findOne({email: req.user.email});
        if(!user){
            return res.json({success: false, message: "User not found"});
        }
        res.json({success: true, userData: {id: user._id, username: user.username, email: user.email, age: user.age}});
    } catch (error) {
        res.json({success: false, message: error.message});
        
    }
}