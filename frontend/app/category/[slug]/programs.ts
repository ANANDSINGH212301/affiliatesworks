"use server";

import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { unstable_cache } from "next/cache";

export const GetCategoryPrograms = async (
  slug: string,
  offset: number,
) => {
  const fetchCategory = unstable_cache(
    async ( slug:string, offset:number) => {
      const GET_SINGLE_CATEGORY = gql`
        query GetCategoryPrograms(
          $slug: [String]
          $offset: Int!
        ) {
          programs(
            where: {
              taxQuery: {
                taxArray: { taxonomy: NICHE, terms: $slug, field: SLUG }
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
          query: GET_SINGLE_CATEGORY,
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

  return await fetchCategory( slug, offset);
};

export const GetCategoryData = async (slug: string) => {
  const fetchCategory = unstable_cache(
    async () => {
      const GET_SINGLE_CATEGORY = gql`
        query GetSingleCategory($slug: ID!) {
          niche(id: $slug, idType: SLUG) {
            count
            description
            nicheId
            slug
            name
            seo {
              description
              focusKeywords
              title
            }
            nichefield {
              image {
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
          query: GET_SINGLE_CATEGORY,
          variables: { slug },
          context: {
            headers: {
              Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
            },
          },
        });

        return data?.niche;
      } catch (error) {
        console.error(`Error fetching category for slug ${slug}:`, error);
        return null;
      }
    },
    [`GetCategory-${slug}`],
    {
      tags: [`category-${slug}`],
      revalidate: 60 * 60 * 3,
    }
  );

  return await fetchCategory();
};
