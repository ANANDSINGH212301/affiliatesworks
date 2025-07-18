"use client";
import React from "react";
import ReviewListing from "../../Listing/Review/ReviewListing";

interface Comment {
  id: string;
  commentId: number;
  date: Date;
  content: string;
  author: {
    node: {
      email: string;
      name: string;
      avatar:{
        url: string;
      }
    };
  };
  review: {
    review: number;
  };
}

const AllReviewListing = ({ comments }: { comments: Comment[] }) => {
  
  return (
    <div>
      {comments.length === 0 ? (
        <div>No Comments found.</div>
      ) : (
        <div className=" gap-4 mt-6 md:mt-10 w-full grid grid-cols-12">
          {comments.map((comment: Comment) => (
            <ReviewListing key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviewListing;
