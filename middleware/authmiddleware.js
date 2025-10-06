import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
export const authMiddleWare = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        res.json({success:false,message:"User not logged in"});
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_secret);
        req.user = decode;
        
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }

}