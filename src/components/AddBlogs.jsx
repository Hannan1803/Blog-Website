import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBlogs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    authorName: '',
    blogTitle: '',
    blogDes: '',
    likes: false,
    comments: []
  });
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');

  function handleImage(event) {
    const img = event.target.files[0];
    if (img) {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onloadend = () => {
        setImage(reader.result);  // Convert image to Base64
        setImageName(img.name);
      };
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function removeImage() {
    setImage(null);
    setImageName('');
    document.getElementById("imageUpload").value = "";
  }

  async function sendToDatabase() {
    const blogData = {
      author: formData.authorName,
      title: formData.blogTitle,
      description: formData.blogDes,
      image: image,  // Send Base64 image
      likes: false,
      comments: formData.comments
    };

    try {
      const response = await fetch('http://localhost:3000/api/createBlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blogData)
      })
      const data = await response.json();
      // console.log("Response:", data);
      // console.log(response);
      if (response.ok) {
        console.log("Blog stored in DB");
        navigate('/blogs');
      } else {
        console.error("Failed to store blog");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    async function nav(){
      await sendToDatabase();
      navigate(`/blogs`);
    }
    nav();
  }

  return (
    <div className='mt-15 bg-gray-200 py-6 '>
      <div className='flex flex-col items-center p-10 w-fit border border-black mx-auto rounded-lg shadow-xl'>
        <form className='text-center' onSubmit={handleSubmit}>
          <h1 className='text-4xl m-5 p-2'>Create your own blog</h1>

          <h1 className='text-xl m-2 p-2'>Author Name:</h1>
          <input
            type="text"
            name='authorName'
            required
            className='text-md border border-black p-2 m-2 rounded-md w-120'
            placeholder='Enter Author name'
            value={formData.authorName}
            onChange={handleInputChange}
          />

          <h1 className='text-xl m-2 p-2'>Title:</h1>
          <input
            type="text"
            name='blogTitle'
            required
            className='text-md border border-black p-2 m-2 rounded-md w-120'
            placeholder='Enter title of your blog'
            value={formData.blogTitle}
            onChange={handleInputChange}
          />

          <h1 className='text-xl m-2 p-2'>Blog Content:</h1>
          <textarea
            name='blogDes'
            required
            className='text-md border border-black p-2 m-2 rounded-md h-50 w-120 text-left resize-none'
            placeholder='Enter Blog'
            value={formData.blogDes}
            onChange={handleInputChange}
          />

          <div className='flex items-center mt-4 ml-40'>
            <h1 className='mr-4 text-right'>Add Image:</h1>
            <label htmlFor="imageUpload" className='cursor-pointer flex items-center px-4 py-2 bg-green-400 text-white font-semibold rounded-lg shadow-md hover:bg-black focus:outline-none '>
              Choose File
            </label>
            <input type="file" name="imageUpload" id="imageUpload" className='hidden' onChange={handleImage} />
          </div>

          {image && (
            <div className='mt-4 p-2 border border-gray-400 rounded-lg bg-white flex flex-col items-center'>
              <p className='text-md text-gray-600'>{imageName}</p>
              <img src={image} alt="Preview" className='mt-2 w-32 h-32 object-cover rounded-lg' />
              <button className='m-4 p-3 rounded-lg bg-red-400 text-white transition duration-100 hover:cursor-pointer hover:bg-black' onClick={removeImage}>Remove Image</button>
            </div>
          )}
          
          <button type='submit' className='m-6 w-full p-3 rounded-2xl text-xl bg-black text-white transition duration-100 hover:cursor-pointer hover:bg-gray-400 hover:text-black hover:scale-102'>
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBlogs;
