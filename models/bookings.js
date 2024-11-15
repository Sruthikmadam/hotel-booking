const mongoose=require("mongoose");
const bookingSchema=mongoose.Schema({
    roomname:{ type:String,required:true},
    roomid: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure it's required type:String,required:true
    
    username:{
   type:String,required:true
     },
    fromdate:{
        type:String,required:true
    },
     todate:{
           type:String,required:true
     },
   
  totalamount:{
    type:Number,required:true
},
totaldays:{
    type:Number,required:true
},
transactionid:{
    type:String,required:true
},
status:{
    type:String,required:true,default:'booked'
}
},{timestamps:true})
const bookingmodel=mongoose.model('bookings',bookingSchema)
module.exports=bookingmodel