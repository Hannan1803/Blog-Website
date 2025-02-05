import React, { useEffect, useState } from 'react';
import { CircleUserRound, SendHorizontal } from 'lucide-react';

const Comments = ({ blogId, addComment, initialComments }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(initialComments || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      addComment(comment);
      setComments([...comments, comment]);
      setComment('');
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
            <div className='relative w-full '>
              <textarea
                rows={1}
                name="comment"
                id="commentBar"
                placeholder='Comment here'
                className='border border-black p-2 w-full resize-none outline-none rounded-xl pr-10 h-fit'
                value={comment}
                onChange={(e) => setComment(e.target.value)}>
              </textarea>
              <button 
                type="submit"
                className='transition duration-200 hover:scale-130 hover:cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-3.5'>
                <SendHorizontal height="25"/>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='flex'>
        {comments && comments.length > 0 && (
          <div className='flex flex-col '>
            {comments.map((com, index) => (
              <div className='flex flex-row p-4' key={index}>
                <CircleUserRound />
                <div className='border-b border-gray-300 ml-2'>
                  {com}
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
