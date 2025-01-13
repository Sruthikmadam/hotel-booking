// import React, { useState } from 'react';
// import axios from 'axios';

// const RoomratingScreen = ({ roomId, userId }) => {
//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState('');
   

//   // Handle star click
//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//   };

//   // Handle review input change
//   const handleReviewChange = (event) => {
//     setReview(event.target.value);
//   };
// console.log("rating",rating)
// console.log("review",review)
//   // Submit rating


//   // const handleSubmit = async () => {
//   //   const payload = {
//   //     roomId: "673e362277781e60ef0b7c5d",
//   //     userId: "673e0c1abdb9e4766511e2c0",
//   //     rating: 4,
//   //     review: "Great room!",
//   //   };
    
//   //   console.log('Payload being sent:', payload); // Check what is being sent
  
//   //   try {
//   //     const response = await axios.post('http://localhost:5000/api/reviews/rate-room', payload);


//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/reviews/rate-room', {
//         roomId,
//         userId,
//         rating,
//         review
//       });
//       alert('Rating submitted successfully');
//     } catch (error) {
//       console.log(error);
//       alert('Error submitting rating');
//     }
    

//   };

//   return (
//     <div className='ratingScreen justify-content-center text-center '  >
//       <h3>Rate this room</h3>
//       <div>
//         {[1, 2, 3, 4, 5].map((star) => (
//           <span
//             key={star}
//             style={{
//               cursor: 'pointer',
//               color: star <= rating ? 'gold' : 'gray',
//               fontSize: '24px',
//             }}
//             onClick={() => handleRatingChange(star)}
//           >
//             &#9733;
//           </span>
//         ))}
//       </div>
//       <div>
//         <textarea
//           placeholder="Write your review"
//           value={review}
//           onChange={handleReviewChange}
//         />
//       </div>
//       <button onClick={handleSubmit}>Submit Rating</button>
//     </div>
//   );
// };

// export default RoomratingScreen;

import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RoomratingScreen = () => {
  const { roomId ,name} = useParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [hoverRating, setHoverRating] = useState(0); // For hover effect


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews/getreview",{
          params: { roomId },
        }); // Replace with your backend URL
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load reviews");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);
 
 

  // Handle star click
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Handle mouse hover over stars
  const handleMouseEnter = (rating) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  // Handle review input change
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async () => {
   
    try {
      const response = await axios.post('http://localhost:5000/api/reviews/rate-room', {
        roomId,
        name,
        rating,
        review
      });
      alert('Rating submitted successfully');
    } catch (error) {
      console.log(error);
      alert('Error submitting rating');
    }
  };

  return (
      <div className="ratingScreen justify-content-center text-center">
    <div className="ratingScreen justify-content-center text-center">
      <h3>Rate this room</h3>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              cursor: 'pointer',
              color: star <= (hoverRating || rating) ? 'gold' : 'gray',
              fontSize: '24px',
            }}
            onClick={() => handleRatingChange(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          >
            &#9733;
          </span>
        ))}
      </div>
      <div>
        <textarea
          placeholder="Write your review"
          value={review}
          onChange={handleReviewChange}
        />
      </div>
      <button onClick={handleSubmit}>Submit Rating</button>
    </div>


    <div>
      <h2 className='pt-5'>Customer Reviews</h2>
      <ul className='ulclass '  >
        {reviews.map((review) => (
          <li key={review._id} className='liclass bs'>
            <h4>{review.name} <span>{review.rating}     &#9733;</span>
          </h4> 
            
            <p>{review.review}</p> 
            {/* <small>{new Date(review.date).toLocaleString()}</small> */}
          </li>
        ))}
      </ul>
    </div>
      
    </div>
  );
};

export default RoomratingScreen;
