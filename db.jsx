const mongoose=require("mongoose");
require('dotenv').config();
var mongoURI=process.env.MONGODB_URI
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  var connection=mongoose.connection;
  connection.on("error",()=>{
    console.log("error in connection")
  })
  connection.on("connected",()=>{
console.log("mongo db connection successful")

  })
//  .then(() => console.log("MongoDB connected successfully"))
//  .catch(err => console.error("MongoDB connection error:", err));
module.exports=mongoose

// const mongoose = require("mongoose");

// // Replace with your actual MongoDB URI
// const mongoURI = "mongodb+srv://kmsruthi:FrbFJRRy76AFoF94@cluster0.ih3gb.mongodb.net/mern-room";

// mongoose.connect(mongoURI)
//   .then(() => {
//     console.log("MongoDB connection successful");
//   })
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//   });

// const connection = mongoose.connection;

// connection.on("error", (error) => {
//   console.error("Error in MongoDB connection:", error);
// });

// connection.on("disconnected", () => {
//   console.log("MongoDB connection disconnected");
// });

// module.exports = mongoose;