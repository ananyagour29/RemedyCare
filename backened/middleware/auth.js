// // import jwt from 'jsonwebtoken'
// import jwt from 'jsonwebtoken';

// const auth=(req,res,next)=>{
//     const token=req.headers.authorization;
//     try{
//         jwt.verify(token,process.env.JWT_SECRET);
//         next();
//     }catch(error){
//         // res.status({success:false,message:"Invalid token"});
//         res.status(401).json({ success: false, message: "Invalid token" });

//     }
// }
// export default auth;
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    // const token = authHeader.split(" ")[1];
    const token = authHeader.startsWith("Bearer ")
  ? authHeader.split(" ")[1]
  : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

export default auth;