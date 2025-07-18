"use client";

import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GoEye } from "react-icons/go";
import { updateviewscount } from "./updatecount";


interface ProgramviewcountProps {
  id: string;
  count: number;
}

const Programviewcount = ({ id, count }: ProgramviewcountProps) => {
  const [viewCount, setViewCount] = useState(0);
  const [hasVisited, setHasVisited] = useState(false);
  if (count == null) {
    count = 0;
  } else {
    count = count + 1;
  }

  useEffect(() => {
    const programId = id; // Replace with the actual program ID
    const cookieName = `viewCount_${programId}`;
    const visitCookieName = `visited_${programId}`;

    const storedViewCount = parseInt(
      document.cookie.match(`^ *${cookieName}=([^;]*)`)?.[1] ?? "0"
    );
    const hasVisitedBefore = document.cookie.includes(visitCookieName);

    if (!hasVisitedBefore) {
      // If the user hasn't visited before, update the view count and set the visit cookie
      document.cookie = `${cookieName}=${
        storedViewCount + 1
      }; expires=${new Date(Date.now() + 3 * 60 * 60 * 1000 ).toUTCString()}`;
      document.cookie = `${visitCookieName}=true; expires=${new Date(
        Date.now() + 3 * 60 * 60 * 1000
      ).toUTCString()}`;

      setHasVisited(true);
      const countresponse = updateviewscount(id, count);
      // console.log(countresponse);
    }
    
  }, [id, count]);

  return (
    <div className="text-sm flex items-center gap-2">
      <span>
        <GoEye size={18} className="mt-0.5" />
      </span>
      <span className="font-semibold">{count || 0}</span>
      <span> views</span>
    </div>
  );
};

export default Programviewcount;

