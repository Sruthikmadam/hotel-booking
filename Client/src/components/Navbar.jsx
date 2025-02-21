import React from 'react'
import './Navbar.css'
import { useEffect, useState } from "react";
import axios from "axios"
import { useUser } from "../../UserContext.jsx";


function Navbar() {

    const { user, setUser } = useUser();
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
        console.log("User fetched:", user);
    }, [user]);

    return (
        <div className='header'>
            <nav className="navbar navbar-expand-lg  ">
                {user ? <a className="navbar-brand nav" style={{ color: 'yellow' }} href="/landing">Welcome to Paradise {user.name}</a> : <a className="navbar-brand nav" style={{ color: 'yellow' }} href="/">Paradise</a>}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon mr-4">

                        <i className="fa fa-bars" style={{ color: 'white' }}></i>
                    </span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul class="navbar-nav ms-auto ml-auto">
                        {user ? <><div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa-solid fa-user-tie" style={{ marginRight: '100px' }}></i> {user.name}
                            </button>
                            <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
                                <span><a className="dropdown-item " style={{ color: 'black' }} href="/profile">Profile</a></span>
                                <span> <a className="dropdown-item " style={{ color: 'black' }} href="/admin">Admin Panel</a></span>
                                <span> <a className="dropdown-item " style={{ color: 'black' }} href="/home">Kerala paradise</a></span>

                                <span> <a className="dropdown-item" style={{ color: 'black' }} onClick={logout}>Log Out</a></span>

                            </div>
                        </div>
                        </> :
                            <>         <li className="nav-item mr-5">
                                <a className="nav-link nav kerala" href="/home">Kerala paradise</a>
                            </li>
                                <li className="nav-item mr-5">
                                    <a className="nav-link nav" style={{ color: 'orange' }} href="#contact-details">Contact</a>
                                </li>
                                <li className="nav-item active mr-4">
                                    <a className="nav-link nav" style={{ color: 'white' }} href="/register">Register </a>
                                </li>
                                <li className="nav-item mr-5">
                                    <a className="nav-link nav" style={{ color: 'red' }} href="/login">Login</a>
                                </li>


                            </>
                        }
                    </ul>
                </div>
            </nav>
        </div>

    )
}

export default Navbar

