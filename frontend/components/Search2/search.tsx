"use server";

import { ProgramListingType } from "@/Data/types/program";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";



interface SearchVariables {
  search: string;
  category: string;
}


export const GetSearchResult = async (variables: SearchVariables) => {
  const GET_LATESTPROGRAM = gql `
    query Searchprogram ($search: String, $terms: [String] ){
    programs(
        where: {status: PUBLISH, search: $search, taxQuery: {taxArray: {field: SLUG, taxonomy: NICHE, operator: AND, terms: $terms}, relation: AND}}
        ) {
      nodes {
        title
        status
        slug
        programId
        programfield {
          logo
          postcount
          commissiontext
          avgreview
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        countries {
          nodes {
            name
          }
        }
        networks {
          nodes {
            slug
            name
            networkId
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
    `
  
  
  


  try {
   
    const {data} = await getClient().query({
        query: GET_LATESTPROGRAM,
        variables: variables,
        context: {
          headers: {
            Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
          },
        },
      });

      // console.log(data.programs.nodes);
      return data.programs.nodes as ProgramListingType[];

  } catch (error) {
    console.error("Error:", error);
    return [];

  }
};
