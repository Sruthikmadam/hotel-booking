


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../UserContext.jsx";


const Footer = () => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  const logout = async () => {

    try {
      await axios.get("http://localhost:5000/api/logout", {
        withCredentials: true,
      });

      setUser(null);

      window.location.href = "/";


    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []); //  it runs only on mount

  useEffect(() => {
    console.log("User fetched:", user);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <footer className=" text-white mt-5"style={{ backgroundColor: "var(--primary-color)",
    opacity:" 0.95"
     }}
>
      <div className="footer py-4" style={{ textAlign: "center" }}>
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 style={{ textDecoration: "underline" }}>About Us</h5>
            <h4 className="pt-4">
              Welcome to your <span style={{ color: "red" }}>Paradise </span>!
            </h4>
            <h6 style={{ lineHeight: "25px" }}>
              "At <span style={{ color: "red" }}>Paradise </span>, we offer the best deals for the best stays, ensuring your journey is as remarkable as your destination."
            </h6>
          </div>

          <div className="col-md-4 mb-3">
            <h5 style={{ textDecoration: "underline" }}>Quick Links</h5>
            {user ? (
              <ul className="list-unstyled" style={{ lineHeight: "30px" }}>
                <li>
                  <a href="/home" className="text-white text-decoration-none">
                    Kerala paradise
                  </a>
                </li>
                <li>
                  <a href="/admin" className="text-white text-decoration-none">
                    Admin Panel
                  </a>
                </li>
                <li>
                  <a onClick={logout} className="text-white text-decoration-none">
                    Logout
                  </a>
                </li>
                <li>
                  <a href="/profile" className="text-white text-decoration-none">
                    Bookings
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Contact
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="list-unstyled" style={{ lineHeight: "30px" }}>
                <li>
                  <a href="/home" className="text-white text-decoration-none">
                    Kerala paradise
                  </a>
                </li>
                <li>
                  <a href="/login" className="text-white text-decoration-none">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/register" className="text-white text-decoration-none">
                    Register
                  </a>
                </li>
                <li>
                  <a href="/" className="text-white text-decoration-none">
                    Hero
                  </a>
                </li>
              </ul>
            )}
          </div>

          <div className="col-md-4 mb-3" id="contact-details">
            <h5 style={{ textDecoration: "underline" }}>Contact Us</h5>
            <p><i className="fa fa-map-marker"></i> MG Road -24, Delhi, India</p>
            <p><i className="fa fa-phone"></i> +9123 456 7890</p>
            <p><i className="fa fa-envelope"></i> info@delhiparadise.com</p>
          </div>
        </div>
        <div className="text-center pt-3 border-top border-light mt-3">
          <p className="mb-0">&copy; 2024 Hotel Booking Agency. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

