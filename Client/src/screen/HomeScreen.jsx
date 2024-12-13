// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Room from '../components/Room.jsx'
// import { DatePicker, Space } from 'antd';
// import 'antd/dist/reset.css';
// import moment from 'moment';
// const { RangePicker } = DatePicker;
// function HomeScreen() {
//     const [rooms, setRooms] = useState([]); // State to store rooms data
//     const [todate, setTodate] = useState(); 
//     const [fromdate, setFromdate] = useState(); 
//     const [duplicateroom, setDuplicateRoom] = useState([]); 
//     const [error, setError] = useState(); // State to handle errors
//     const [loading, setLoading] = useState(); 
    

//     useEffect(() => {
//         const fetchRooms = async () => {
//             try {setLoading(true)
//                 const response = await axios.get('http://localhost:5000/api/rooms/getallrooms'); // Ensure the correct endpoint
//                 setRooms(response.data);
//                 setDuplicateRoom(response.data); 
                

                
                
//                 setLoading(false)
                
//             } catch (error) {
//                 setError(true)
                
//                 setError(error.message); // Set error state
//                 setLoading(false)
//             }
//           };

//                 fetchRooms();
                
//     }, []);
//     function filterbyDates(dates)
// {
//   // console.log(dates)
//   //  console.log(dates[0].format("DD-MM-YYYY"));
//   //  console.log(dates[1].format("DD-MM-YYYY"));
//  setFromdate(dates[0].format("DD-MM-YYYY"));
//  console.log(fromdate)
//  setTodate(dates[1].format("DD-MM-YYYY"));
//  console.log(todate)
//  var temproom=[];
//  var availability=false;
//  for(const room of duplicateroom)
//   {
//   if(room.currentbooking.length>0)
//     {
//     for( const booking of room.currentbooking)
//     {
//       const bfromdate =moment(booking.fromdate, "DD-MM-YYYY");
//        const btodate = moment(booking.todate, "DD-MM-YYYY");
//        if(!(dates[0].format("DD-MM-YYYY")).isBetween(bfromdate,btodate)
//       // if(!(dates[0].format("DD-MM-YYYY")).isBetween
//       //   (bfromdate, btodate, null, "[]")
//       &&
//       !(dates[1].format("DD-MM-YYYY")).isBetween(bfromdate,btodate) )
//       // !(dates[1].format("DD-MM-YYYY")).isBetween( (bfromdate, btodate, null, "[]") ))
//       {
//         if(
//           (dates[0].format("DD-MM-YYYY"))!==bfromdate&&
//           (dates[0].format("DD-MM-YYYY"))!==btodate&&
//           (dates[1].format("DD-MM-YYYY"))!==bfromdate&&
//           (dates[1].format("DD-MM-YYYY"))!==btodate

//         //  !( bfromdate.isBetween(dates[0], dates[1], null, "[]")) &&      // Booking starts during the selected range
//         //   !(btodate.isBetween(dates[0], dates[1], null, "[]")  )   
//         )
//         {
//           availability=true;
//         }
//       }
//     }
//     }
//     if(availability==true||room.currentbooking.length==0)
//     {
//       temproom.push(room)
//     }
//     setRooms(temproom)
// }
// }
// // function filterbyDates(dates) {
// //   console.log(dates);
// //   const formattedFromDate = dates[0].format("DD-MM-YYYY");
// //   const formattedToDate = dates[1].format("DD-MM-YYYY");

// //   // Update state (if needed for other uses later)
// //   setFromdate(formattedFromDate);
// //   setTodate(formattedToDate);

// //   const temproom = [];
  
// //   for (const room of duplicateroom) {
// //     let availability = true;

// //     if (room.currentbooking.length > 0) {
// //       for (const booking of room.currentbooking) {
// //         const bookingFromDate = moment(booking.fromdate, "DD-MM-YYYY");
// //         const bookingToDate = moment(booking.todate, "DD-MM-YYYY");

// //         // Check if new dates overlap with current booking
// //         if (
// //           dates[0].isBetween(bookingFromDate, bookingToDate, null, "[]") || // Start date overlaps
// //           dates[1].isBetween(bookingFromDate, bookingToDate, null, "[]") || // End date overlaps
// //           bookingFromDate.isBetween(dates[0], dates[1], null, "[]") ||      // Booking starts during the selected range
// //           bookingToDate.isBetween(dates[0], dates[1], null, "[]")           // Booking ends during the selected range
// //         ) {
// //           availability = false;
// //           break; // No need to check further for this room
// //         }
// //       }
// //     }

// //     if (availability) {
// //       temproom.push(room); // Add room if available
// //     }
// //   }

// //   setRooms(temproom); // Update rooms with filtered data
// // }


//     return (
//         <div className='container1 col'>
//           <div className="row1">
//             <div className="col-md-3">
//             <RangePicker  format="DD/MM/YYYY" onChange={filterbyDates} />
//             </div>
//           </div>

//             <div className='row justify-content-center mt-1.5 '>                                               
//                  {loading?
//                 (<h1>loading</h1>):(rooms.map((room)=>{
//                     return <div className='row col-md-9 ' key={room.id} >
//                         <Room  room={room} todate={todate} fromdate={fromdate}/>
                        
//                     </div>  }))}               
//      </div>
//       </div>
//         )
// }
// export default HomeScreen


import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room.jsx";
import { DatePicker } from "antd";
import "antd/dist/reset.css";
import moment from "moment";

const { RangePicker } = DatePicker;

function HomeScreen() {
  const [rooms, setRooms] = useState([]); // State to store filtered rooms
  const [todate, setTodate] = useState(); 
  const [fromdate, setFromdate] = useState(); 
  const [duplicateroom, setDuplicateRoom] = useState([]); // Original data
  const [error, setError] = useState(); // State to handle errors
  const [loading, setLoading] = useState(); 
  const [searchkey, setSearchkey] = useState(""); 
  const [type, setType] = useState('all'); 


  // Fetching rooms data
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/rooms/getallrooms");
        setRooms(response.data); // Set rooms state
        setDuplicateRoom(response.data); // Copy to duplicateroom
        setLoading(false);
      } catch (error) {
        setError(error.message); // Handle error
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Filter rooms based on date selection
  function filterbyDates(dates) {
    const formattedFromDate = dates[0].format("DD-MM-YYYY");
    const formattedToDate = dates[1].format("DD-MM-YYYY");
    if(formattedFromDate)

    setFromdate(formattedFromDate);
    setTodate(formattedToDate);

    const temproom = [];
    
    for (const room of duplicateroom) {
      let availability = true;

      if (room.currentbooking.length > 0) {
        for (const booking of room.currentbooking) {
          const bookingFromDate = moment(booking.fromdate, "DD-MM-YYYY");
          const bookingToDate = moment(booking.todate, "DD-MM-YYYY");

          // Check if selected dates overlap with any booking
          if (
            dates[0].isBetween(bookingFromDate, bookingToDate, null, "[]") || // Start date overlaps
            dates[1].isBetween(bookingFromDate, bookingToDate, null, "[]") || // End date overlaps
            bookingFromDate.isBetween(dates[0], dates[1], null, "[]") ||      // Booking starts during the selected range
            bookingToDate.isBetween(dates[0], dates[1], null, "[]")           // Booking ends during the selected range
          ) {
            availability = false;
            break; // No need to check further for this room
          }
        }
      }

      if (availability) {
        temproom.push(room); // Add room if available
      }
    }

    setRooms(temproom); // Update filtered rooms
  }
  function filterBySearch(){
    const temproom=duplicateroom.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setRooms(temproom)
  }
  function filterByType(e){
    setType(e)
    if(e!=="all"){
    const temproom=duplicateroom.filter(room=>room.type.toLowerCase()==e.toLowerCase())
    setRooms(temproom)
  }
else{
  setRooms(duplicateroom)
}}

  return (
    <div className="container1 col">
      {/* Date picker */}
      <div className="row1 bs d-flex">
        <div className="col-md-3 form-control">
       
           <RangePicker format="DD/MM/YYYY" onChange={filterbyDates} />
        </div>

        <div className="col-md-5">
          <input type="text" className="form-control" placeholder="search rooms"
          value={searchkey} onChange={(e)=>
          {setSearchkey(e.target.value)}} onKeyUp={filterBySearch}/>
        </div>
        <div className="col-md-3 ">
        <select className="form-control" value={type} onChange={(e)=>{filterByType(e.target.value)}}>
          <option value="all">all</option>
          <option value="delux">delux</option>
          <option value="non-delux">non-delux</option>
        </select>
        </div>
      </div>

      {/* Room listing */}
      <div className="row justify-content-center mt-1.5">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          rooms.map((room) => (
            <div className="row col-md-9" key={room._id}>
              <Room room={room} todate={todate} fromdate={fromdate} />
            </div>
          ))
        )}
        {error && <p>Error: {error}</p>}
      </div>
    </div>
  );
}

export default HomeScreen;
