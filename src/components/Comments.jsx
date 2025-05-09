import React, { useEffect, useState } from 'react';
import { CircleUserRound, SendHorizontal } from 'lucide-react';

const Comments = ({ blogId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Fetch comments from the database
  useEffect(() => {
    const fetchComments = async () => {
        try {
            const response = await fetch(`/api/comments/${blogId}`);
            if (response.ok) {
                const data = await response.json();
                setComments(data); // Now, data contains text, author, and timestamp
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };
    fetchComments();
}, [blogId]);


  // Handle comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
        const response = await fetch(`/api/comments/${blogId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment, author: "User123" }), // Send author
        });

        if (response.ok) {
            const data = await response.json();
            setComments([...comments, data.comment]); // Update UI dynamically
            setComment('');
        }
    } catch (error) {
        console.error("Error adding comment:", error);
    }
};


  return (
    <>
      <div className='text-black'>
        <form onSubmit={handleSubmit} className='flex-col items-center'>
          <div className='flex items-center'>
            <CircleUserRound />
            <h1 className='text-xl'> Add new Comment :</h1>
          </div>
          <div className='flex gap-3 items-center ml-6 relative shrink-0'>
            <div className='relative w-full'>
              <textarea
                rows={1}
                name="comment"
                placeholder='Comment here'
                className='border border-black p-2 w-full resize-none outline-none rounded-xl pr-10 h-fit'
                value={comment}
                onChange={(e) => setComment(e.target.value)}>
              </textarea>
              <button 
                type="submit"
                className='transition duration-200 hover:scale-110 hover:cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-3.5'>
                <SendHorizontal height="25"/>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='flex'>
        {comments.length > 0 && (
          <div className='flex flex-col'>
            {comments.map((com, index) => (
              <div className='flex flex-row p-4' key={index}>
                <CircleUserRound />
                <div className='border-b border-gray-300 ml-2'>
                  {com.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Comments;
