import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircleUserRound, MessageCircle } from 'lucide-react';
import Comments from './Comments';

const DetailedBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);

  // Fetch blog data from the database
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/blogs/${id}`);
        if (!response.ok) throw new Error('Failed to fetch blog');
        
        const data = await response.json();
        console.log(data);
        setBlog(data);
        setLiked(data.liked);
        
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
      console.log("id is " , id);
      
    };
    if (id) fetchBlog();
    else console.log("id is " , id);
  }, [id]);

  // Handle Like Toggle
  const toggleLike = async () => {
    try {
      const updatedLiked = !liked;  
      setLiked(updatedLiked);

      await fetch(`http://localhost:3000/api/blog/${id}/like`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liked: updatedLiked }),
      });

    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  // Add a comment and update the database
  const addComment = async (comment) => {
    try {
      const updatedBlog = { ...blog, comment: [...blog.comment, comment] };
      setBlog(updatedBlog);

      await fetch(`http://localhost:3000/api/blogs/${blog.id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
      });

    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!blog) {
    return <p className="text-center text-xl">Blog not found</p>;
  }

  return (
    <div className='mt-15 bg-gray-200 p-5'>
      <div className='p-10 bg-white shadow-lg rounded-lg w-full'>
        <h1 className='text-3xl font-bold mb-3'>{blog.title}</h1> 
        {blog.image && <img src={blog.image} alt="Blog" className='w-[20%] mb-5 rounded-lg' />}
        <p className='text-md mb-4'>{blog.description}</p>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <CircleUserRound />
            <p className='text-sm text-gray-500'>Author: {blog.author}</p>
          </div>
          <div className='flex gap-3'>
            <button 
              onClick={toggleLike} 
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
