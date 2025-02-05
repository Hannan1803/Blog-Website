import React from 'react'

const About = () => {
  return (
    <>
      <div className='flex justify-between p-4'>
        <div className='flex flex-row justify-center gap-2 m-3'>
            <p><a href="#">Instagram</a></p>
            <p>|</p>
            <p><a href="#">Facebook</a></p>
            <p>|</p>
            <p><a href="#">X</a></p>
            <p>|</p>
            <p><a href="#">LinkedIn</a></p>
        </div>
        <div className='flex flex-row justify-center gap-2 m-3'>
            <p>© 2024 BloGram. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}

export default About
