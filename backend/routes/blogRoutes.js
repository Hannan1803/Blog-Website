import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  toggleLike,
  addComment,
  deleteBlog,
  getComments
} from "../controllers/blogController.js";

const router = express.Router();

router.get('/blogs', getAllBlogs);
router.get('/blogs/:id' , getBlogById);
router.post('/createBlog' , createBlog);
router.put('/updateBlog/:id' , updateBlog);
router.put('/blog/:id/like' , toggleLike);
router.get('/comment/:id' , getComments)
router.put('/blog/:id/comment' , addComment);
router.delete('/deleteBlog/:id' , deleteBlog);


export default router;