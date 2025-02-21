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

router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Deleting review with ID:", id); 
  
      const review = await Review.findByIdAndDelete(id);
      if (!review) {
        console.log("Review not found for ID:", id); 
        return res.status(404).json({ error: "Review not found" });
      }
  
      res.status(200).json({ message: "Review deleted" });
    } catch (error) {
      console.error("Error in DELETE route:", error.message); 
      res.status(500).json({ error: "Failed to delete review" });
    }
  });
  

module.exports = router;

