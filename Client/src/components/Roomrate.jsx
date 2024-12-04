import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
// import RoomratingScreen from '../screen/RoomratingScreen';
import { Link } from 'react-router-dom';


const Roomrate = ({ roomId }) => {
  const [averageRating, setAverageRating] = useState(null);
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const userId=user.userid
  console.log("room",roomId)
  console.log("user",userId)

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/average-rating/${roomId}`);
        setAverageRating(response.data.averageRating);
        console.log(averageRating)
      } catch (error) {
        console.error(error);
      }
    };

    fetchAverageRating();
  }, [roomId]);

  return (
    <div>
      {/* <h2>Room Details</h2> */}
      <div>
        {averageRating !== null ? (
          <div>
            {/* <h4> {averageRating.toFixed(1)} / 5</h4> */}

            <Link  to={`/roomrate/${roomId}/${userId}`}>
            {/* <Link  to={`/reviews/${roomId}/${userId}`}> */}
            <div  className='link'>
              {[1, 2, 3, 4, 5].map((star) => (
               
                <span
                  key={star}
                  style={{
                    color: star <= averageRating ? 'gold' : 'gray',
                    fontSize: '24px',
                  }}
                >
                  &#9733;
                </span>
              ))}
            </div></Link> 
          </div>
        ) :(
        
         <Link to={`/roomrate/${roomId}/${userId}`}></Link> 
        )}
      </div>
      {/* {room.name} */}
      
      
      {/* <RoomratingScreen roomId={roomId} userId={userid} /> */}
    </div>
  );
};

export default Roomrate;
