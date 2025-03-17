

import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room.jsx";
import { DatePicker } from "antd";
import "antd/dist/reset.css";
import moment from "moment";

const { RangePicker } = DatePicker;

function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [todate, setTodate] = useState();
  const [fromdate, setFromdate] = useState();
  const [duplicateroom, setDuplicateRoom] = useState([]);
  const [filterroom, setFilterRoom] = useState([]);
  const [filtersearch, setFiltersearch] = useState([]);
  const [filtertype, setFiltertype] = useState([]);

  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [searchkey, setSearchkey] = useState("");
  const [type, setType] = useState('all');



  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/rooms/home/getallrooms");


        setRooms(response.data);
        setDuplicateRoom(response.data);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);





  const filterbyDates = (dates) => {

    if (!dates || dates.length != 2) return;
    if (dates && dates[0] && dates[1] && dates[0].isSame(dates[1], "day")) {
      aler("From and To dates cannot be the same.");
      return;
    }

    const formattedFromDate = dates[0].format("DD-MM-YYYY");
    const formattedToDate = dates[1].format("DD-MM-YYYY");
    console.log(formattedFromDate, formattedToDate)


    setFromdate(formattedFromDate);
    setTodate(formattedToDate);



    const filteredRooms = duplicateroom.filter((room) => {
      
      let isAvailable = true;

      // Check if the room has current bookings
      if (room.currentbooking?.length > 0) {
        console.log("Current Booking:", room.currentbooking);
        for (const booking of room.currentbooking) {
          const bookingFromDate = moment(booking.fromdate, "DD-MM-YYYY");
          const bookingToDate = moment(booking.todate, "DD-MM-YYYY");

          // Check for date overlap
          if (
            moment(formattedFromDate).isBetween(bookingFromDate, bookingToDate, null, '[)') || // Start date overlaps
            moment(formattedToDate).isBetween(bookingFromDate, bookingToDate, null, '[)') || // End date overlaps
            bookingFromDate.isBetween(moment(formattedFromDate), moment(formattedToDate), null, '[)') || // Booking starts during the selected range
            bookingToDate.isBetween(moment(formattedFromDate), moment(formattedToDate), null, '[)') // Booking ends during the selected range
          ) {
            isAvailable = false;
            break;
          }
        }
      }

      return isAvailable;
    });


    console.log("Filtered Rooms:", filteredRooms);
    setRooms(filteredRooms);
    setFilterRoom(filteredRooms)
  }





  const disablePastDates = (current) => {
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  function filterBySearch() {
    if (filterroom.length) {
      if (filtertype.length) {

        const filterrooms = filtertype.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
        setRooms(filterrooms)
        setFiltersearch(filterrooms)
      }
      else {
        const filterrooms = filterroom.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
        setRooms(filterrooms)
        setFiltersearch(filterrooms)
      }
    }

    else {
      const duplicaterooms = duplicateroom.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()))
      setRooms(duplicaterooms)
    }
  }


  function filterByType(e) {
    setType(e)
    if (e !== "all") {
      if (filterroom.length) {

        if (filtersearch.length) {
          const filterrooms = filtersearch.filter(room => room.type.toLowerCase() == e.toLowerCase())
          setRooms(filterrooms)
          setFiltertype(filterrooms)
        }
        else {
          const filterrooms = filterroom.filter(room => room.type.toLowerCase() == e.toLowerCase())
          setRooms(filterrooms)
          setFiltertype(filterrooms)
        }
      }
      else {

        const duplicaterooms = duplicateroom.filter(room => room.type.toLowerCase() == e.toLowerCase())
        setRooms(duplicaterooms)
      }
    }

    else {
      setRooms(filterroom)
      console.log(duplicateroom)
    }
  }
  return (
    <div className="container1 col">

      <div className="row1 bs d-flex">
        <div className="col-md-4 form-control">

          <RangePicker format="DD-MM-YYYY"
            onChange={(dates) => filterbyDates(dates)} disabledDate={disablePastDates} />
        </div>

        <div className="col-md-5">
          <input type="text" className="form-control" placeholder="search rooms"
            value={searchkey} onChange={(e) => { setSearchkey(e.target.value) }} onKeyUp={filterBySearch} />
        </div>
        <div className="col-md-3 ">
          <select className="form-control" value={type} onChange={(e) => { filterByType(e.target.value) }}>
            <option value="all">all</option>
            <option value="delux">deluxe</option>
            <option value="non-delux">non-deluxe</option>
          </select>
        </div>
      </div>


      <div className="row justify-content-center mt-1.5">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          rooms.map((room) => (
            <div className="row2 col-md-6" key={room._id}>
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




