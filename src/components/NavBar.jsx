import React from 'react';
import title1 from '../assets/title1.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='flex justify-between border-b-2 border-gray-200 shadow-lg fixed top-0 w-full bg-white z-50'>
      <img src={title1} alt="Title Image" className='h-8 m-3'/>
      <div className='justify-between m-3'>
        <ul className='flex gap-5'>
          <li className='transition duration hover:scale-105 hover:text-md'>
            <Link to="/">Home</Link>
          </li>
          <li className='transition duration hover:scale-105 hover:text-md'>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li className='transition duration hover:scale-105 hover:text-md'>
            <Link to="/add-blogs">Add Blog</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;
