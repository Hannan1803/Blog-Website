import React, { useState } from 'react';

const AddBlogs = () => {
  const [formData, setFormData] = useState({
    authorName: '',
    blogTitle: '',
    blogDes: ''
  });
  const [image, setImage] = useState(null);

  function handleImage(event) {
    const img = event.target.files[0];
    setImage(URL.createObjectURL(img));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function getData(event) {
    event.preventDefault();
    console.log('Author Name:', formData.authorName);
    console.log('Blog Title:', formData.blogTitle);
    console.log('Blog Description:', formData.blogDes);
    console.log('Image URL:', image);
  }

  return (
    <div className='mt-15 bg-gray-200 py-6 w-screen'>
      <div className='flex flex-col items-center p-10 w-fit border border-black mx-auto rounded-lg shadow-xl'>
        <form className='text-center' onSubmit={getData}>
          <h1 className='text-4xl m-5 p-2'>Create your own blog</h1>

          <h1>Author Name:</h1>
          <input
            type="text"
            name='authorName'
            className='text-md border border-black p-2 m-2 rounded-md w-120'
            placeholder='Enter Author name'
            value={formData.authorName}
            onChange={handleInputChange}
          />

          <h1 className='text-xl m-2 p-2'>Title:</h1>
          <input
            type="text"
            name='blogTitle'
            className='text-md border border-black p-2 m-2 rounded-md w-120'
            placeholder='Enter title of your blog'
            value={formData.blogTitle}
            onChange={handleInputChange}
          />

          <h1 className='text-xl m-2 p-2'>Blog Content:</h1>
          <textarea
            name='blogDes'
            className='text-md border border-black p-2 m-2 rounded-md h-50 w-120 text-left'
            placeholder='Enter Blog'
            value={formData.blogDes}
            onChange={handleInputChange}
          />

          <div className='flex items-center mt-4 ml-40'>
            <h1 className='mr-4 text-right'>Add Image:</h1>
            <label htmlFor="imageUpload" className='cursor-pointer flex items-center px-4 py-2 bg-green-400 text-white font-semibold rounded-lg shadow-md hover:bg-black focus:outline-none '>
              Choose File
            </label>
            <input type="file" itemID='inpImage' name="imageUpload" id="imageUpload" className='hidden' onChange={handleImage} />
          </div>
          
          <button type='submit' className='m-6 w-full p-3 rounded-2xl text-xl bg-black text-white transition duration-100 hover:cursor-pointer hover:bg-gray-400 hover:text-black hover:scale-102' onClick={getData}>
            Post
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddBlogs;
