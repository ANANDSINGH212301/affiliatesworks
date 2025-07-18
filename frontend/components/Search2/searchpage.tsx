"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { ProgramListingType } from "@/Data/types/program";
import { GetSearchResult } from "./seachquery";
import AdvancedFilter from "./Filter/AdvancedFilter";
import { GetFilterData } from "./Filter/Fq";
import SearchProgramComponent from "./searchprogramcomponent";
import PaginationComponent from "./pagination";
import MobileFilter from "./MobileFilter";

interface Niche {
  slug: string;
  count: number;
  NicheId: number;
  name: string;
}
interface Network {
  slug: string;
  count: number;
  NetworkId: number;
  name: string;
}
interface Country {
  slug: string;
  count: number;
  CountryId: number;
  name: string;
}

interface FilterDataType {
  niches: { nodes: Niche[] };
  networks: { nodes: Network[] };
  countries: { nodes: Country[] };
}

const SearchPageComponent2 = () => {
  const searchParams = useSearchParams();
  const [programs, setPrograms] = useState<ProgramListingType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [totalcount, setTotalcount] = useState(0);
  const [FilterData, setFilterData] = useState<FilterDataType | null>(null);
  const [page, setPage] = useState(0);
  const [variables, setVariables] = useState({
    search: "",
    category: "",
    network: "",
    country: "",
    offset: 0,
  });

  // Initialize page and variables from searchParams
  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get("page") || "1", 10) - 1;

    // Check if pageFromParams has changed and set variables accordingly
    setPage((prevPage) => {
      if (prevPage !== pageFromParams) {
        const updatedVariables = {
          ...variables,
          search: searchParams.get("query") || "",
          category: searchParams.get("category") || "",
          network: searchParams.get("network") || "",
          country: searchParams.get("country") || "",
          offset: pageFromParams * 9, // Calculate offset based on the new page
        };

        // Update variables state
        setVariables(updatedVariables);

        // Fetch programs with updated variables
        UpdatePage(updatedVariables);

        return pageFromParams; // Update the page state
      }
      return prevPage; // If page hasn't changed, retain the current state
    });
  }, [searchParams]);

  // Fetch programs when variables change
  useEffect(() => {
    setLoading(true);
    GetSearchResult(variables)
      .then((response) => {
        setPrograms(response.programs.nodes);
        setTotalcount(response.programs.pageInfo.offsetPagination.total);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [variables]);

  const UpdatePage = async (queryVariables: typeof variables) => {
    setLoading(true);
    try {
      const response = await GetSearchResult(queryVariables);
      setPrograms(response.programs.nodes);
      setTotalcount(response.programs.pageInfo.offsetPagination.total);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const UpdateVariables = async () => {
    const updatedVariables = {
      search: searchParams.get("query") || "",
      category: searchParams.get("category") || "",
      network: searchParams.get("network") || "",
      country: searchParams.get("country") || "",
      offset: 0,
    };
    setVariables(updatedVariables);
  };
  // Fetch filter data
  useEffect(() => {
    UpdateVariables();
    GetFilterData()
      .then((response) => setFilterData(response))
      .catch((error) => setError(error));
  }, []);

  return (
    <main className="mx-auto max-w-screen-2xl py-6 px-2 sm:px-3 md:px-4 space-y-5">
      <section className="border-2 border-primary-foreground min-w-[300px] p-2 rounded-lg py-10">
        <h1 className="text-center font-bold text-3xl">
          Explore Affiliate Programs for Every Niche
        </h1>
      </section>

      <section className="grid grid-cols-12  rounded-lg gap-5">
        <div className="col-span-3 border border-primary-foreground hidden lg:block rounded-lg px-4 p-2">
          {FilterData && (
            <AdvancedFilter
              niches={FilterData.niches.nodes}
              networks={FilterData.networks.nodes}
              countries={FilterData.countries.nodes}
            />
          )}
          <Button
            className="text-white hover:text-white w-full mt-3 py-6 rounded-lg text-lg"
            onClick={() => UpdateVariables()}
          >
            Apply Filters
          </Button>
        </div>

        <div className="col-span-12 lg:col-span-9 rounded-lg  gap-3">
          <div className="sm:hidden">
            {FilterData && <MobileFilter Filterdata={FilterData} />}
          </div>
          <div className="rounded-lg p-2 flex justify-between align-middle">
            <div>
              <p>Total {totalcount || 0} Affiliate programs</p>
            </div>
            <div className=" hidden sm:block">
              {FilterData && <MobileFilter Filterdata={FilterData} />}
            </div>
          </div>
          <div className="rounded-lg p-2">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <SearchProgramComponent
                programs={programs}
                totalcount={totalcount}
              />
            )}
            <div className="mt-8">
              <PaginationComponent totalprograms={totalcount} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SearchPageComponent2;
