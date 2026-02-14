// import jwt from 'jsonwebtoken'
import jwt from 'jsonwebtoken';

const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    try{
        jwt.verify(token,process.env.JWT_SECRET);
        next();
    }catch(error){
        // res.status({success:false,message:"Invalid token"});
        res.status(401).json({ success: false, message: "Invalid token" });

    }
}
export default auth;