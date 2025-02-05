import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Blogs from './components/Blogs'
import AddBlogs from './components/AddBlogs'
import Home from './components/Home'
import IntroContent from './components/IntroContent'
import About from './components/About'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DetailedBlog from './components/DetailedBlog'

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/add-blogs" element={<AddBlogs />} />
          <Route path="/detailed-blogs/:index" element={<DetailedBlog />} />
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
      {/* <IntroContent /> */}
      <About />
    </Router>
  )
}

export default App
