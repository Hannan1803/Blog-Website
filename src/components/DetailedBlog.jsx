import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircleUserRound } from 'lucide-react';

const DetailedBlog = () => {
  const { index } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogData')) || [];
    setBlog(storedBlogs[index]);
  }, [index]);

  if (!blog) {
    return <p className="text-center text-xl">Blog not found</p>;
  }

  return (
    <>
    <div className='mt-15 bg-gray-200 p-5'>
        <div className='p-10 bg-white shadow-lg rounded-lg w-full'>
        <h1 className='text-3xl font-bold mb-3'>{blog.blogTitle}</h1>
        {blog.image && <img src={blog.image} alt="Blog" className='w-full mb-5 rounded-lg' />}
        <p className='text-md mb-4'>{blog.blogDes}</p>
        <div className='flex items-center'>
            <CircleUserRound />
            <p className='text-sm text-gray-500'>Author: {blog.authorName}</p>
        </div>
        </div>
    </div>
    </>
  );
}

export default DetailedBlog;
