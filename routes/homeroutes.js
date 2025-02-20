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