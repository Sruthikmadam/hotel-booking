const express = require("express");
const Review = require("../models/review");
const router = express.Router();

// Get all reviews
router.get("/getreview", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// Add a new review
router.post("/addreview", async (req, res) => {
  const { name, review,rating,roomId} = req.body;
  if (!name || !review) {
    return res.status(400).json({ error: "Name and text are required" });
  }

  try {
    const newReview = new Review({ name,review ,rating,roomId});
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "Failed to add review" });
  }
});

// Delete a review
// router.delete("/:id", async (req, res) => {
  
//   try {
   
//     const { id } = req.params;
//     const review = await Review.findByIdAndDelete( req.params.id);
//     if (!review) return res.status(404).json({ error: "Review not found" });

//     // await review.remove();
//     res.status(200).json({ message: "Review deleted" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete review" });
//   }
// });


router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Deleting review with ID:", id); // Debugging
  
      const review = await Review.findByIdAndDelete(id);
      if (!review) {
        console.log("Review not found for ID:", id); // Log for non-existent ID
        return res.status(404).json({ error: "Review not found" });
      }
  
      res.status(200).json({ message: "Review deleted" });
    } catch (error) {
      console.error("Error in DELETE route:", error.message); // Log the error
      res.status(500).json({ error: "Failed to delete review" });
    }
  });
  

module.exports = router;


// const express = require('express');
// const RoomRating = require('../models/review'); // Path to the RoomRating model
// const router = express.Router();

// // POST route for submitting a rating
// router.post('/rate-room', async (req, res) => {
//   try {
//     const { roomId, userId, rating, review } = req.body;

//     // Create a new room rating
//     const newRating = new RoomRating({
//       roomId,
//       userId,
//       rating,
//       review
//     });

//     // Save the rating to the database
//     await newRating.save();
//     res.status(201).json({ message: 'Rating submitted successfully', rating: newRating });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get average rating for a room
// router.get('/average-rating/:roomId', async (req, res) => {
//   try {
//     const { roomId } = req.params;

//     const ratings = await RoomRating.find({ roomId });
//     const averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;

//     res.json({ averageRating });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;
