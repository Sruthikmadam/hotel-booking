import React from 'react'
import './Hero.css'
import video from '../assets/hotelimg.mp4'

function Hero() {
  return (
    <div className="hero-section ">
        
        <section className="hero">
            <h1>Welcome to Your <span style={{color:'red'}}>Paradise</span></h1>
            <p>Your journey starts here.</p>
         </section>
         <div  className="background-video" >
        <video
            src={video} autoPlay muted loop
        /></div>
       <div className="hero-content">
       <button >
       <h1>Explore Us</h1> 
           
        </button></div>
    </div>
  )
}

export default Hero




