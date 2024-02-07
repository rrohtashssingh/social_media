
import mongoose from "mongoose";

const LikesSchema = new mongoose.Schema({
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    post: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }],
}, { timestamps: true });

export const Likes = mongoose.model('Likes', LikesSchema);