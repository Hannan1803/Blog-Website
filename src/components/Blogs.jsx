import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleUserRound } from 'lucide-react';
import one_piece from '../assets/one_piece.jpeg';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogData')) || [];
    setBlogs(storedBlogs);
  }, []);

  function editBlog(index) {
    const newTitle = prompt('Enter new blog title:', blogs[index].blogTitle);
    const newDescription = prompt('Enter new blog description:', blogs[index].blogDes);
    const newAuthor = prompt('Enter new Author Name:', blogs[index].authorName);
  
    if (newTitle !== null && newDescription !== null && newAuthor !== null) {
      const updatedBlogs = [...blogs];
      updatedBlogs[index].blogTitle = newTitle;
      updatedBlogs[index].blogDes = newDescription;
      updatedBlogs[index].authorName = newAuthor;
  
      // Create a file input dynamically
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
  
      fileInput.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            updatedBlogs[index].image = e.target.result; // Store base64 image URL
            setBlogs(updatedBlogs);
            localStorage.setItem('blogData', JSON.stringify(updatedBlogs));
          };
          reader.readAsDataURL(file);
          console.log(blogs[index]);
        } else {
          setBlogs(updatedBlogs);
          localStorage.setItem('blogData', JSON.stringify(updatedBlogs));
        }
      };
  
      // Trigger file selection dialog
      fileInput.click();
    }
  }
  

  function deleteBlog(index) {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const updatedBlogs = blogs.filter((_, i) => i !== index);
      setBlogs(updatedBlogs);
      localStorage.setItem('blogData', JSON.stringify(updatedBlogs));
    }
  }

  function navigateBlog(index) {
    const updatedBlogs = [...blogs];
    updatedBlogs[index].views += 1; // Increment the views count

    setBlogs(updatedBlogs);
    localStorage.setItem('blogData', JSON.stringify(updatedBlogs));

    navigate(`/detailed-blogs/${index}`);
  }

  function sampleText(){
    
  }

  return (
    <div className="mt-10 text-center bg-gray-200 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-10">

    {/* FAKE ONE  */}
    <div className='p-5 bg-white shadow-lg rounded-lg transition duration-300 hover:scale-105 cursor-pointer w-80 h-96 flex flex-col'>
      <img 
        src={one_piece} 
        alt="One Piece Image" 
        className="w-full h-40 object-cover rounded-lg"
      />
      <h1 className="text-xl font-bold mt-3">One Piece</h1>

      
      <p className="text-gray-700 text-sm mt-2 truncate">
        One Piece (stylized in all caps) is a Japanese manga series written and illustrated by Eiichiro Oda. 
      </p>

      <div className='flex items-center mt-4'>
            <CircleUserRound />
            <p className="text-xs text-gray-500 ml-1">Author: Eichiro Oda</p>
      </div>

      <div className="flex justify-between items-center mt-auto">
              <p className="text-black text-sm">👁️ {0}</p> {/* Display view count */}

              <div className="flex gap-2">
                <button 
                  className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
                  onClick={(e) => { e.stopPropagation(); editBlog(index); }}
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                  onClick={(e) => { e.stopPropagation(); deleteBlog(index); }}
                >
                  Delete
                </button>
              </div>
            </div>

    </div>

      {/* REAL ONE */}
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <div 
            key={index} 
            onClick={() => navigateBlog(index)} 
            className="p-5 bg-white shadow-lg rounded-lg transition duration-300 hover:scale-105 cursor-pointer w-80 h-96 flex flex-col"
          >
            {/* Image Handling */}
            {blog.image ? (
              <img 
                src={blog.image} 
                alt="User Given Image"
                onError={(e) => (e.target.style.display = "none")} // Hide image if it fails to load
                className="w-full h-40 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-semibold rounded-lg">
                Image not Given
              </div>
            )}

            <h1 className="text-xl font-bold mt-3">{blog.blogTitle}</h1>

            {/* Shortened Description with "..." */}
            <p className="text-gray-700 text-sm mt-2 truncate">
              {blog.blogDes.length > 100 ? blog.blogDes.substring(0, 100) + "..." : blog.blogDes}
            </p>

            <div className='flex items-center mt-4'>
              <CircleUserRound />
              <p className="text-xs text-gray-500 ml-1">Author: {blog.authorName}</p>
            </div>

            <div className="flex justify-between items-center mt-auto">
              <p className="text-black text-sm">👁️ {blog.views}</p> {/* Display view count */}

              <div className="flex gap-2">
                <button 
                  className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
                  onClick={(e) => { e.stopPropagation(); editBlog(index); }}
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                  onClick={(e) => { e.stopPropagation(); deleteBlog(index); }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-xl col-span-3">No blogs available</p>
      )}
    </div>
  );
}

export default Blogs;
