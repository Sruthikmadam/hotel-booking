const mongoose = require('mongoose');

// Define the RoomRating schema
const roomRatingSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', // Assuming you have a 'Room' collection
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a 'User' collection
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,  // Rating between 1 and 5 stars
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
