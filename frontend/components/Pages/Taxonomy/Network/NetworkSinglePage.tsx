"use client";

import { GetNetworkPrograms } from "@/app/network/[slug]/networkprogram";
import ProgramListing from "@/components/Global/Listing/Program/Program-Listing";
import { ProgramListingType } from "@/Data/types/program";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import NetworkPaginationComponent from "./networkpagination";

interface NetworkSinglePageProps {
  slug: string;
}

const NetworkSinglePage = ({ slug }: NetworkSinglePageProps) => {
  const searchParams = useSearchParams();
  const [programs, setPrograms] = useState<ProgramListingType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [offset, setOffset] = useState(0);
  const [totalprograms, setTotalPrograms] = useState(0);

  // Read the page number from URL search params
  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get("page") || "1", 10) - 1;
    setOffset(pageFromParams * 9); // assuming offset is pageIndex (zero-based)
    // console.log(offset);
  }, [searchParams]);

  // Fetch programs whenever slug or offset changes
  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await GetNetworkPrograms(slug, offset);
        console.log(response);
        setPrograms(response.nodes);
        setTotalPrograms(response.pageInfo.offsetPagination.total)
        // console.log('programs client side',programs);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [slug, offset]);

  if (loading) {
    return <div>Loading programs...</div>;
  }

  if (error) {
    return <div>Error loading programs: {error.message}</div>;
  }
  // console.log(programs);
  return (
    <>
    
    <div>
      {programs.length === 0 ? (
        <div>No programs found.</div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {programs.map((program: ProgramListingType) => (
            <ProgramListing key={program.programId} program={program} />
          ))}
        </div>
      )}

    </div>
    <div className="mt-6">
    <NetworkPaginationComponent  totalprograms={totalprograms}/>
    </div>
    </>
  );
};

export default NetworkSinglePage;
