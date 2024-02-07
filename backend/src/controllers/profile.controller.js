
import { User } from "../models/user.models.js"
import { loginUser } from "./auth.js";

export const ProfileUpdateController = async (req,res) =>{
    //if profile has body to update something 
    
    const userId = req.userId;
    const user = await User.findOne({userId});
    const {bio,profilePicture}=req.body;


    if(req.body.bio || req.body.profilePicture){
        try {
    
            if(!loginUser){
            res.status(404).json({message:"Please login to access profile"});
             }
             if(!user){
                res.status(404).json({message:"User not found"});
             }
        user.bio=bio;
        user.profilePicture=profilePicture;
        await user.save();
        res.status(200).json({message: "Profile Updated Successfully"});
    } catch (error) {
        console.error("Error Occured While Updating Profile ");
        res.status(500).json({message: "Internal Server Error"})
    }
    }

//if profile has no body and want to see all the fields:
    try {
       const bio= user.bio;
       const username= user.username;
       const email= user.email;
         res.status(200).send([bio,username,email]);
    } catch (error) {
        console.log("Internal Server Error",error);
        res.status(500).json({message: "Internal Server Error"});
    }
}