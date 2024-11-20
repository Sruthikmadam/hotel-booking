const express=require("express")
const router =express.Router();
const Booking= require('../models/bookings.js')
 const Room=require('../models/rooms.js')
 const { v4: uuidv4 } = require('uuid');


 const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/bookroom', async(req,res)=>{
    const { roomname,roomid, userid, username, fromdate, todate, totalamount, totaldays,token } = req.body;

    try {
      const customer = await stripe.customers.create({
        email:token.email,
        source:token.id
    });
    const payment = await stripe.charges.create({
      amount: totalamount,
      customer:customer.id,
      currency: 'euro',
      receipt_email:token.email
  },
    {
      idempotenctKey:uuidv4()
    });
    if(payment)
    {
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
              
              // res.status(201).json({ message: "Booking successful", roomtemp })
              
              // } catch (error) {
              //   console.error('Booking error:', error);
              //   res.status(500).json({ error: 'Booking failed, please try again' });
              //  }   

              
              


  } 
  res.send("payment  successful ,your roon is booked")
  }
   
     catch (error) {
      res.status(400).json({error})
    }
// if (!userid) {
//     return res.status(400).json({ error: "userid is required" });
//   }

//   try {
//     const newBooking = new Booking({
//       roomname,
//       roomid,
//       userid,
//       username,
//       fromdate,
//       todate,
//       totalamount,
//       totaldays,
//       transactionid:"1234" 
//     });
//  const booking=await newBooking.save()
// const roomtemp= await Room.findOne({_id:roomid})
// if(!roomtemp){return res.status(404).json({ error: "Room not found" });}
// if (!Array.isArray(roomtemp.currentbooking)) {
//   console.error("currentbooking field is missing or not an array");
//   temproom.currentbooking = []; 
// }
// roomtemp.currentbooking.push({bookingid:booking._id,fromdate:fromdate, todate:todate,userid:userid,status:booking.status})
//  await roomtemp.save()

//  res.status(201).json({ message: "Booking successful", roomtemp })

//  } catch (error) {
//   console.error('Booking error:', error);
//   res.status(500).json({ error: 'Booking failed, please try again' });
//  }   
});
module.exports=router