import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import regimg from '../assets/hotel3.jpg'

function LoginScreen() {
  const navigate = useNavigate(); // To navigate to a different screen after successful login

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      const response = await axios.post( 'http://localhost:5000/api/users/login', { email, password }, { withCredentials: true })
console.log(response)
//  {headers: { 'Content-Type': 'application/json',}};
      if (response.status == 200) {
        // Save the token or user data if needed (e.g., in localStorage)
        // localStorage.setItem('currentUser', JSON.stringify(response.data));

        // console.log("Login successful",JSON.stringify(response.data));  
        // console.log(user)
        // let user=response.data 
        // if(user) {  
         navigate('/home');      
        window.location.reload();
      // }
      }
      setLoading(false);
    
    }catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Display the error message from the backend
      } else {
        setError('Login failed. Please check your email and password and try again.');
      }
      setLoading(false);
    }
  };

  return (
    <div className='d-flex flex-column justify-content-center  align-items-center registerlogin '
      style={{
        backgroundImage: `url(${regimg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: "600px",
        width: '100%',
      }} >
    <div className="container d-flex flex-column bs justify-content-center align-items-center w-30 w-md-50 w-lg-30 h-50vh h-md-30vh-lg-15vh" style={{ backgroundColor: 'white' }}> 
    <h2>Login</h2>
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button className="btn btn-primary">login
        </button>
      </form>
    </div></div>
  );
}

export default LoginScreen;
