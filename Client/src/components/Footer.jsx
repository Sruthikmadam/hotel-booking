// Footer.jsx
import React from 'react';
import './Footer.css';

 function Footer() {
  const user=JSON.parse(localStorage.getItem('currentUser'))
function logout()
{
    localStorage.removeItem('currentUser');
    window.location.href='/hero' 
}
 return (



<footer className="bg-dark text-white mt-5">
  <div className=" footer py-4"style={{textAlign:"center"}}>
    <div className="row">
      
      
      <div className="col-md-4 mb-3">
        <h5 style={{textDecoration: "underline"}}>About Us</h5>
        
        <p >
          <h4 className='pt-4'>Welcome to hotel <span style={{color:"red"}}>Paradise </span>!</h4> 
          <h6 style={{    lineHeight: "25px"}}>"At <span style={{color:"red"}}>Paradise </span>, we offer the best deals for the best stays, ensuring your journey is as remarkable as your destination.".</h6>
        </p>
      </div>
      
      
      <div className="col-md-4 mb-3">
        <h5 style={{textDecoration: "underline"}}>Quick Links</h5>
       { user?<><ul className="list-unstyled"  style={{ lineHeight: "30px"}}>
          
          <li><a href="/home" class="text-white text-decoration-none">Home</a></li>
          <li><a href="/admin" class="text-white text-decoration-none">Admin Panel</a></li>
          <li><a href="#" onClick={logout}class="text-white text-decoration-none">logout</a></li>
          <li><a href="/profile" class="text-white text-decoration-none">bookings</a></li>
          <li><a href="#" class="text-white text-decoration-none">Contact</a></li>
        </ul></>:<><ul className="list-unstyled"  style={{ lineHeight: "30px"}}>
          
          <li><a href="/home" class="text-white text-decoration-none">Home</a></li>
          <li><a href="/login" class="text-white text-decoration-none">Login</a></li>
          <li><a href="/register" class="text-white text-decoration-none">Register</a></li>
          <li><a href="/" class="text-white text-decoration-none">Hero</a></li>
        </ul></>}
      </div>
      
      <div class="col-md-4 mb-3" id="contact-details">
        <h5 style={{textDecoration: "underline"}}>Contact Us</h5>
        <p><i class="fa fa-map-marker"></i> 1234 Hotel Street, City, Country</p>
        <p><i class="fa fa-phone"></i> +123 456 7890</p>
        <p><i class="fa fa-envelope"></i> info@hotelbooking.com</p>
        <div>
          <a href="#" class="text-white mr-2"><i class="fab fa-facebook"></i></a>
          <a href="#" class="text-white mr-2"><i class="fab fa-twitter"></i></a>
          <a href="#" class="text-white mr-2"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
    <div class="text-center pt-3 border-top border-light mt-3">
      <p class="mb-0" style={{ lineHeight: "20px"}}>&copy; 2024 Hotel Booking Agency. All Rights Reserved.</p>
    </div>
  </div>
</footer>
   );
   }
   
   export default Footer;
