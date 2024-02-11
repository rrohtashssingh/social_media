import bcrypt from 'bcrypt';
import { User } from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import  {ApiError} from '../utils/ApiError.js'

export const signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        //checking if user is not present in the field 
        if (!username || !email || !password) {
            res.status(401).json({ message: "Please fill all inputs" });
        }
        //checking if user gave empty field:
        if([username,email,password].some((field)=>field?.trim() === "")){
            throw new ApiError(400, "All Fields Are Required");
        }

        //if user is already registered;
        const isRegistered = await User.findOne({
            $or: [{username},{email}]
         });

        if (isRegistered) {
            throw new ApiError(409, "User with email or username already exist");
        }

        const hashedPass = await bcrypt.hash(password, 10);


        //creating new user
        const newUser = new User({
            username,
            email,
            password: hashedPass,
        });
        //to save the user
        const createdUser = await User.findById(newUser._id).select(
            "-password"
        )
        if(!createdUser){
            throw new ApiError(500, "Something went wrong while registering user");
        }
        await newUser.save();
        res.status(201).json({ message: "User successfully created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: " Internal server error" });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            res.status(400).json({ message: "Please fill all inputs" });
        }
        //check if User is not registered;
        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ message: "User is not registered" });
        }

        const isValidPass = await bcrypt.compare(password, user.password);

        if (!isValidPass) {
            res.status(401).json({ message: "Password is incorrect" });
        }

        const token = jwt.sign({ userId: user._id }, 'accesstoken', { expiresIn: '7d' });
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

