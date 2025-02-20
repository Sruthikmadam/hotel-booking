const express=require("express");
require('dotenv').config();
const cookieParser=require('cookie-parser')
const dbconfig=require("./db.js")
const jwt = require("jsonwebtoken")
const {requireAuth,checkUser}=require('./middleware/Authmiddleware.js')
const roomroute=require("./routes/roomroutes.js")
const userroute=require("./routes/usersroutes.js")
const bookingroute=require("./routes/bookingroutes.js")
const ratingroute=require("./routes/ratingroutes.js")
// const homeroute=require("./routes/homeroutes.js")
const cors = require('cors');

const app=express();

// middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true // Allow credentials (cookies) to be sent
}));
app.use(express.json())
app.use(cookieParser())


//  const reviewroutes = require("./routes/reviewroutes.js");
//   app.use('*',checkUser)
app.use("/api/reviews", ratingroute);
// app.use("/api/reviews", ratingroute);
// app.use("/api/reviews", reviewroutes);
app.use("/api/rooms/home",roomroute) 
app.use("/api/rooms",requireAuth,roomroute) 
// app.use("/api/home",homeroute)
app.use("/api/users",userroute)
app.use("/api",checkUser,userroute)


// app.use("/api/bookings",bookingroute)
app.use("/api/bookings",requireAuth,bookingroute)
// console.log("Registered Routes:", app._router.stack);
const port=5000;
app.listen(port,()=>console.log(`server running on port ${port}`));