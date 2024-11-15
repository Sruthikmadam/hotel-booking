// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Room from '../components/Room.jsx'
// import { useParams } from 'react-router-dom';
// function BookScreen(match) {
//       const { roomid } = useParams();
//     const [room, setRoom] = useState([]); // State to store rooms data
//     const [error, setError] = useState(); // State to handle errors
//     const [loading, setLoading] = useState(true); // State to handle errors

//     useEffect(() => {
//         const fetchRoom = async () => {
//             try {setLoading(true)
//                 const response = await axios.post('http://localhost:5000/api/rooms/getroombyid',{ roomid });// Ensure the correct endpoint
//                 setRoom(response.data); // Assuming the data structure has  

//                  console.log(room)
//                 //  console.log(rooms.length)
//                 console.log("data",response.data); 
//                 setLoading(false)
                
//             } catch (error) {
//                 setError(true)
//                 // console.error(error); // Log the error
//                 setError(error.message); // Set error state
//                 setLoading(false)
//             }
//           };

//                 fetchRoom(); // Call the fetch function
//     }, [roomid]);

//     return (
//         <div className='container'>
//             <div className='row justify-content-center mt-5'>


// {/* 
                                                 
//                  {loading? 
//                 (<h1>loading</h1>):room.map((room)=>{
//                 <div>

                     
//                     <div className='row'>
//                         <div className='col md-5'>
//                             <h2>{room.name}</h2>
//                             <img src={room.imgurls[0]} className='bigimg'/>
//                         </div>
//                         <div className='col md-5'> 
//                             <div>
//                             <h1>Booking Details</h1>
//                             <hr/>
//                             <b>
//                             <p>Name:</p>
//                             <p>From Date:</p>
//                             <p>To Date:</p>
//                             <p>Max Count:{roomModel.maxcount}</p></b>
//                             </div>
//                         <div>
//                                 <h2>Amount</h2>
//                                 <hr/>

//                                 <p>Total Days:</p>
//                                 <p>Rent per day:</p>
//                                 <p>Total Amount:</p>
//                         </div>
//                         <div>
//                                 <button className='btn btn-primary'>Pay Now</button>
//                         </div> 
//                         </div> 
                
//                 </div>
//                 </div> 
//                  }) }
//                                      */}
//                                      <h1> roomid:{roomid}</h1>
            
//             </div>
    
            
//         </div>
   
// )
// }
// export default BookScreen



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function BookScreen() {
//     const { roomid } = useParams(); // Get roomid from route parameters
//     const [rooms, setRooms] = useState([]); // State to store rooms data
//     const [error, setError] = useState(); // State to handle errors
//     const [loading, setLoading] = useState(true); // State to handle loading

//     useEffect(() => {
//         const fetchRooms = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get('http://localhost:5000/api/rooms/getroombyid', { params: { roomid } });
//                 setRooms(response.data); // Assuming response.data is the array of rooms
//                 console.log("data", response.data); 
//                 setLoading(false);
//             } catch (error) {
//                 setError(error.message); // Set error state
//                 setLoading(false);
//             }
//         };

//         fetchRooms(); // Call the fetch function
//     }, [roomid]); // Add roomid as a dependency to re-fetch if it changes

//     return (
//         <div className='container m-5'>
//             <div className='row justify-content-center mt-5'>
//                 {loading ? (
//                     <h1>Loading...</h1>
//                 ) : error ? (
//                     <h1>Error: {error}</h1>
//                 ) : (
//                     rooms.map((room) => (
//                         <div key={room._id} className='row justify-content-center'>
//                             <div className='col md-5'>
//                                 <h2>{room.name}</h2>
//                                 <img src={room.imgurls[0]} alt="Room" className='bigimg'/>
//                             </div>
//                             <div className='col md-5' style={{textAlign:'right'}}> 
//                                 <div>
//                                     <h1>Booking Details</h1>
//                                     <hr/>
//                                     <b>
//                                         <p>Name:</p>
//                                         <p>From Date:</p>
//                                         <p>To Date:</p>
//                                         <p>Max Count: {room.maxcount}</p>
//                                     </b>
//                                 </div>
//                                 <div>
//                                     <h2>Amount</h2>
//                                     <hr/>
//                                     <p>Total Days:</p>
//                                     <p>Rent per day:</p>
//                                     <p>Total Amount:</p>
//                                 </div>
//                                 <div>
//                                     <button className='btn btn-primary'>Pay Now</button>
//                                 </div> 
//                             </div> 
//                         </div> 
//                     ))
//                 )}
//             </div>
           
//         </div>
//     );
// }

// export default BookScreen;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function BookScreen() {
//     const { roomid } = useParams(); // Retrieve roomid from URL parameters
//     const [room, setRoom] = useState(null); // Single room object
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchRoom = async () => {
           
//             try {
//                 setLoading(true);
//                 const response = await axios.get('http://localhost:5005/api/rooms/getroombyid', 
//                     {params: {roomid}});
//                 setRoom(response.data);
//                   console.log("room response",response.data)
//                 // console.log({roomid})
//                  console.log("room",room)
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };

//         fetchRoom();
//     }, [roomid]);

//     if (loading) return <h1>Loading...</h1>;
//     if (error) return <h1>Error: {error}</h1>;

//     return (
//         <div className='container1'>
//             <div className='row justify-content-center mt-5'>
//                 <h1>Room ID: {roomid}</h1>
//                 <h1>Room ID: {room.name}</h1>
//                 {room && (
//                     <div className='row'>
//                         <div className='col-md-5'>
//                             <h2>{room.name}</h2>
//                             <img src={room.imageurls[0]} alt="Room" className='bigimg' />
//                         </div>
//                         <div className='col-md-5'>
//                             <div>
//                                 <h1>Booking Details</h1>
//                                 <hr />
//                                 <b>
//                                     <p>Name:</p>
//                                     <p>From Date:</p>
//                                     <p>To Date:</p>
//                                     <p>Max Count: {room.maxcount}</p>
//                                 </b>
//                             </div>
//                             <div>
//                                 <h2>Amount</h2>
//                                 <hr />
//                                 <p>Total Days:</p>
//                                 <p>Rent per day:</p>
//                                 <p>Total Amount:</p>
//                             </div>
//                             <div>
//                                 <button className='btn btn-primary'>Pay Now</button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default BookScreen;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';

function BookScreen(match) {
  const { roomid ,fromdate,todate} = useParams(); // Retrieve roomid from URL parameters
  const [room, setRoom] = useState(null); // Single room object
  const [error, setError] = useState(null);
  const[totalamount,setTotalamount]=useState();
  const [loading, setLoading] = useState(true); // Initialize loading state
  const fromDateParsed = moment(fromdate, "DD-MM-YYYY");
  const toDateParsed = moment(todate, "DD-MM-YYYY");
  // const baseURL = `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}`;
  
  

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

    fetchRoom(); // Fetch room data when the component mounts or roomid changes
  }, [roomid]); // Dependency array ensures useEffect runs when roomid changes

  async function bookRoom(){
    //const bookingdetails={
    //   roomname:room.name,
    //   roomid:room._id,
    //   userid:JSON.parse(localStorage.getItem("currentUser"))?._id,
    //   fromdate,
    //   todate,
    //   totalamount,
    //   totaldays
    // }
    const bookingdetails = {
      roomname: room.name,
      roomid: room._id,
      userid: JSON.parse(localStorage.getItem("currentUser"))?.userid,
      username: JSON.parse(localStorage.getItem("currentUser"))?.name,
      fromdate,
      todate,
      totalamount,
      totaldays,
    };
  console.log
    console.log('Booking Details:', bookingdetails);
  

    try {
      const result = await axios.post( 'http://localhost:5000/api/bookings/bookroom', bookingdetails, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Booking successful:", result.data);
    } catch (error) {
      console.error("Booking failed:", error);  // Log the entire error object
    }
  }

  // if (loading) return <h1>Loading...</h1>;
  // if (error) return <h1>Error: {error}</h1>;

  // return (
  //   <div className="container">
  //     {room && (
  //       <div>
  //         <h1>{room.name}</h1>
  //         <p>{room.description}</p>
  //         <img src={room.imageurls[0]} alt={room.name} className="room-image" />
  //         <button>Book Now</button>
  //       </div>
  //     )}
  //   </div>
  // );
  return (
            <div className='container   paynow '>
                <div className='row justify-content-center   payrow bs'>
                   
                    {room && (
                        <div className='row flex-d ' >
                            <div className='col-md-7'>
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
                                    <button className='btn btn-primary' onClick={bookRoom}>Pay Now</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
}

export default BookScreen;
