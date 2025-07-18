"use client";
import { ProgramListingType } from "@/Data/types/program";
import React, { useState } from "react";
import ProgramListing2 from "../Global/Listing/Program/Program-Listing";
import PaginationComponent from "./pagination";

interface SearchProgramComponentProps {
  programs: ProgramListingType[];
  totalcount: number;
}
const SearchProgramComponent = ({ programs, totalcount }: SearchProgramComponentProps) => {

  return (
    <div>
      {programs.length === 0 ? (
        <div>No programs found.</div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {programs.map((program: ProgramListingType) => (
            <ProgramListing2 key={program.programId} program={program} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchProgramComponent;
