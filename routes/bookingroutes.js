const express = require("express")
const router = express.Router();
const Booking = require('../models/bookings.js')
const Room = require('../models/rooms.js')
const { v4: uuidv4 } = require('uuid');


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
router.post('/bookroom', async (req, res) => {
  const { roomname, roomid, userid, username, fromdate, todate, totalamount, totaldays, token } = req.body;
  console.log(token)
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const payment = await stripe.charges.create({
      amount: totalamount * 100,
      customer: customer.id,
      currency: 'EUR',
      receipt_email: token.email,
      description: `Room Booking - ${roomname}`,
    },
      {
        idempotencyKey: uuidv4(),
      });

    if (payment) {
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

    }

    res.send("payment  successful ,your roon is booked ")
  }


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
router.post('/cancelBooking', async (req, res) => {
  const { bookingid, roomid } = req.body
  try {
    const bookingItem = await Booking.findOne({ _id: bookingid })
    bookingItem.status = "cancelled"
    await bookingItem.save()
    const room = await Room.findOne({ _id: roomid })
    const bookings = room.currentbookings
    const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid)
    room.currentbookings = temp
    await room.save()
    res.save("cancelled succesfully")

  } catch (error) {
    return res.status(400).json({ error })
  }
});
router.get('/getallbookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({ error })
  }
});
module.exports = router