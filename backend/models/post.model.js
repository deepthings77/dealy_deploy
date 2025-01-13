import mongoose from "mongoose";
import { nanoid } from "nanoid";


const postSchema = new mongoose.Schema({
    caption: { type: String, required: true },
    coverImage: { type: String, default: 'coverImage' },
    products: [
        { type: String, default: '' }
       
    ],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    slug: { type: String, unique: true, required: true, default: () => nanoid(8) } // Unique identifier for the post URL

}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);
