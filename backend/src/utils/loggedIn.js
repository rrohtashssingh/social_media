
//hame check karna hai ki user logged in hai ya nahi agar user logged in hoga iska matlab jwt token decode == req.userId
import jwt from 'jsonwebtoken';

export const isLoggedIn =  (req,res,next)=>{
    const token = req.headers.accesstoken;

    if(!token){
        res.status(404).json({message: "Token is not found"});
    }

    try {
        const decode = jwt.verify(token,'accesstoken');
        req.userId = decode.userId;
        next();
    } catch (error) {
        res.status(500).json({message: "checking login failed"});
    }

}