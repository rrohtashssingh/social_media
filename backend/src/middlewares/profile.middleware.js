
export const profileMiddleware = async (req,res,next) => {
    const token= req.headers.accesstoken;
    
        if(!token){
            res.status(404).json({message: "Please login first to check profile"});
        }
       next();
};