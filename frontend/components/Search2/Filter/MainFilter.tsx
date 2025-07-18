"use server";

import React from 'react';
import AdvancedFilter from './AdvancedFilter';
// import { GetFilterData } from './Fq';
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { unstable_cache } from "next/cache";

export default async function MainFilter() {
  const FilterData = await GetFilterData();
  return (
    <div>
      <AdvancedFilter
        niches={FilterData.niches.nodes}
        networks={FilterData.networks.nodes}
        countries={FilterData.countries.nodes}
      />
    </div>
  );
}


export const GetFilterData = unstable_cache(
    async () => {
      const GET_ALL_FILTER_DATA = gql`
        query FilterData {
          countries(first: 100000) {
            nodes {
              countryId
              count
              name
              slug
            }
          }
          networks(first: 100000) {
            nodes {
              networkId
              count
              name
              slug
            }
          }
          niches(first: 100000) {
            nodes {
              count
              name
              slug
              nicheId
            }
          }
        }
      `;

      try {
        const { data } = await getClient().query({
          query: GET_ALL_FILTER_DATA,
          context: {
            headers: {
              Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
            },
          },
        });

        // console.log(data);
        return data;
      } catch (error) {
        console.error("Error fetching filter data:", error);
        throw error;
      }
    },
    ["FilterData"], // Cache key
    {
      revalidate: 24 * 60 * 60, // Cache for 24 hours
    }
  );