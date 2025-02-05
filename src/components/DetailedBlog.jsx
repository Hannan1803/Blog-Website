import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircleUserRound, Heart, MessageCircle } from 'lucide-react';
import Comments from './Comments';

const DetailedBlog = () => {
  const { index } = useParams();
  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogData')) || [];
    const currentBlog = storedBlogs.find(blog => blog.id.toString() === index);
    setBlog(currentBlog);
    if (currentBlog?.liked) {
      setLiked(true);
    }
  }, [index]);

  useEffect(() => {
    if (blog) {
      const updatedBlog = { ...blog, liked };
      const storedBlogs = JSON.parse(localStorage.getItem('blogData')) || [];
      const blogIndex = storedBlogs.findIndex(storedBlog => storedBlog.id === blog.id);
      storedBlogs[blogIndex] = updatedBlog;
      localStorage.setItem('blogData', JSON.stringify(storedBlogs));
    }
  }, [liked, blog]);

  const addComment = (comment) => {
    const updatedBlog = { ...blog, comment: [...blog.comment, comment] };
    setBlog(updatedBlog);

    const storedBlogs = JSON.parse(localStorage.getItem('blogData')) || [];
    const blogIndex = storedBlogs.findIndex(storedBlog => storedBlog.id === blog.id);
    storedBlogs[blogIndex] = updatedBlog;
    localStorage.setItem('blogData', JSON.stringify(storedBlogs));
  };

  if (!blog) {
    return <p className="text-center text-xl">Blog not found</p>;
  }

  return (
    <div className='mt-15 bg-gray-200 p-5'>
      <div className='p-10 bg-white shadow-lg rounded-lg w-full'>
        <h1 className='text-3xl font-bold mb-3'>{blog.blogTitle}</h1> 
        {blog.image && <img src={blog.image} alt="Blog" className='w-[20%] mb-5 rounded-lg' />}
        <p className='text-md mb-4'>{blog.blogDes}</p>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <CircleUserRound />
            <p className='text-sm text-gray-500'>Author: {blog.authorName}</p>
          </div>
          <div className='flex gap-3'>
            <button 
              onClick={() => setLiked(!liked)} 
              id='likeBtn' 
              className='flex border border-black p-2 rounded-3xl bg-gray-350 transition duration-200 hover:bg-black hover:text-white hover:cursor-pointer hover:scale-110'>
              {liked ? '❤️ Liked' : '🩶 Like'}
            </button>
            <button 
              id="commentBtn"
              onClick={() => setShowComment(!showComment)}
              className={`flex border border-black p-2 rounded-3xl transition duration-200 hover:cursor-pointer hover:scale-110 ${
                showComment ? 'bg-black text-white' : 'bg-gray-350'
              }`}>
              <MessageCircle /> Comment
            </button>
          </div>
        </div>
        {showComment && 
          <div className='bg-white mt-4 p-4 rounded-2xl w-full overflow-hidden'>
            <Comments blogId={blog.id} addComment={addComment} initialComments={blog.comment} />
          </div>
        }
      </div>
    </div>
  );
};

export default DetailedBlog;
