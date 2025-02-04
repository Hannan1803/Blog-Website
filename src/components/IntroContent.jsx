import React from 'react'
import frontPagePoster from '../assets/frontPagePoster.jpeg'
import ronaldoImage from '../assets/ronaldoImage.jpeg'

const IntroContent = () => {
  return (
    <>
      <div className='bg-gray-200 p-4 flex mt-10'>
        <div className='flex flex-col justify-center ml-10'>
            <h1 className='text-6xl m-2 '>Create your own blogs...</h1>
            <p className='m-2 text-xl'>Why not share your incredible ideas with the world on Blogram? It's the perfect platform for posting your own blogs, viewing the insightful writings of others, leaving thoughtful comments, and even sharing posts with friends! Connect, engage, and inspire the community.</p>
        </div>
        <div className='flex justify-center items-center w-3/4 h-1/2 mr-10 overflow-hidden'>
            <img src={frontPagePoster} alt="Poster Image 1" className='w-100 h-100 rounded-lg p-5 m-5 transition duration-300 hover:scale-105'/>
        </div>
      </div>
      
      <div className='bg-black p-4 flex text-white'>
        <div className='flex justify-center items-center w-3/4 h-1/2 ml-10 overflow-hidden'>
            <img src={ronaldoImage} alt="Poster Image 2" className='w-100 h-110 rounded-lg p-5 m-5 transition duration-300 hover:scale-105'/>
        </div>
        <div className='flex flex-col justify-center mr-10'>
            <h1 className='text-6xl m-2 '>Unleash Your Creativity...</h1>
            <p className='m-2 text-xl'>Imagine a place where your thoughts and creativity come alive! Blogram is your ultimate blogging destination. Dive into a world where you can publish your unique blogs, explore the fascinating posts of fellow bloggers, leave engaging comments, and effortlessly share content with your friends. Join us on Blogram and become part of an inspiring community that fosters connection and creativity</p>
        </div>
      </div>
    </>
  )
}

export default IntroContent
