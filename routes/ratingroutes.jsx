const express = require('express');
const RoomRating = require('../models/roomrating'); // Path to the RoomRating model
const router = express.Router();




router.post('/rate-room', async (req, res) => {
  try {
    const { roomId, userId, rating, review } = req.body;
    console.log(roomId, userId);

    // Create a new room rating
    const newRating = new RoomRating({
      roomId,
      userId,
      rating,
      review,
    });

    // Save the rating to the database
    await newRating.save();
    res.status(201).json({ message: 'Rating submitted successfully', rating: newRating });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get average rating for a room
router.get('/average-rating/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;

    const ratings = await RoomRating.find({ roomId });

    const averageRating = ratings.length > 0
      ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length
      : 4;

    res.json({ averageRating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get all reviews
router.get("/getreview", async (req, res) => {
  const { roomId } = req.query;
  console.log("roomId in back", roomId)
  try {
    const reviews = await RoomRating.find({ roomId }).sort({ date: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});
module.exports = router;
