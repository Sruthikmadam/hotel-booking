// const mongoose = require("mongoose");

// const reviewSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   text: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Review", reviewSchema);

const mongoose = require('mongoose');

// Define the RoomRating schema
const reviewSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', // Assuming you have a 'Room' collection
    required: true
  },
  
  name:{
    type:String,
    required:true
  },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User', // Assuming you have a 'User' collection
  //   required: true
  // },
  rating: {
    type: Number,
    min: 1,
    max: 5,  // Rating between 1 and 5 stars
    required: true
  },
  review: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the RoomRating model
const review = mongoose.model('Review', reviewSchema);

module.exports = review;

