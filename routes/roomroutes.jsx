const express=require("express")
// const mongoose=require("mongoose")
const router=express.Router()
const Room= require("../models/rooms.js")
router.get('/getallrooms',async(req,res)=>{ 
  try {
    const rooms=await Room.find({})
    return res.send(rooms)
  } catch (error) {
    return res.status(400).json({message:"some error"})
  }
});
// router.post('/getroombyid',async(req,res)=>{  const roomid=req.body.roomid;
//   try {
//     const room=await Room.findone({_id:roomid})
//     return res.send(room)
//   } catch (error) {
//     return res.status(400).json({message:"some error"})
//   }
// });

// In your backend API (e.g., Express.js)
// router.post('/getroombyid',async (req, res) => {
//   const roomid =  req.body.roomid;;
//   const room=await Room.findOne({_id:roomid})
//   // Fetch room details based on roomid
//   console.log("room",room)
//   res.send(room); // Return the room data
// });



router.post('/getroom', async (req, res) => {
  try {
    const { roomid } = req.body;
    console.log("Received roomid:", roomid); // Log roomid to confirm it's received

    const room = await Room.findOne({ _id: roomid });
    console.log("Fetched room:", room); // Log room details or null

    if (!room) {
      return res.status(404).send({ message: 'Room not found' });
    }

    res.send(room);
  } catch (err) {
    console.error("Server error:", err); // Log error details for debugging
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
