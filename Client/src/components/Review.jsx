import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5000/api/reviews"; // Replace with your backend URL if different

const Review = () => {
  const {roomId}=useParams();
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(API_URL,{roomId});
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  // Add a new review
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!name || !reviewText) {
      alert("Name and review text are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(API_URL, { name, text: reviewText });
      setReviews([response.data, ...reviews]); // Add the new review to the top
      setName("");
      setReviewText("");
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a review
  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Review Page</h1>

      {/* Review Form */}
      <div className="card p-4 shadow-sm mb-4">
        <h2 className="mb-3">Submit a Review</h2>
        <form onSubmit={handleAddReview}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="review" className="form-label">
              Review
            </label>
            <textarea
              id="review"
              className="form-control"
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Display Reviews */}
      <div>
        <h2 className="mb-3">All Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-muted">No reviews yet. Be the first to leave one!</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{review.name}</h5>
                <p className="card-text">{review.text}</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Review;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Review = ({ roomId }) => {
//   const [averageRating, setAverageRating] = useState(null);
//   const user=JSON.parse(localStorage.getItem("currentUser"))

//   useEffect(() => {
//     const fetchAverageRating = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/reviews/average-rating/${roomId}`);
//         setAverageRating(response.data.averageRating);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchAverageRating();
//   }, [roomId]);

//   return (
//     <div>
//       <h2>Room Details</h2>
//       <div>
//         {averageRating !== null ? (
//           <div>
//             <h4>Average Rating: {averageRating.toFixed(1)} / 5</h4>
//             <div>
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <span
//                   key={star}
//                   style={{
//                     color: star <= averageRating ? 'gold' : 'gray',
//                     fontSize: '24px',
//                   }}
//                 >
//                   &#9733;
//                 </span>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//       <RoomRating roomId={roomId} userId={user._id} /> {/* Pass actual userId */}
//     </div>
//   );
// };

// export default Review;

