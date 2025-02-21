import React from 'react'
import './Hero.css'
import video from '../assets/indiahotel1.mp4'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'))
  if (user) {
    navigate('/home')
  }
  const gohome = () => {
    navigate("/");
  }
  return (
    <div className="hero-section ">
      <section className="hero">
        <h1 style={{ color: 'red' }}>
          Welcome to Your <span style={{ color: 'red' }}>Paradise</span>
        </h1>
        <p>Your journey starts here.</p>

      </section>
      <div className="background-video" >
        <video
          src={video} autoPlay muted loop
        />

      </div>
    </div>
  )
}

export default Hero








