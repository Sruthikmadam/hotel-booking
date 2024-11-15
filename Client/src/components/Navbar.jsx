import React from 'react'
import './Hero.css'
// import { Navigate } from 'react-router-dom';


function Navbar() {
const user=JSON.parse(localStorage.getItem('currentUser'))
function logout()
{
    localStorage.removeItem('currentUser');
    window.location.href='/hero'
    // Navigate('/login')
    // window.location.reload();
    // navigate('/login', { replace: true }); 
}

    return (
        <div className='header'>
            <nav className="navbar navbar-expand-lg  ">
            <a className="navbar-brand"  href="#">Hotel Paradise</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon mr-4">
                
            
                    
                    
          <i className="fa fa-bars" style={{color:'white'}}></i>
                    </span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav ms-auto">
        {user?<><div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa-solid fa-user-tie" style={{marginRight:'10px'}}></i> {user.name}
            </button>
            <div className="dropdown-menu"  aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item " style={{color:'black'}} href="#">bookings</a>
              <a className="dropdown-item"  style={{color:'black'}} href="#" onClick={logout}>Log Out</a>
             
            </div>
          </div></>:
          <>
                    <li className="nav-item active mr-4">
                        <a className="nav-link"  href="/register">Register </a>
                    </li>
                    <li className="nav-item mr-5">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
                    </>
}
        </ul>
            </div>
            </nav>
        </div>
//         <header>
//         <nav class="navbar">
//             <a href="#" class="logo">HOTEL PARADISE</a>
//             <ul class="nav-links mr-5">
//                 {user?<><div class="dropdown">
//   <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//     {user.name}
//   </button>
//   <div class="dropdown-menu"  aria-labelledby="dropdownMenuButton">
//     <a class="dropdown-item " style={{color:'black'}} href="#">bookings</a>
//     <a class="dropdown-item"  style={{color:'black'}} href="#" onClick={logout}>Log Out</a>
   
//   </div>
// </div></>:
//                 <>
//                 <li class="nav-item active">
//                        <a class="nav-link" href="/register">Register </a>
//                   </li>
//                   <li class="nav-item">
//                        <a class="nav-link" href="/login">Login</a>
//                   </li>
//                 </>}
            
               
//             </ul>
//         </nav>
//     </header>
    )
}

export default Navbar