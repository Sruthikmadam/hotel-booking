import React from 'react'
import './Hero.css'
import video from '../assets/indiahotel1.mp4'
import video1 from '../assets/hotel1.jpg'
import video2 from '../assets/hotel.jpg'
import video3 from '../assets/hotel3.jpg'
import {useState,useEffect} from 'react'

function Hero() {
  // const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem('currentUser'))
  // if (user) {
  //   navigate('/home')
  // }
  // const gohome = () => {
  //   navigate("/");
  // }


  const images = [
   video1,video2,video3
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="hero-section ">
      <section className="hero">
        <h1 style={{ color: 'red' }}>
          Welcome to Your <span style={{ color: 'red' }}>Paradise</span>
        </h1>
        <p>Stay, relax, and make memories</p>

      </section>
      {/* <div className="background-video" > */}
        {/* <video
          src={video} autoPlay muted loop
        /> */}

      {/* </div> */}

      <div className="relative h-screen w-full overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          alt="Hotel Background"
        />
      ))}
    </div>
    </div>
  )
}

export default Hero








