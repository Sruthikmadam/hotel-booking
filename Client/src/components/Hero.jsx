import React from 'react'
import './Hero.css'
import video from '../assets/indiahotel1.mp4'
import { Link ,useNavigate} from 'react-router-dom'

function Hero() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'))
  if (user) {
    navigate('/home')
  }
  return (
    <div className="hero-section ">




      <section className="hero">
        <h1 style={{ color: 'red' }}>
          Welcome to Your <span style={{ color: 'red' }}>Paradise</span>
        </h1>
        <p>Your journey starts here.</p>
        <Link to="/home">
          <button className="btn" style={{ cursor: 'pointer' }}>
            Get Started
          </button>
        </Link>
      </section>
      <div className="background-video" >
        <video
          src={video} autoPlay muted loop
        />

      </div>
    
      {/* <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12">
            <div className="background-video position-relative">
              <video
                className="w-100 h-100 object-fit-cover"
                src={video}
                autoPlay
                muted
                loop
              />
            </div>
          </div>
        </div>
      </div> */}





    </div>
  )
}

export default Hero





// import React, { useEffect } from 'react';
// import './Hero1.css';
// import video from '../assets/indiahotel1.mp4';
// import {Link,  useNavigate } from 'react-router-dom';

// function Hero() {
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('currentUser'));
//     if (user) {
//       navigate('/home'); 
//     }
//   }, [navigate]);
//   const handleClick = () => {
//     navigate('/home');
//   };

//   return (
//     <div className="hero-section">
//       <section className="hero">
//         <h1 style={{ color: 'red' }}>
//           Welcome to Your <span style={{ color: 'yellow' }}>Paradaise</span>
//         </h1>
//         <p>Your journey starts here.</p>
//         <Link to="/home">
//           <get className="clicking" >
//           GetStarted
//           </get>
//         </Link>
//       </section>

//       <div className="background-video">
//         <video src={video} autoPlay muted loop />
//       </div>
//     </div>
//   );
// }

// export default Hero;


