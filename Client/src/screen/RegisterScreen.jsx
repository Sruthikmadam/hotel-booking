

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function RegisterScreen() {
//     const navigate = useNavigate();

//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Basic validation for matching passwords
//         if (password !== confirmPassword) {
//             setError("Passwords do not match.");
//             return;
//         }

//         const user = { name, email, password ,isAdmin: false };

//         try {
//             setLoading(true);
//             setError('');

            
//             const response = await axios.post('http://localhost:5000/api/users/register', user);

//             if (response.status === 201) {
                
//                 navigate('/login');
//             }

//         } catch (err) {
//             setError('Registration failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container">
//             <h2>Register</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Name:</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter your name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         placeholder="Enter your email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Enter your password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Confirm Password:</label>
//                     <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Confirm your password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                     />
//                 </div>
//                 {error && <div className="alert alert-danger">{error}</div>}
//                 <button type="submit" className="btn btn-primary" disabled={loading}>
//                     {loading ? 'Registering...' : 'Register'}
//                 </button>
//             </form>
//         </div>
//     );
// }

//export default RegisterScreen;





import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import regimg from '../assets/regimg.webp'
function RegisterScreen() {
  const navigate = useNavigate(); // To navigate to a different screen after successful registration

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  

  // Handle form submission
  const register = async (e) => {
    e.preventDefault();

    // Basic validation (e.g., check if passwords match)
    if (password == confirmPassword) {
      const user = { name, email, password ,isAdmin:"false"};
      console.log(user)
      try {
        const response = await axios.post('http://localhost:5000/api/users/register', user);
        console.log(response.data)
        // if (response.status ===201) {
            if (response.status >= 200 && response.status < 300) {
             
               // Redirect to login screen or home page after successful registration
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







    //const user = { name, email, password };

    // try {
      // setLoading(true);
      // setError('');

      // Sending registration data to the backend API (replace with your backend URL)
  //     const response = await axios.post('http://localhost:5000/api/users/register', user);
  //     console.log(response.name)

  //     if (response.status === 200) {
  //       // Redirect to login screen or home page after successful registration
  //       navigate('/login');
  //     }
  //     setLoading(false);
  //   } catch (err) {
  //     setError(err);
  //     console.log(err)
  //     setLoading(false);
  //   }}
  // };






  return (
     <div className='d-flex flex-column justify-content-center  align-items-center register '
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
