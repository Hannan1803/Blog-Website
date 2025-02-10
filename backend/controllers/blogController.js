import Blog from "../models/blogModel.js";

export const getAllBlogs = async (req , res) => {
    try{
        const blogs = await Blog.find();
        res.json(
            blogs
        );
    }
    catch(err){
        res.status(500).json({
            message : "Something went wrong in getting the blog",
            error : err.message
        });
    }
};

export const getBlogById = async (req , res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            res.json({
                message : "Blog not found while searching with ID"
            });
        }
        res.json(blog);
    }
    catch(err){
        res.status(500).json({
            error : err.message
        })
    }
};

export const createBlog = async (req , res) => {
    try{
        const { title, author, description, liked , image } = req.body;
        if (!title || !author || !description) {
            return res.status(400).json({ error: "Title, author, and description are required" });
        }
        //const newBlog = new Blog(req.body);

        const newBlog = new Blog({
            title,
            author,
            description,
            image
        });
        await newBlog.save();

        res.status(201).json({
            message: "Blog created successfully",
            blog: newBlog
        });
    }
    catch(err){
        res.status(500).json({
            error : err.message
        });
    }
};

export const updateBlog = async(req , res) => {
    try{
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {$set : req.body},
            {new : true}
        );
        if(!updateBlog){
            res.status(400).json({
                message:"We couldn't find the updatedBlog !"
            })
        }   
        res.json({
            message : "Database for the particular blog has been updated",
            updatedBlog
        });
    }
    catch(err){
        res.status(500).json({
            error : "Failed to update due to some issues"
        });
    }
};

export const toggleLike = async(req , res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        blog.liked = !blog.liked;
        await blog.save();
        res.json({
            message:"Liked has been toggled",
            blog
        });
    }
    catch(err){
        res.status(500).json({
            error : "Something went wrong while toggling the like"
        });
    }
};

export const addComment = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Couldn't find the blog" });
        }

        const newComment = {
            text: req.body.comment,
            author: req.body.author || "Anonymous", // You can pass author from frontend
        };

        blog.comments.push(newComment);
        await blog.save();

        res.json({ message: "Comment added successfully", comment: newComment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getComments = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Couldn't find the blog" });
        }
        res.json(blog.comments); // Return structured comment objects
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteBlog = async(req,res) => {
    try{
        const blog = await Blog.deleteOne({ _id: req.params.id });
        res.json({
            message : "Deleted Successfully"
        });
    }
    catch(err){
        res.status(500).json({
            errpr : err.message
        })
    }
};