const express=require("express")
const router =express.Router();
const Booking= require('../models/bookings.js')
router.post('/bookroom', async(req,res)=>{
    const { roomname,roomid, userid, username, fromdate, todate, totalamount, totaldays } = req.body;
    // const {roomname,fromdate,todate,totalamount,totaldays,userid}=req.body;
//  try {
//     const newbooking = new Booking({
//         roomname,
//         roomid,
//         fromdate,
//         todate,
//         userid,
//         totalamount,
//         totaldays,
//         transactionid:'1234'
//  })
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
      transactionid: '1234', // Example static transaction ID
    });
 const booking=await newbooking.save()
 res.send("success")
 } catch (error) {
    return res.status(400).json(error)
 }   
});
module.exports=router