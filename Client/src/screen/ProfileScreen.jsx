
import React, { useEffect, useState } from 'react';
import regimg from '../assets/regimg.webp';
import { Tabs } from 'antd';
import axios from 'axios';
import Swal from "sweetalert2"
import { Tag } from 'antd';

 import { useUser } from "../../UserContext.jsx";

function ProfileScreen() {
    // const[user,setUser]=useState()
    // const user = JSON.parse(localStorage.getItem('currentUser'));
     const { user, setUser } = useUser();
    console.log("user profile",user)
    // useEffect(() => {
    //     console.log("User state:", user); 
    //     if (user === undefined) return; 
    //     if (!user) {
    //         console.log("Redirecting to login...");
    //         window.location.href = '/login';
    //     }
    // }, [user]);
    

    const tabItems = [
        {
            label: 'Profile',
            key: '1',
            children: (
                <div>
                    <h1>My Profile</h1>
                    <br />
                    <h1>Name: {user?.name}</h1>
                    <h1>Email: {user?.email}</h1>
                    <h1>IsAdmin: {user?.isAdmin ? 'yes' : 'no'}</h1>
                </div>
            ),
        },
        {
            label: 'Bookings',
            key: '2',
            children: <MyBooking />,
        },
    ];

    return (
        <div className="ml-3 mt-3 profile">
            <Tabs defaultActiveKey="1" items={tabItems} />
        </div>
    );
}

export default ProfileScreen;

export function MyBooking() {
    // const user = JSON.parse(localStorage.getItem('currentUser'));
    const {user,setUser}=useUser()
    const [bookings, setBookings] = useState([]);
    const userid = user._id;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/bookings/getBooking', {
                    userid},{ withCredentials: true }
                );
                setBookings(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBookings();
    }, [userid]);
    async function cancelBooking(bookingid,roomid){
    try {
      const result= await axios.post ("http://localhost:5000/api/bookings/cancelBooking",{bookingid,roomid},{ withCredentials: true }).data
    console.log(result)
    Swal.fire("congrates,booking cancelled succesfully").then(result=>
        window.location.reload()
    )
    } catch (error) {
        console.log(error)
        Swal.fire("OOps","sothing went wrong","error")
        
    }
    }

    return (
        <div className="row mybook">
            <div className="col-md-6">
                {bookings && bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <div className="bs" key={index}>
                            <h1>{booking.name}</h1>
                            <p>BookingID: {booking._id}</p>
                            <p>
                                <b>Checkin:</b> {booking.fromdate}
                            </p>
                            <p>
                                <b>Checkout:</b> {booking.todate}
                            </p>
                            <p>
                                <b>Amount:</b> {booking.totalamount}
                            </p>
                            <p>
                                {/* <b>Status:</b> {booking.status === 'booked' ? 'Confirmed' : 'Cancelled'} */}
                                {booking.status=="cancelled"?<Tag color="red">Cancelled</Tag>:<Tag color="green">Confirmed</Tag>}
                            </p>
                            {booking.status!=="cancelled"&&
                            <div className="text-right">
                                <button className="btn btn-primary" onClick={()=>{cancelBooking(booking._id,booking.roomid)}}>Cancel Booking</button>
                            </div>}
                        </div>
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
        </div>
    );
}
