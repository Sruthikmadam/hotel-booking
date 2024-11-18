const express=require("express")
const router =express.Router();
const Booking= require('../models/bookings.js')
 const Room=require('../models/rooms.js')
router.post('/bookroom', async(req,res)=>{
    const { roomname,roomid, userid, username, fromdate, todate, totalamount, totaldays } = req.body;


if (!userid) {
    return res.status(400).json({ error: "userid is required" });
  }

  try {
    const newBooking = new Booking({
      roomname,
      roomid,
      userid,
      username,
      fromdate,
      todate,
      totalamount,
      totaldays,
      transactionid:"1234" 
    });
 const booking=await newBooking.save()
const roomtemp= await Room.findOne({_id:roomid})
if(!roomtemp){return res.status(404).json({ error: "Room not found" });}
if (!Array.isArray(roomtemp.currentbooking)) {
  console.error("currentbooking field is missing or not an array");
  temproom.currentbooking = []; 
}
roomtemp.currentbooking.push({bookingid:booking._id,fromdate:fromdate, todate:todate,userid:userid,status:booking.status})
 await roomtemp.save()

 res.status(201).json({ message: "Booking successful", roomtemp })

 } catch (error) {
  console.error('Booking error:', error);
  res.status(500).json({ error: 'Booking failed, please try again' });
 }   
});
module.exports=router