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

router.post("/addroom",async (req,res)=>{
  try {
    const newroom=new Room(req.body)
    await newroom.save()
    res.send("new room added successfully")
  } catch (error) {
    return res.status(400).json({error})
  }
} )


// router.get('/available', async (req, res) => {
//   const { formattedFromDate,
//     formattedToDate  } = req.body;

//   try {
//     // Fetch bookings that overlap with the given range
//     const bookedRooms = await Booking.find({
//       $or: [
//         {
//           formattedFromDate: { $lte: formattedToDate },
//           formattedToDate: { $gte:  formattedFromDate },
//         },
//       ],
//     }).select('roomId'); // Get only room IDs

//     const bookedRoomIds = bookedRooms.map((booking) => booking.roomId);

//     // Find rooms not in the list of booked room IDs
//     const availableRooms = await Room.find({ _id: { $nin: bookedRoomIds } });

//     res.status(200).json(availableRooms);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching rooms', error });
//   }
// });


module.exports = router;
