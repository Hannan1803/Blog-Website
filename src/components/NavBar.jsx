import React from 'react'
import title1 from '../assets/title1.png'

const NavBar = () => {
  return (
    <>
    <nav className='flex justify-between border-b-2 border-gray-200 shadow-lg'>
        <img src={title1} alt="Title Image" className='h-8 m-3'/>
        <div className='justify-between m-3'>
            <ul className='flex gap-5'>
                <li className='transition duration hover:scale-105 hover:text-md'><a href="">Home</a></li>
                <li className='transition duration hover:scale-105 hover:text-md'><a href="">Blogs</a></li>
                <li className='transition duration hover:scale-105 hover:text-md'><a href="">Add Blog</a></li>
            </ul>
        </div>
    </nav>
    </>
  )
}

export default NavBar
