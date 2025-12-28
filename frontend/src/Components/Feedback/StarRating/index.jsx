import React, { useState } from 'react';
import './style.css'; 

const StarRating = ({ setNota, totalStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    setNota(ratingValue); 
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
            />
            <svg
              className="star"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            >
              <path d="M12 .587l3.668 7.435 8.208 1.192-5.926 5.773 1.402 8.178L12 18.896l-7.352 3.869 1.402-8.178-5.926-5.773 8.208-1.192z" />
            </svg>
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;