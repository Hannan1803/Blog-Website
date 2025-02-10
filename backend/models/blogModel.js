import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: { type: String },
    author: { type: String }, // Can store user ID or username
    createdAt: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema({
    title : String,
    author : String,
    description : String,
    image : String,
    liked: { type: Boolean, default: false },
    comments: { type: [commentSchema], default: [] },
})

const Blog = mongoose.model('Blog' , blogSchema);
export default Blog;