import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleUserRound } from 'lucide-react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogData')) || [];
    setBlogs(storedBlogs);
  }, []);

  function editBlog(id) {
    const blogIndex = blogs.findIndex((blog) => blog.id === id);
    const newTitle = prompt('Enter new blog title:', blogs[blogIndex].blogTitle);
    const newDescription = prompt('Enter new blog description:', blogs[blogIndex].blogDes);
    const newAuthor = prompt('Enter new Author Name:', blogs[blogIndex].authorName);

    if (newTitle !== null && newDescription !== null && newAuthor !== null) {
      const updatedBlogs = [...blogs];
      updatedBlogs[blogIndex].blogTitle = newTitle;
      updatedBlogs[blogIndex].blogDes = newDescription;
      updatedBlogs[blogIndex].authorName = newAuthor;

    //   const fileInput = document.createElement('input');
    //   fileInput.type = 'file';
    //   fileInput.accept = 'image/*';

    //   fileInput.onchange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //       const reader = new FileReader();
    //       reader.onload = (e) => {
    //         updatedBlogs[blogIndex].image = e.target.result;
            
    //       };
    //       reader.readAsDataURL(file);
    //     } else {
    //       setBlogs(updatedBlogs);
    //       localStorage.setItem('blogData', JSON.stringify(updatedBlogs));
    //     }
    //   };

    //   fileInput.click();
    // } else {
    //   const updatedBlogs = [...blogs];
    //   setBlogs(updatedBlogs);
    //   localStorage.setItem('blogData', JSON.stringify(updatedBlogs));
    // }
    setBlogs(updatedBlogs);
    localStorage.setItem('blogData', JSON.stringify(updatedBlogs));
  }
  }

  function deleteBlog(id) {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs(updatedBlogs);
      localStorage.setItem('blogData', JSON.stringify(updatedBlogs));
    }
  }

  function navigateBlog(id) {
    const blogIndex = blogs.findIndex((blog) => blog.id === id);
    const updatedBlogs = [...blogs];
    updatedBlogs[blogIndex].views += 1;

    setBlogs(updatedBlogs);
    localStorage.setItem('blogData', JSON.stringify(updatedBlogs));

    navigate(`/detailed-blogs/${id}`);
  }

  return (
    <div className="mt-10 text-center bg-gray-200 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-10">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div 
            key={blog.id} 
            onClick={() => navigateBlog(blog.id)} 
            className="p-5 bg-white shadow-lg rounded-lg transition duration-300 hover:scale-105 cursor-pointer w-80 h-96 flex flex-col"
          >
            
            {blog.image ? (
              <img 
                src={blog.image} 
                alt="User Given Image"
                onError={(e) => (e.target.style.display = "none")} 
                className="w-full h-40 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-semibold rounded-lg">
                Image not Given
              </div>
            )}

            <h1 className="text-xl font-bold mt-3">{blog.blogTitle}</h1>

            
            <p className="text-gray-700 text-sm mt-2 truncate">
              {blog.blogDes.length > 100 ? blog.blogDes.substring(0, 100) + "..." : blog.blogDes}
            </p>

            <div className='flex items-center mt-4'>
              <CircleUserRound />
              <p className="text-xs text-gray-500 ml-1">Author: {blog.authorName}</p>
            </div>

            <div className="flex justify-between items-center mt-auto">
              <p className="text-black text-sm">👁️ {blog.views}</p> 

              <div className="flex gap-2">
                <button 
                  className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
                  onClick={(e) => { e.stopPropagation(); editBlog(blog.id); }}
                >
                  Edit
                </button>
                <button 
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                  onClick={(e) => { e.stopPropagation(); deleteBlog(blog.id); }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-xl col-span-3">No blogs available </p>
      )}
    </div>
  );
}

export default Blogs