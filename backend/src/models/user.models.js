
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    bio: {
        type: String,
        default: "",
    },
    profilePicture: {
        userId: String,
        type: String,
        default: ""
    }

}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);