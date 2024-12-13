const mongoose = require('mongoose');

//  RoomRating schema
const roomRatingSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', 
    required: true
  },
  name: {
    type: String,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,  
    required: true
  },
  review: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the RoomRating model
const RoomRating = mongoose.model('RoomRating', roomRatingSchema);

module.exports = RoomRating;
