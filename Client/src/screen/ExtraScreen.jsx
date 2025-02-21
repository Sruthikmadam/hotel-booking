import React from 'react'
import './FirstScreen.css';
import kerala from '../assets/kerala.jpg';
import karnataka from '../assets/karnataka.jpg';
import Delhi from '../assets/delhi1.jpg';
import Rajastan from '../assets/rajastan.jpg';
import { Link } from "react-router-dom";
function ExtraScreen() {
  const data = [
    {
      image: Delhi,
      city: 'Delhi',
      numOfPlaces: 7,
    },
    {
      image: kerala,
      city: 'Kerala',
      numOfPlaces: 7,
    },
    {
      image: Rajastan,
      city: 'Rajastan',
      numOfPlaces: 2,
    },
    {
      image: karnataka,
      city: 'Karnataka',
      numOfPlaces: 7,
    },
  ];

  return (
    <div className="popular-location">

      <div className="popular-location-container">
        <h2 className='bs font-red'>Sorry... no hotel available here </h2>
        <h2 className="popular-location-title">Popular Locations</h2>
        <div className="popular-location-grid">
          {data.map((place, index) => (
            <div key={index} className="card">


              <Link
                to={place.city === "Kerala" ? '/home' : '/extra'}
                className="card-link"
              >
                <div className="card-image-container">
                  <img
                    alt="photo"
                    src={place.image}
                    className="card-image"
                  />
                  <div className="card-city">{place.city}</div>
                </div>
                <div className="card-content">
                  <h2 className="card-title">{place.numOfPlaces} Places to stay</h2>
                </div>
              </Link>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ExtraScreen