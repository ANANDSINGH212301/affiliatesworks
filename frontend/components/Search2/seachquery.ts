"use server";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";
import { unstable_cache } from "next/cache";

interface SearchVariables {
  search: string;
  category: string;
  network: string;
  country: string;
  offset: number;
}

export const GetSearchResult = async (variables: SearchVariables) => {
  const GET_SEARCH_RESULT = gql`
    query SearchProgram(
      $search: String
      $category: [String]
      $network: [String]
      $country: [String]
      $offset: Int
    ) {
      programs(
        where: {
          search: $search
          status: PUBLISH
          taxQuery: {
            taxArray: [
              { field: SLUG, operator: AND, taxonomy: NICHE, terms: $category }
              { field: SLUG, operator: AND, taxonomy: NETWORK, terms: $network }
              { field: SLUG, operator: AND, taxonomy: COUNTRY, terms: $country }
            ]
            relation: AND
          }
          offsetPagination: { offset: $offset, size: 9 }
        }
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
            websiteurl
            conversiontype
            verified
            sponsered
            recommeded
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
        pageInfo {
          offsetPagination {
            hasMore
            hasPrevious
            total
          }
        }
      }
    }
  `;
  // console.log(variables);
  try {
    const { data } = await getClient().query({
      query: GET_SEARCH_RESULT,
      variables: variables,
      context: {
        headers: {
          Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
        },
      },
    });
    // console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return null; // Return a default value instead of re-throwing the error
  }
};
