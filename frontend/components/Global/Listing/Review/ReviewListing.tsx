"use client";
import Image from "next/image";
import React, { useMemo } from "react";
import { FaStar } from "react-icons/fa";

interface Author {
  node: {
    email: string;
    name: string;
    avatar?: {
      url: string;
    };
  };
}

interface Comment {
  id: string;
  commentId: number;
  date: Date;
  content: string;
  author: Author;
  review: {
    review: number;
  };
}

interface ReviewListingProps {
  comment: Comment;
}

// Move constants outside component to prevent recreating on each render
const COLORS = [
  "#FF69B4", "#33CC33", "#6666CC", "#CC6633", 
  "#33CCCC", "#CC33CC", "#33CC66", "#6633CC", 
  "#CCCC33", "#CC6666",
] as const;

const RATING_COLORS = {
  5: "text-green-500",
  4: "text-yellow-300",
  3: "text-orange-500",
  2: "text-yellow-600",
  1: "text-red-500",
} as const;

// Separate utility function
const getTimeDiff = (date: Date): string => {
  const TIME_UNITS = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (diff < TIME_UNITS.minute) return "Just now";

  for (const [unit, seconds] of Object.entries(TIME_UNITS)) {
    const value = Math.floor(diff / seconds);
    if (value >= 1) {
      return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
    }
  }

  return "Just now";
};

const ReviewListing: React.FC<ReviewListingProps> = ({ comment }) => {
  // Memoize computed values
  const { colorClass, randomColor, initials, image, relativeTime } = useMemo(() => ({
    colorClass: RATING_COLORS[comment.review.review as keyof typeof RATING_COLORS] || RATING_COLORS[1],
    randomColor: COLORS[Math.floor(Math.random() * COLORS.length)],
    initials: comment.author.node.name.charAt(0).toUpperCase(),
    image: comment.author.node?.avatar?.url,
    relativeTime: getTimeDiff(new Date(comment.date))
  }), [comment]);

  // Separate star rating component for better organization
  const StarRating = () => (
    <div className="flex items-center sm:justify-end" role="group" aria-label={`Rating: ${comment.review.review} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((index) => (
        <FaStar
          key={index}
          size={20}
          aria-hidden="true"
          className={`${colorClass} mr-1 ${
            index <= comment.review.review ? "" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <article className="w-full border-2 border-primary-foreground rounded-md p-2 px-4 col-span-12 space-y-4">
      <div className="w-full grid grid-cols-12 space-y-2 sm:space-x-0">
        <div className="col-span-12 sm:col-span-6">
          <div className="flex gap-3 items-center">
            <div
              style={{
                backgroundColor: image ? "transparent" : randomColor,
              }}
              className="w-11 h-11 text-2xl rounded-full flex justify-center items-center text-white font-semibold"
              role="img"
              aria-label={`${comment.author.node.name}'s avatar`}
            >
              {image ? (
                <Image
                  src={image}
                  alt=""
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                  width={100}
                  height={100}
                  loading="lazy"
                />
              ) : (
                initials
              )}
            </div>
            <div>
              <h3 className="font-semibold capitalize text-lg">
                {comment.author.node.name}
              </h3>
              <time dateTime={new Date(comment.date).toISOString()} className="text-sm text-gray-600">
                {relativeTime}
              </time>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <StarRating />
        </div>
      </div>
      <div className="border-t pt-3">
        <div 
          className="pl-4 prose prose-sm max-w-none overflow-auto" 
          dangerouslySetInnerHTML={{ __html: comment.content }}
        />
      </div>
    </article>
  );
};

export default React.memo(ReviewListing);
