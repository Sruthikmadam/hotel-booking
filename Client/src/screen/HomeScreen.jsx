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
    const [error, setError] = useState(); // State to handle errors
    const [loading, setLoading] = useState(); // State to handle errors
    // const baseURL= `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}`;
    

    useEffect(() => {
        const fetchRooms = async () => {
            try {setLoading(true)
                const response = await axios.get('http://localhost:5000/api/rooms/getallrooms'); // Ensure the correct endpoint
                setRooms(response.data); // Assuming the data structure has  

                // console.log(rooms)
                //  console.log(rooms.length)
                // console.log("data",response.data); 
                setLoading(false)
                
            } catch (error) {
                setError(true)
                // console.error(error); // Log the error
                setError(error.message); // Set error state
                setLoading(false)
            }
          };

                fetchRooms(); // Call the fetch function
    }, []);
    function filterbyDates(dates){
      console.log(dates)
 console.log(dates[0].format("DD-MM-YYYY"));
 console.log(dates[1].format("DD-MM-YYYY"));
 setFromdate(dates[0].format("DD-MM-YYYY"));
 setTodate(dates[1].format("DD-MM-YYYY"));
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
                

{/* 
                {loading ? (
  <h1>Loading...</h1>
) : error ? (
  <h1>Error: {error}</h1>
) : rooms.length === 0 ? (
    <h1>No rooms available</h1>
  ) : (
  rooms.map((room) => (
    <div className="col-md-9 mt-2" key={room._id}>
      <h1>hhhhhhh {room.name}</h1>
    </div>
  ))
)}  */}



                
     </div>
      </div>
        )
}
export default HomeScreen