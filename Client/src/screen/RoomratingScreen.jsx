

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useUser } from '../../UserContext';
import { useLocation } from 'react-router-dom';


const RoomratingScreen = ({ isOpen, onClose, roomId, roomName }) => {
  if (!isOpen) return null;
  const location = useLocation();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [hoverRating, setHoverRating] = useState(0);
  const { user, setUser } = useUser();
  console.log(roomId)
  // if (!roomId) return ;
  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reviews/getreview", {
        params: { roomId },
      });

      setReviews(Array.isArray(response.data) ? response.data : []);

    } catch (err) {
      console.log("error reviews", err)

    }
  };
  useEffect(() => {
    fetchReviews();
  }, [roomId]);




  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };


  const handleMouseEnter = (rating) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };


  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async () => {

    try {
      const response = await axios.post('http://localhost:5000/api/reviews/rate-room', {
        roomId,
        name: user?.name,
        rating,
        review
      });
      // console.log("review res.gata", response.data)
      fetchReviews();
      alert('Rating submitted successfully');
      setRating(0);
      setReview("");
    } catch (error) {
      console.log(error);
      alert('Error submitting rating');
    }
  };

  const formatDate = (date) => {
    const reviewDate = new Date(date);
    const currentDate = new Date();
    const diffInMinutes = Math.floor((currentDate - reviewDate) / (1000 * 60));

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
      return reviewDate.toLocaleString();
    }
  };


  return (
    <div className="ratingScreen justify-content-center text-center modal-overlay">
      <div className='modal-content'>
        {user ? (
          <div className="ratingScreen justify-content-center text-center ">

            <h3 style={{ color: 'yellow' }}>Rate {roomName} room</h3>
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
          </div>) :
          (<div className="ratingScreen justify-content-center text-center">
            <a href='/login' style={{ color: 'red' }} > Please log in to submit your rating for this Room: {roomName}</a>
          </div>)}


        <div>
          <h2 className='pt-5' style={{ color: 'yellow' }}>Customer Reviews for {roomName}</h2>
          <ul className='ulclass '  >
            {reviews.map((review) => (
              <li key={review._id} className='liclass bs'>
                <h4 className='text-break' style={{ color: 'red' }}>
                  Name: {review.name.charAt(0).toUpperCase() + review.name.slice(1)}
                </h4><h4 className='text-break'> Rating:<span style={{ color: 'gold' }}> {"★".repeat(review.rating)}</span>
                </h4>

                {/* "★" */}

                <p>{review.review}</p>
                <p className='text-break'>RoomId:{review.roomId}</p>

                <small>{formatDate(review.createdAt)}</small>
              </li>
            ))}
          </ul>

        </div>
        <button style={{ color: 'red' }} onClick={onClose}>Close</button>
      </div>

    </div>
  );
};

export default RoomratingScreen;
