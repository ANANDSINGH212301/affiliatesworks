// components/StarRating.tsx
import React from 'react';

// Interface for the Star component props
interface StarProps {
  fillPercentage: number;
}

// Star component, accepts `fillPercentage` as a prop
const Star: React.FC<StarProps> = ({ fillPercentage }) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id={`starClip-${fillPercentage}`}>
        <rect width={`${fillPercentage}%`} height="100%" />
      </clipPath>
    </defs>
    {/* Background (grey star) */}
    <path
      d="M12 2L14.09 8.26L20.82 8.27L15.36 12.14L17.45 18.39L12 14.54L6.54 18.39L8.63 12.14L3.18 8.27L9.91 8.26L12 2Z"
      fill="#D1D5DB"
    />
    {/* Foreground (golden star) */}
    <path
      d="M12 2L14.09 8.26L20.82 8.27L15.36 12.14L17.45 18.39L12 14.54L6.54 18.39L8.63 12.14L3.18 8.27L9.91 8.26L12 2Z"
      fill="#FBBF24"
      clipPath={`url(#starClip-${fillPercentage})`}
    />
  </svg>
);

// Interface for the StarRating component props
interface StarRatingProps {
  rating: number;
}

// StarRating component, accepts `rating` as a prop
const AvgReview: React.FC<StarRatingProps> = ({ rating }) => {
  // Calculate the fill level for each of the five stars
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fillPercentage = Math.min(Math.max(rating - i, 0), 1) * 100; // Ranges from 0 to 100%
    return fillPercentage;
  });


  return (
    <div className="flex">
      {stars.map((fill, index) => (
        <Star key={index} fillPercentage={fill} />
      ))}
      <p className="ml-2 text-gray-700 font-medium">{rating}</p>
    </div>
  );
};

export default AvgReview;
