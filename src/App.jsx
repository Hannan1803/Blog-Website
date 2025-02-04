import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import IntroContent from './components/IntroContent'
import About from './components/About'

function App() {

  return (
    <>
    <NavBar />
    <IntroContent/>
    <About/>
    </>
  )
}

export default App
