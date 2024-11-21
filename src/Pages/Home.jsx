import React from 'react'
import Navbar from '../components/Navbar'
import Content from '../components/Content'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Content/>
        <Footer/>
    </div>
  )
}

export default Home