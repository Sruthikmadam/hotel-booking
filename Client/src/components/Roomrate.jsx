import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
// import RoomratingScreen from '../screen/RoomratingScreen';
import { Link } from 'react-router-dom';
import './Roomrate.css'
import { useUser } from '../../UserContext.jsx'



const Roomrate = ({ roomId }) => {
  const [averageRating, setAverageRating] = useState(0);
 
  
  useEffect(() => {
    const fetchAverageRating = async () => {
      console.log(roomId)
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
        { averageRating !== null? (
          <div>
            {/* <Link  to={`/roomrate/${roomId}/${user.name}`}> */}
            <Link  to={`/roomrate/${roomId}`}>
           
            <div  className='link'>
              {[1, 2, 3, 4, 5].map((star) => (
               
                <span
                  key={star}
                  style={{
                    color: star <= averageRating? 'gold' : 'grey',
                    fontSize: '24px',
                  }}
                >
                  &#9733;
                </span>
              ))}
            </div></Link> 
          </div>
        ) :(
        <div><h1>no average rating</h1>
          {/* <Link  to='/login'
           onClick={(e) => {
            alert("You need to log in to continue!");}}>
           
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
           </div></Link>  */}
        </div>
        )}
      </div>     
    </div>
  );
};

export default Roomrate;
