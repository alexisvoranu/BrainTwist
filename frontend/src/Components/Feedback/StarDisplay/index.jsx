import React from 'react';
import './style.css';

const StarDisplay = ({ rating, totalStars = 5 }) => {
  return (
    <div className="star-display">
      {[...Array(totalStars)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <svg
            key={index}
            className="star"
            width="20"
            height="20"
            viewBox="0 0 28 28"
            fill={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
          >
            <path d="M12 .587l3.668 7.435 8.208 1.192-5.926 5.773 1.402 8.178L12 18.896l-7.352 3.869 1.402-8.178-5.926-5.773 8.208-1.192z" />
          </svg>
        );
      })}
    </div>
  );
};

export default StarDisplay;