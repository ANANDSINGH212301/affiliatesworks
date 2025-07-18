"use server";

import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { unstable_cache } from "next/cache";

export const GetNetworkPrograms = async (
  slug: string,
  offset: number,
) => {
  const fetchNetwork = unstable_cache(
    async ( slug:string, offset:number) => {
      const  GET_SINGLE_NETWORK = gql`
        query GetNetworkPrograms(
          $slug: [String]
          $offset: Int!
        ) {
          programs(
            where: {
              taxQuery: {
                taxArray: { taxonomy: NETWORK, terms: $slug, field: SLUG }
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
                avgreview
                applyurl
                commissionrate
                commissiontext
                commissiontype
                conversiontype
                logo
                payoutmethod
                payouttype
                postcount
                programstatus
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
              niches {
                nodes {
                  slug
                  nicheId
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
              countries {
                nodes {
                  slug
                  name
                  countryId
                }
              }
            }
            pageInfo {
              offsetPagination {
                total
              }
            }
          }
        }
      `;

      try {
        // console.log(slug, offset);
        const { data } = await getClient().query({
          query:  GET_SINGLE_NETWORK,
          variables: { slug,  offset },
          context: {
            headers: {
              Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
            },
          },
        });
        // console.log(data)
        return (
          data?.programs || {
            nodes: [],
            pageInfo: { offsetPagination: { total: 0 } },
          }
        );
      } catch (error) {
        console.error(`Error fetching programs for category ${slug}:`, error);
        return { nodes: [], pageInfo: { offsetPagination: { total: 0 } } };
      }
    },
    // Correct way to provide a static key:
    [`GetCategory-${slug}-offset-${offset}`],
    {
      tags: [`category-${slug}`],
      revalidate: 60 * 60 * 3,
    }
  );

  return await fetchNetwork( slug, offset);
};

export const GetNetworkData = async (slug: string) => {
  const fetchNetwork = unstable_cache(
    async () => {
      const GET_SINGLE_NETWORK = gql`
        query GetSingleCategory($slug: ID!) {
            network(id: $slug, idType: SLUG) {
            count
            description
            networkId
            slug
            name
            seo {
              description
              focusKeywords
              title
            }
            networkfield {
              logo {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      `;

      try {
        const { data } = await getClient().query({
          query: GET_SINGLE_NETWORK,
          variables: { slug },
          context: {
            headers: {
              Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
            },
          },
        });

        return data?.network;
      } catch (error) {
        console.error(`Error fetching network for slug ${slug}:`, error);
        return null;
      }
    },
    [`GetNetworkData-${slug}`],
    {
      tags: [`NetworkData-${slug}`],
      revalidate: 60 * 60 * 3,
    }
  );

  return await fetchNetwork();
};
