
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true,
        index: true
    },
    text: {
        type: String,
        required: true,
        minlength: 1
    },
    post: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Post',
        required: true,
        index: true,
    },
    timestamps: { type: Date, default: Date.now },
});

export const Comment = mongoose.model('Comment', CommentSchema);