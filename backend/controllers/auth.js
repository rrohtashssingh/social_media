import bcrypt from 'bcrypt';
import { User } from '../models/user.models.js';
import jwt from 'jsonwebtoken';

export const signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            res.status(401).json({ message: "Please fill all inputs" });
        }
        //if user is already registered;
        const isRegistered = await User.findOne({ email });

        if (isRegistered) {
            res.status(401).json({ message: "User is already registered please log in" });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        //creating new user
        const newUser = new User({
            username,
            email,
            password: hashedPass,
        });
        //to save the user
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

