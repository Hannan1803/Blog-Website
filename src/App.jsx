import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'; 
import Home from './components/Home';
import AddBlogs from './components/AddBlogs'; 
import DetailedBlog from './components/DetailedBlog'; 
import Blogs from './components/Blogs'; 
import Comments from './components/Comments';
import About from './components/About';

const App = () => {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <NavBar />
        <main className='flex-grow'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/add-blogs" element={<AddBlogs />} />
            <Route path="/detailed-blogs/:id" element={<DetailedBlog />} />
          </Routes>
        </main>
        <About/>
      </div>
    </Router>
  );
};

export default App;
