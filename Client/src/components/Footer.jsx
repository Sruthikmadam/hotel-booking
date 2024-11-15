// Footer.jsx
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>PARADISE</h2>
          <p>Book your stay with us and enjoy world-class hospitality and comfort. Your perfect getaway awaits!</p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#rooms">Rooms</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: info@hotelbooking.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Hotel Ave, City, Country</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Hotel Booking. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
