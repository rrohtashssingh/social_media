
import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    comment: {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        timestapms: { type: Date, default: Date.now }
    }
})

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        coordinates: [Number],
    },
    image: {
        type: String,
        maxlength: 255
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Likes', index: true }],
    comments: [commentsSchema]
}, { timestamps: true });

export const Post = mongoose.model('Post', PostSchema);