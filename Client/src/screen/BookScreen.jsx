
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useUser } from '../../UserContext';
// import './BookScreen.css'
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

function BookScreen() {
  const { user, setUser } = useUser()
  const { roomid, fromdate, todate } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const [totalamount, setTotalamount] = useState();
  const [loading, setLoading] = useState(true);
  const fromDateParsed = moment(fromdate, "DD-MM-YYYY");
  const toDateParsed = moment(todate, "DD-MM-YYYY");


  // Calculate the difference in days
  const totaldays = toDateParsed.diff(fromDateParsed, 'days') + 1;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/api/rooms/getroom', {
          roomid
        }, { withCredentials: true });
        setRoom(response.data);
        setTotalamount(response.data.rentperday * totaldays)
      } catch (err) {
        console.error(err);
        setError('Failed to load room data');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();

  }, [roomid]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;



  async function onToken(token) {
    const bookingdetails = {
      roomname: room.name,
      roomid: room._id,
      userid: user?._id,
      username: user?.name,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token

    };
    try {
      const result = await axios.post(
        "http://localhost:5000/api/bookings/bookroom",
        bookingdetails,
        { headers: { "Content-Type": "application/json" }, withCredentials: true },
      );

      window.location.href = '/profile';

    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message, error);
      alert("Payment failed! Please try again.");
    }
  }

  return (
    <div className=' container2   paynow'>
      <div className='row flex justify-content-center flex-d   payrow bs'>

        {room && (
          <div className='row flex-d ' >
            <div className='col-md-7 photo'>
              <h3 className='roomname'><b> {room.name}</b> </h3>
              <img src={room.imageurls[0]} alt="Room" className='bigimg' />
            </div>
            <div className='col-md-5 bookdetails flex-d'>
              <div className='details'>
                <h1><b>Booking Details</b></h1>
                <hr />
                <b>
                  <p>Name  :    {user.name}</p>
                  <p>From Date  :  {fromdate}</p>
                  <p>To Date  :  {todate}</p>
                  <p>Max Count  :  {room.maxcount}</p>
                </b>
              </div>
              <div className='details'>
                <h1><b> Amount</b></h1>
                <hr />
                <p>Total Days  :  {totaldays}</p>
                <p>Rent per day  :  €{room.rentperday}</p>
                <p>Total Amount  :  €{totalamount} </p>
              </div>
              <div>


                <StripeCheckout

                  token={onToken}
                  stripeKey="pk_test_51QMQQAGqvtPyEPzCHfMb7aTbzl2p5y4SDMJt9ye3TsKV4C9TwOaZlvNovqqUZkN1Yp4cOOVuEdJucuhtYgOzMl9A00yO8jwqbH"
                  amount={totalamount * 100} // Amount in cents (e.g., $50.00)
                  currency="EUR"
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
