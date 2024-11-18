import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room.jsx'
import { DatePicker, Space } from 'antd';
import 'antd/dist/reset.css';
import moment from 'moment';
const { RangePicker } = DatePicker;
function HomeScreen() {
    const [rooms, setRooms] = useState([]); // State to store rooms data
    const [todate, setTodate] = useState(); 
    const [fromdate, setFromdate] = useState(); 
    const [duplicateroom, setDuplicateroom] = useState([]); 
    const [error, setError] = useState(); // State to handle errors
    const [loading, setLoading] = useState(); 
    

    useEffect(() => {
        const fetchRooms = async () => {
            try {setLoading(true)
                const response = await axios.get('http://localhost:5000/api/rooms/getallrooms'); // Ensure the correct endpoint
                setRooms(response.data);
                

                
                
                setLoading(false)
                
            } catch (error) {
                setError(true)
                
                setError(error.message); // Set error state
                setLoading(false)
            }
          };

                fetchRooms();
                
    }, []);
    function filterbyDates(dates)
{
      console.log(dates)
 console.log(dates[0].format("DD-MM-YYYY"));
 console.log(dates[1].format("DD-MM-YYYY"));
 setFromdate(dates[0].format("DD-MM-YYYY"));
 setTodate(dates[1].format("DD-MM-YYYY"));
 var temproom=[];
 var availability=false;
 for(const room of duplicateroom)
  {
  if(room.currentbooking.length>0)
    {
    for( const booking of room.currentbooking)
    {
      if(!(dates[0].format("DD-MM-YYYY")).isBetween(booking.fromdate,booking.todate)&&
      !(dates[1].format("DD-MM-YYYY")).isBetween(booking.fromdate,booking.todate) )
      {
        if(
          (dates[0].format("DD-MM-YYYY"))!==booking.fromdate&&
          (dates[0].format("DD-MM-YYYY"))!==booking.todate&&
          (dates[1].format("DD-MM-YYYY"))!==booking.fromdate&&
          (dates[1].format("DD-MM-YYYY"))!==booking.todate
        )
        {
          availability=true;
        }
      }
    }
    }
    if(availability==true||room.currentbooking.length==0)
    {
      temproom.push(room)
    }
    setRooms(temproom)
}
}

    return (
        <div className='container1 col'>
          <div className="row1">
            <div className="col-md-3">
            <RangePicker  format="DD/MM/YYYY" onChange={filterbyDates} />
            </div>
          </div>

            <div className='row justify-content-center mt-1.5 '>                                               
                 {loading?
                (<h1>loading</h1>):(rooms.map((room)=>{
                    return <div className='row col-md-9 ' key={room.id} >
                        <Room  room={room} todate={todate} fromdate={fromdate}/>
                        
                    </div>  }))}               
     </div>
      </div>
        )
}
export default HomeScreen