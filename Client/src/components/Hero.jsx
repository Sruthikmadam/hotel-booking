import React from 'react'
import './Hero.css'
import video from '../assets/hotelimg.mp4'

function Hero() {
  const user=JSON.parse(localStorage.getItem('currentUser'))
  if(user){
    window.location.href='/home' 
  }
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
       
       <a href='/home'>Explore Us</a> 
           
       </div>
    </div>
  )
}

export default Hero





