import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { unstable_cache } from "next/cache";

const GetFilterData = unstable_cache(async () => {
    const GET_ALL_FILTER_DATA = gql`
      query MyQuery2 {
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
      // console.log(data.program);
  
      return data;
    } catch (error) {
      console.error("Error fetching program:", error);
      return null;
    }
  },
  ['Filter-Data'],
  {
    revalidate: 60 * 60 * 24,
  }
  
  
  );



  export const FilterData = GetFilterData();