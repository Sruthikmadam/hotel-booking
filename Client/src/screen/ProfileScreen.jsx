// import React ,{useEffect,useState} from 'react'
// import regimg from '../assets/regimg.webp'
// import {Tabs} from 'antd';
// import axios from 'axios';
// const {TabPane}=Tabs

// function ProfileScreen() {
//     const user=JSON.parse(localStorage.getItem("currentUser"))
//     useEffect(()=>{
//         if(!user){
//             window.location.href='/login'
//         }
//     },[user])




//   return (
    
//     <div className='ml-3 mt-3 profile'>

//         <Tabs defaultActiveKey='1'>
//             <TabPane tab="Profile" key="1">
//                  <h1>  My profile</h1>
//                  <br/>
//                  <h1>Name:{user.name}</h1>
//                  <h1>Email:{user.email}</h1>
//                  <h1>IsAdmin:{user.isAdmin? "yes":"no"}</h1>
//             </TabPane>
//             <TabPane tab="Bookings" key='2'>
//             <MyBooking/>
            

//             </TabPane>

//         </Tabs>
//     </div>
//   )
// }

// export default ProfileScreen

// // export function MyBooking(){
// //     const user=JSON.parse(localStorage.getItem("currentUser"))
// //     const userid=user.userid
// //     const [bookings,setBookings]=useState([])
// //     useEffect(()=>{
// // try {
    
// //     const rooms= axios.post('http://localhost:5000/api/bookings/getBooking',{userid:user.id}).data
// //     setBookings(rooms)
// // } catch (error) {
// //     console.log(error)
    
// // }
// //     },[])

// export function MyBooking() {
//     const user = JSON.parse(localStorage.getItem("currentUser"));
//     const [bookings, setBookings] = useState([]);
//     // console.log("username is",user)
//     const userid=user.userid
//     // console.log("userid is",userid)

//     useEffect(() => {
//         // Define an async function inside useEffect
//         const fetchBookings = async() => {
            
//             try {
//                 const response = await axios.post('http://localhost:5000/api/bookings/getBooking', { userid });
//                 setBookings(response.data); // Assuming `response.data` contains the bookings
//                 // console.log(response.data)
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchBookings(); // Call the async function
//     }, [userid]); // Dependency array
//     return
//     (
//     //     <div className='row mybook'>
//     //         <h1>my booking</h1>
//     //         <div className='col-md-6'>
//     //             {bookings&&bookings.map(booking=>{
//     //               return( <div className='bs'>
//     //                     <h1>{booking.name}</h1>
//     //                     <p>BookingID:{booking._id}</p>
//     //                     <p><b>Checkin:</b>{booking.fromdate}</p>
                       
//     //                     <p><b>Checkout:</b>{booking.todate}</p>
//     //                     <p><b>Amount:</b>{booking.totalamount}</p>
//     //                     <p><b>Status:</b>{booking.status=='booked'?'confirmed':'cancelled'}</p>
                        
//     //                     <div className='text-right'>
//     //                         <button children="btn btn-primary">
//     //                             cancel booking
//     //                         </button>
//     //                     </div>
//     //                 </div>)
//     //             })}
//     //         </div>
//     //     </div>
//     // );

//     <div className="row mybook">
//     <div className="col-md-6">
//         {bookings && bookings.length > 0 ? (
//             bookings.map((booking, index) => (
//                 <div className="bs" key={index}>
//                     <h1>{booking.name}</h1>
//                     <p>BookingID: {booking._id}</p>
//                     <p>
//                         <b>Checkin:</b> {booking.fromdate}
//                     </p>
//                     <p>
//                         <b>Checkout:</b> {booking.todate}
//                     </p>
//                     <p>
//                         <b>Amount:</b> {booking.totalamount}
//                     </p>
//                     <p>
//                         <b>Status:</b>{' '}
//                         {booking.status === 'booked' ? 'Confirmed' : 'Cancelled'}
//                     </p>
//                     <div className="text-right">
//                         <button className="btn btn-primary">Cancel Booking</button>
//                     </div>
//                 </div>
//             ))
//         ) : (
//             <p>No bookings found.</p>
//         )}
//     </div>
// </div>
// );
// } 



import React, { useEffect, useState } from 'react';
import regimg from '../assets/regimg.webp';
import { Tabs } from 'antd';
import axios from 'axios';
import Swal from "sweetalert2"
import { Tag } from 'antd';

function ProfileScreen() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }
    }, [user]);

    const tabItems = [
        {
            label: 'Profile',
            key: '1',
            children: (
                <div>
                    <h1>My Profile</h1>
                    <br />
                    <h1>Name: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                    <h1>IsAdmin: {user.isAdmin ? 'yes' : 'no'}</h1>
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
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [bookings, setBookings] = useState([]);
    const userid = user.userid;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/bookings/getBooking', {
                    userid,
                });
                setBookings(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBookings();
    }, [userid]);
    async function cancelBooking(bookingid,roomid){
    try {
      const result= await axios.post ("http://localhost:5000/api/bookings/cancelBooking",{bookingid,roomid}).data
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
