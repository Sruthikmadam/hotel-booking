
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import regimg from '../assets/regimg.webp'
function RegisterScreen() {
  const navigate = useNavigate(); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const register = async (e) => {
    e.preventDefault();

  
    if (password == confirmPassword) {
      const user = { name, email, password ,isAdmin:"false"};
      console.log(user)
      try {
        const response = await axios.post('http://localhost:5000/api/users/register', user);
        console.log(response.data)
       
        
            if (response.status >= 200 && response.status < 300) {
             
              navigate('/login');
              }
        
      }catch (err) {
        // Handle specific error messages from the backend
        if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message); // Display backend error message
        } else {
            setError('Registration failed. Please try again.');
        }
        console.error(err);
    }
    }
      else{
      setError('Passwords do not match');
      return;
    }
  }

  return (
     <div className='d-flex flex-column justify-content-center  align-items-center registerlogin '
      style={{
        backgroundImage: `url(${regimg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '600px',
        width: '100%',
      }} >
    <div className="container bs d-flex flex-column justify-content-center register align-items-center "style={{backgroundColor:'white'}}>
      <h2>Register</h2>
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
         {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary"onClick={register} disabled={loading}>
          {/* {loading ? 'Registering...' : 'Register'} */}
        register
        </button> 
        
      </form>
    </div>
     </div>
  );
}

export default RegisterScreen;
