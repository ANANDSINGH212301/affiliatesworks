"use server";

import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { unstable_cache } from "next/cache";

const getSearchprogram = async () => {
  return getAllPrograms();
};
export default getSearchprogram;

const getAllPrograms = unstable_cache(async () => {
  const GET_ALL_PROGRAMS = gql`
    {
      query
      allprograms {
        programs(first: 100000) {
          nodes {
            title
            status
            slug
            programId
            programfield {
              affiliateurl
              applyurl
              avgreview
              commissionrate
              commissiontext
              postcount
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
            networks {
              nodes {
                slug
                name
                networkId
              }
            }
            countries {
              nodes {
                name
              }
            }
            niches {
              nodes {
                slug
                name
                nicheId
              }
            }
          }
        }
      }
    }
  `;

  
try {
    const {data} = await getClient().query({
      query: GET_ALL_PROGRAMS,
      context: {
        headers: {
          Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
        },
        
      },
    });
    // console.log(data.niches.nodes);
    return data.programs.nodes;
  } catch (error) {
    return ("error! Data not found ");
  }
  },
  ['AllPrograms'],
  {
    revalidate: 60 * 60 * 3,
  }

);
