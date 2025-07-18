import React from "react";
import { MdOutlineStar , MdOutlineStarHalf, MdOutlineStarBorder } from "react-icons/md";

interface Starsprops {
  stars: number;
}
const StarsRating = ({ stars }: Starsprops) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    const number = index + 0.5;
    return (
      <span key={index} className="w-5">
        {stars >= 1 ? (
          <MdOutlineStar  color="#ffd700" size={25}/>
        ) : stars >= 0.5 ? (
          <MdOutlineStarHalf color="#ffd700" size={25}/>
        ) : (
          <MdOutlineStarBorder color="#ffd700" size={25}/>
        )}
      </span>
    );
  });

  return (
    <>
       <div className="flex gap-1 ">
        {ratingStar}
      </div>
    </>
  );
};

export default StarsRating;
