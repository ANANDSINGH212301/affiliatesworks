import React from "react";
import StarRating from "./starrating";
import ReviewForm from "./reviewform";


interface ReviewCardProps {
  averageRating: number;
  reviewscount: number;
  title: string;
  id: number;
}

const ReviewCard = ({ averageRating, reviewscount, title, id }: ReviewCardProps) => {
  const roundToOneDecimal = (number: number): number => {
    if (Number.isInteger(number)) {
      return parseFloat(number.toFixed(1));
    } else {
      return Math.round(number * 10) / 10;
    }
  };

  const roundedRating = roundToOneDecimal(averageRating);

  return (
    <div className=" grid grid-cols-12 gap-2">
      <div className=" col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 p-2 border-2 rounded-md">
        <div className="flex-row">
          <p className=" font-medium text-sm mb-2">Average Rating</p>
          <span className="text-5xl font-bold">{roundedRating || 0}</span>
          <span>
            <StarRating stars={averageRating || 0} />
          </span>
        </div>
      </div>
      <div className=" col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 p-2 border-2 rounded-md">
        <div className="flex flex-col">
          <p className=" font-medium text-sm mb-2">Total Review</p>
          <span className="text-5xl font-bold">{reviewscount || 0}</span>
        </div>
      </div>
      <div className=" col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-6 md:p-2 md:border-2 rounded-md">
        <ReviewForm title={title} id={id}/>
      </div>
    </div>
  );
};

export default ReviewCard;
