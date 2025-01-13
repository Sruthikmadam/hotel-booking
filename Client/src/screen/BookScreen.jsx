
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
// import './BookScreen.css'

import StripeCheckout from 'react-stripe-checkout';

function BookScreen() {
  const { roomid ,fromdate,todate} = useParams(); // Retrieve roomid from URL parameters
  const [room, setRoom] = useState(null); // Single room object
  const [error, setError] = useState(null);
  const[totalamount,setTotalamount]=useState();
  const [loading, setLoading] = useState(true); // Initialize loading state
  const fromDateParsed = moment(fromdate, "DD-MM-YYYY");
  const toDateParsed = moment(todate, "DD-MM-YYYY");
 
  // Calculate the difference in days
  const totaldays = toDateParsed.diff(fromDateParsed, 'days')+1;

  
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/api/rooms/getroom', {
          roomid // Send roomid in the request body
        });
        setRoom(response.data); // Set the fetched room details
        setTotalamount(response.data.rentperday * totaldays)
      } catch (err) {
        console.error(err);
        setError('Failed to load room data'); // Set a custom error message
      } finally {
        setLoading(false);
      }
    };

    fetchRoom(); 
    
  }, [roomid]); 




  

  // async function bookRoom(){
    
  //   const bookingdetails = {
  //     roomname: room.name,
  //     roomid: room._id,
  //     userid: JSON.parse(localStorage.getItem("currentUser"))?.userid,
  //     username: JSON.parse(localStorage.getItem("currentUser"))?.name,
  //     fromdate,
  //     todate,
  //     totalamount,
  //     totaldays
      
  //   };
  
  //   console.log('Booking Details:', bookingdetails);
    

  //   try {
  //     const result = await axios.post( 'http://localhost:5000/api/bookings/bookroom', bookingdetails, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     console.log("Booking successful:", result.data);
  //   } catch (error) {
  //     console.error("Booking failed:", error.response?.data || error.message, error);
     
  //   }
  // }
 async function onToken(token){
  console.log(token);
  const bookingdetails = {
    roomname: room.name,
    roomid: room._id,
    userid: JSON.parse(localStorage.getItem("currentUser"))?.userid,
    username: JSON.parse(localStorage.getItem("currentUser"))?.name,
    fromdate,
    todate,
    totalamount,
    totaldays,
    token
    
  };

  console.log('Booking Details:', bookingdetails);
  

  // try {
  //   const result = await axios.post( 'http://localhost:5000/api/bookings/bookroom', bookingdetails, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   console.log("Booking successful:", result.data);
  // } catch (error) {
  //   console.error("Booking failed:", error.response?.data || error.message, error);
   
  // }
  try {
    const result = await axios.post(
        "http://localhost:5000/api/bookings/bookroom",
        bookingdetails,
        { headers: { "Content-Type": "application/json" } }
    );
    console.log("Booking successful:", result.data);
    window.location.href = '/profile';

} catch (error) {
    console.error("Booking failed:", error.response?.data || error.message, error);
    alert("Payment failed! Please try again.");
}
}
 
  return (
            <div className='container   paynow '>
                <div className='row justify-content-center   payrow bs'>
                   
                    {room && (
                        <div className='row flex-d ' >
                            <div className='col-md-7 photo'>
                               <h3 className='roomname'><b> {room.name}</b> </h3>
                                <img src={room.imageurls[0]} alt="Room" className='bigimg'  />
                            </div>
                            <div className='col-md-5 bookdetails'>
                                <div>
                                    <h1><b>Booking Details</b></h1>
                                    <hr />
                                    <b>
                                        <p>Name  :    {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                        <p>From Date  :  {fromdate}</p>
                                        <p>To Date  :  {todate}</p>
                                        <p>Max Count  :  {room.maxcount}</p>
                                    </b>
                                </div>
                                <div>
                                   <h1><b> Amount</b></h1>
                                    <hr />
                                    <p>Total Days  :  {totaldays}</p>
                                    <p>Rent per day  :  €{room.rentperday}</p>
                                    <p>Total Amount  :  €{totalamount} </p>
                                </div>
                                <div>
                                    
                                    {/* <StripeCheckout 
                                       token={onToken}
                                       stripeKey="pk_test_51QMQQAGqvtPyEPzCHfMb7aTbzl2p5y4SDMJt9ye3TsKV4C9TwOaZlvNovqqUZkN1Yp4cOOVuEdJucuhtYgOzMl9A00yO8jwqbH">
                               <button className='btn btn-primary'> Pay Now{""} </button>
                                 </StripeCheckout> */}
                                                      <StripeCheckout
        token={onToken}
        stripeKey="pk_test_51QMQQAGqvtPyEPzCHfMb7aTbzl2p5y4SDMJt9ye3TsKV4C9TwOaZlvNovqqUZkN1Yp4cOOVuEdJucuhtYgOzMl9A00yO8jwqbH"
        amount={totalamount*100} // Amount in cents (e.g., $50.00)
        currency="EUR" // Set the currency
        name={room.name}
       
      >
         <button className='btn btn-primary'>pay now</button>
      </StripeCheckout>


                                </div>
                                <div>
      
        
       
       
       
    </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
}

export default BookScreen;
