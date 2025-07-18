import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface Starsprops {
  stars: number;
}
const Stars = ({ stars }: Starsprops) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    const number = index + 0.5;
    return (
      <span key={index} className="w-4 ">
        {stars >= 1 ? (
          <FaStar color="#ffd700" />
        ) : stars >= 0.5 ? (
          <FaStarHalfAlt color="#ffd700" />
        ) : (
          <FaRegStar color="#727272" />
        )}
      </span>
    );
  });

  return (
    <>
      <div className="flex gap-[2px] items-center">
        {ratingStar}

        <p className="text-sm ml-1">
          &#40;
          {stars}&#41;</p>
      </div>
    </>
  );
};

export default Stars;
