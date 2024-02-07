
import {Post} from '../models/post.models.js';
import { User } from '../models/user.models.js';


export const createPost = async (req,res) => { 
       const userId= req.userId;
    //check userId is present in db or not
    const user = await User.findById(userId);
    if(!user){
        res.status(404).json({message:"User is not registered"})
    }
    try {
        res.status(200).json({message:"success OK"});
    } catch (error) {
        res.status(500).json({message: " Internal Server Error"});
    }
}