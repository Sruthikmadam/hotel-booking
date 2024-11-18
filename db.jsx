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

module.exports=mongoose

