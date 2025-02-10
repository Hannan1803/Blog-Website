import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch Blogs from Database
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        
        const data = await response.json();
        console.log("Fetched Blogs:", data); 
  
        setBlogs(data); // Try setting directly
        console.log("Setting Blogs:", data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      }
    };
    fetchBlogs();
  }, []);
  
  
  useEffect(() => {
    console.log("Updated Blogs State:",blogs.length); // ✅ Log blogs after state is updated
  }, [blogs]);

  // Edit Blog and Update in Database
  async function editBlog(id) {
    const blogIndex = blogs.findIndex((blog) => blog._id === id);
    if (blogIndex === -1) return;

    const newTitle = prompt("Enter new blog title:", blogs[blogIndex].title);
    const newDescription = prompt("Enter new blog description:", blogs[blogIndex].description);
    const newAuthor = prompt("Enter new Author Name:", blogs[blogIndex].author);

    if (newTitle && newDescription && newAuthor) {
      const updatedBlog = { 
        ...blogs[blogIndex], 
        title: newTitle, 
        description: newDescription, 
        author: newAuthor 
      };

      try {
        const response = await fetch(`http://localhost:3000/api/updateBlog/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBlog),
          
        });
        console.log(response);
        if (!response.ok) throw new Error("Failed to update blog");


        setBlogs((prev) => prev.map((b) => (b._id === id ? updatedBlog : b))); // Safe state update
      } catch (error) {
        console.error("Error updating blog:", error);
      }
    }
  }

  // Delete Blog from Database
  async function deleteBlog(id) {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(`http://localhost:3000/api/deleteBlog/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete blog");

        setBlogs((prev) => prev.filter((blog) => blog._id !== id)); // Remove from UI safely
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  }

  // Navigate to Blog Detail Page
  function navigateBlog(id) {
    navigate(`/detailed-blogs/${id}`);
  }

  function createFirst() {
    navigate(`/add-blogs`);
  }

  return (
    <div className="mt-10 text-center bg-gray-200 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-10 h-210 overflow-x-scroll">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            key={blog._id}
            onClick={() => navigateBlog(blog._id)}
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

            <h1 className="text-xl font-bold mt-3">{blog.title}</h1>

            <p className="text-gray-700 text-sm mt-2 truncate">
              {blog.description?.length > 100 ? blog.description.substring(0, 100) + "..." : blog.description}
            </p>

            <div className="flex items-center mt-4">
              <CircleUserRound />
              <p className="text-xs text-gray-500 ml-1">Author: {blog.author}</p>
            </div>

            <div className="flex justify-between items-center mt-auto">
              <p className="text-black text-sm">👁️ {blog.views || 0}</p>

              <div className="flex gap-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
                  onClick={(e) => { e.stopPropagation(); editBlog(blog._id); }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                  onClick={(e) => { e.stopPropagation(); deleteBlog(blog._id); }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="mx-auto text-xl">
          No blogs available
          <button
            onClick={createFirst}
            className="border border-black ml-5 m-2 p-3 rounded-4xl bg-green-300 text-black transition duration-300 hover:cursor-pointer hover:scale-102 hover:bg-black hover:text-white"
          >
            + Create Your First Blog
          </button>
        </p>
      )}
    </div>
  );
};

export default Blogs;
