const express=require("express");
const app=express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.json())
const dbconfig=require("./db.jsx")
const roomroute=require("./routes/roomroutes.jsx")
const userroute=require("./routes/usersroutes.jsx")
const bookingroute=require("./routes/bookingroutes.jsx")
const ratingroute=require("./routes/ratingroutes.jsx")
//  const reviewroutes = require("./routes/reviewroutes.jsx");

app.use("/api/reviews", ratingroute);
// app.use("/api/reviews", reviewroutes);
app.use("/api/rooms",roomroute) 
app.use("/api/users",userroute)
app.use("/api/bookings",bookingroute)
console.log("Registered Routes:", app._router.stack);
const port=5000;
app.listen(port,()=>console.log(`server running on port ${port}`));