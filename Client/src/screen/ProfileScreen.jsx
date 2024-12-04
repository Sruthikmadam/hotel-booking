import React ,{useEffect,useState} from 'react'
import regimg from '../assets/regimg.webp'
import {Tabs} from 'antd';
import axios from 'axios';
const {Tabpane}=Tabs

function ProfileScreen() {
    const user=JSON.parse(localStorage.getItem("currentUser"))
    useEffect(()=>{
        if(!user){
            window.location.href='/login'
        }
    },[])

  return (
    // <div className='d-flex flex-column justify-content-center  align-items-center registerlogin '
    // style={{
    // //   backgroundColor:'rgb(50,50,50,0.5)',
    //   backgroundSize: 'cover',
      
    //  background: 'linear-gradient(#0000FF, #87CEEB)',
    //   backgroundRepeat: 'no-repeat',
    //   height: "700px",
    //   width: '100%',
    //   position:"static",
    //   marginTop:'-50px'
    // }} >Profile</div>
    <div className='ml-3 mt-3 profile'>

        <Tabs defaultActiveKey='1'>
            <Tabpane tab="Profile" key="1">
                 <h1>  My profile</h1>
                 <br/>
                 <h1>Name:{user.name}</h1>
                 <h1>Email:{user.email}</h1>
                 <h1>IsAdmin:{user.isAdmin? "yes":"no"}</h1>
            </Tabpane>
            <Tabpane tab="Bookings" key='2'>
            <MyBooking/>
            </Tabpane>

        </Tabs>
    </div>
  )
}

export default ProfileScreen

export function MyBooking(){
    const user=JSON.parse(localStorage.getItem("currentUser"))
    const [bookings,setBookings]=useState([])
    useEffect(async()=>{
try {
    
    const rooms= await axios.post('http://localhost:5000/api/bookings/getBookingByUserId',{userid:user._id}).data
    setBookings(rooms)
} catch (error) {
    console.log(error)
    
}
    },[])
    return
    (
        <div className='row mybook'>
            <div className='col-md-6'>
                {bookings&&bookings.map(booking=>{
                  return( <div className='bs'>
                        <h1>{booking.name}</h1>
                        <p>BookingID:{booking._id}</p>
                        <p><b>Checkin:</b>{booking.fromdate}</p>
                       
                        <p><b>Checkout:</b>{booking.todate}</p>
                        <p><b>Amount:</b>{booking.totalamount}</p>
                        <p><b>Status:</b>{booking.status=='booked'?'confirmed':'cancelled'}</p>
                        
                        <div className='text-right'>
                            <button children="btn btn-primary">
                                cancel booking
                            </button>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}