const express = require("express")
const router = express.Router();
const Booking = require('../models/bookings.js')
const Room = require('../models/rooms.js')
const { v4: uuidv4 } = require('uuid');


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//  const stripe = require('stripe')('sk_test_your_secret_key'); // Test Secret Key


router.post('/bookroom', async (req, res) => {
  const { roomname, roomid, userid, username, fromdate, todate, totalamount, totaldays, token } = req.body;
  console.log(token)
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });
    //  try {
    const payment = await stripe.charges.create({
      amount: totalamount * 100,
      customer: customer.id,
      currency: 'EUR',
      receipt_email: token.email,
      //  payment_method_types: ['card']
      description: `Room Booking - ${roomname}`,
    },
      {
        idempotencyKey: uuidv4(),
      });
    //  } catch (error) {
    //     console.error('Stripe Error:', error.message);
    // //  You can also log the full error for more details:
    //  console.error(error);
    //   }

    if (payment) {
      // try {
      const newBooking = new Booking({
        roomname,
        roomid,
        userid,
        username,
        fromdate,
        todate,
        totalamount,
        totaldays,
        transactionid: payment.id
      });
      const booking = await newBooking.save()
      const roomtemp = await Room.findOne({ _id: roomid })
      if (!roomtemp) { return res.status(404).json({ error: "Room not found" }); }
      if (!Array.isArray(roomtemp.currentbooking)) {
        console.error("currentbooking field is missing or not an array");
        temproom.currentbooking = [];
      }
      roomtemp.currentbooking.push({ bookingid: booking._id, fromdate: fromdate, todate: todate, userid: userid, status: booking.status })
      await roomtemp.save()

      // res.status(201).json({ message: "Booking successful", roomtemp })

      // } catch (error) {
      //   console.error('Booking error:', error);
      //   res.status(500).json({ error: 'Booking failed, please try again' });
      //  }   





    }
    // console.log("payment details is here",payment)
    res.send("payment  successful ,your roon is booked ")
  }

  //  catch (error) {
  //   res.status(400).json({error})
  // }
  catch (error) {
    console.error("Booking error:", error.message || error, error.stack);
    res.status(400).json({ error: error.message || "Something went wrong!" });
  }



  

});
router.post('/getBooking', async (req, res) => {
  console.log("root reached")
  const userid = req.body.userid
  console.log("userid back", req.body)

  try {
    const bookings = await Booking.find({ userid })
    console.log(bookings)
    res.send(bookings)
  } catch (error) {
    console.log(error)

    return res.status(400).json({ error })
  }
});
module.exports = router