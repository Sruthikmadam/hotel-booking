const mongoose=require("mongoose");
require('dotenv').config();
var mongoURI=process.env.MONGODB_URI
// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })




mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB connection successful"))
    .catch(err => console.error("MongoDB connection error:", err));

//   var connection=mongoose.connection;
//   connection.on("error",()=>{
//     console.log("error in connection")
//   })
//   connection.on("connected",()=>{
// console.log("mongo db connection successful")

//   })

module.exports=mongoose

