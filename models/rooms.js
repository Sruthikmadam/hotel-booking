const { timeStamp } = require("console");
const mongoose=require("mongoose");
const roomSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    maxcount:{
        type:Number,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    rentperday:{
        type:Number,
        required:true
    },
    imageurls:[],
    currentbooking:[
        {
            bookingid: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
            fromdate: { type: String, required: true },
            todate: { type: String, required: true },
            userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            status: { type: String, required: true },
          }],
    // currentbooking: { type: Array, default: [] },
            
           
    
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})
const roomModel=mongoose.model('rooms',roomSchema);

module.exports =roomModel