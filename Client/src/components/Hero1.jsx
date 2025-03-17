import React, { useState, useEffect } from "react";
import "./Hero1.css";
import hotel1 from "../assets/kerala1.webp";
 import hotel2 from "../assets/kerala6.jpg";
import hotel3 from "../assets/kerala5.avif";
import hotel4 from "../assets/kerala8.avif";
// import hotel5 from "../assets/kerala5.avif";


function Hero() {
  // const images = [hotel1, hotel2, hotel3,hotel4];
  const images=[hotel1, hotel2, hotel3,hotel4]

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-section">
      {/* Background images */}
      <div className="slideshow-container">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`slide ${index === currentIndex ? "active1" : ""}`}
            alt="Hotel"
          />
        ))}
      </div>

    
      <section className="hero">
        <h1>
          Welcome to Your <span>Paradise</span>
        </h1>
        <p>Stay, relax, and make memories</p>
        {/* <p>Explore our Houseboat fecilities</p> */}
      </section>
    </div>
  );
}

export default Hero;


