import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomratingScreen from '../screen/RoomratingScreen';
import { Link } from 'react-router-dom';
import './Roomrate.css'
import { useUser } from '../../UserContext.jsx'



const Roomrate = ({ roomId, roomName }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchAverageRating = async () => {
      // console.log(roomId)
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/average-rating/${roomId}`);
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAverageRating();
  }, []);

  return (
    <div>

      <div>
        {averageRating !== null && (
          <div>

            <div className="link" onClick={() => setIsModalOpen(true)} style={{ cursor: "pointer" }}>
              {[1, 2, 3, 4, 5].map((star) => (

                <span
                  key={star}
                  style={{
                    color: star <= averageRating ? 'gold' : 'grey',
                    fontSize: '24px',
                  }}
                >
                  &#9733;
                </span>
              ))}

            </div>
            <RoomratingScreen isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} roomId={roomId} roomName={roomName} />

          </div>
        )

        }
      </div>
    </div>
  );
};

export default Roomrate;
