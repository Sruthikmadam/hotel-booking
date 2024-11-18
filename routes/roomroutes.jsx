const express=require("express")

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




router.post('/getroom', async (req, res) => {
  try {
    const { roomid } = req.body;
    console.log("Received roomid:", roomid); 
    

    const room = await Room.findOne({ _id: roomid });
    console.log("Fetched room:", room); 
    

    if (!room) {
      return res.status(404).send({ message: 'Room not found' });
    }

    res.send(room);
  } catch (err) {
    console.error("Server error:", err); 
    
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
