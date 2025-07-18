import {
  ProgramListingType,
  ProgramListingPageType,
} from "@/Data/types/program";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { unstable_cache } from "next/cache";

export const GetProgram = async (slug: string) => {
  const GET_SINGLE_PROGRAM = gql`
    query program($slug: ID!) {
      program(id: $slug, idType: SLUG) {
        id
        title
        status
        slug
        programId
        content
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        seo {
          description
          focusKeywords
        }
        programfield {
          affiliateurl
          applyurl
          avgreview
          commissionrate
          commissiontext
          commissiontype
          conversiontype
          description
          facebook
          instagram
          linkedin
          logo
          payoutmethod
          payouttype
          pinterest
          postcount
          previewurl
          programstatus
          reddit
          terms
          tiktok
          websiteurl
          youtube
          faq {
            fieldGroupName
            question
            answer
          }
        }
        niches {
          nodes {
            slug
            name
            nicheId
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
            countryId
          }
        }
      }
    }
  `;

  const fetchProgram = unstable_cache(
    async (slug: string) => {
      console.log("Cache miss - fetching new data");
      try {
        const { data } = await getClient().query({
          query: GET_SINGLE_PROGRAM,
          variables: { slug },
          context: {
            headers: {
              Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
            },
          },
        });

        if (!data?.program) {
          // console.log(`No program found for ${slug}`);
          return null;
        }
        // console.log(data.program);
        // console.log(`Successfully fetched program data for ${slug}`);
        return data.program;
      } catch (error) {
        // console.error(`Error fetching program for ${slug}:`, error);
        return null;
      }
    },
    [`GetProgram-${slug}`],
    {
      tags: [`Program-${slug}`],
      revalidate: 60 * 60 * 24,
    }
  );
  console.log("old request");
  return await fetchProgram(slug);
};

export const GetRelatedProgram = async (
  slug: string,
  categorySlugs: string[]
) => {
  const fetchRelatedProgram = unstable_cache(
    async (slug: string, niches: string[]) => {
      const GET_RELATED_PROGRAM = gql`
        query relatedProgram($terms: [String!]) {
          programs(
            first: 6
            where: {
              taxQuery: {
                relation: OR
                taxArray: {
                  taxonomy: NICHE
                  terms: $terms
                  field: SLUG
                  includeChildren: true
                }
              }
              random: true
            }
          ) {
            nodes {
              title
              status
              slug
              programId
              featuredImage {
                node {
                  sourceUrl
                }
              }
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
      `;

      try {
        const { data } = await getClient().query({
          query: GET_RELATED_PROGRAM,
          variables: { terms: niches },
          context: {
            headers: {
              Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
            },
          },
        });
        return data?.programs.nodes as ProgramListingType[];
      } catch (error) {
        console.error("Error fetching related programs:", error);
        return [];
      }
    }
  );

  return await fetchRelatedProgram(slug, categorySlugs);
};

export const generateSchema = (
  program: ProgramListingPageType,
  relatedPrograms: ProgramListingType[]
) => {
  const {
    title,
    slug,
    programstatus,
    seo,
    featuredImage,
    programfield,
    niches,
    networks,
    countries,
  } = program;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: `https://program.affiliatesworks.com/${slug}`,
    description: seo?.description,
    image: featuredImage?.node?.sourceUrl,
    mainEntityOfPage: {
      "@type": "Organization",
      name: title,
      logo: programfield.logo,
      url: programfield.websiteurl,
      sameAs: [
        programfield.facebook,
        programfield.instagram,
        programfield.linkedin,
        programfield.youtube,
        programfield.pinterest,
        programfield.tiktok,
        programfield.reddit,
      ].filter(Boolean), // Exclude null or undefined social links
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: programfield.avgreview || 0,
      reviewCount: programfield.postcount || 0,
    },
    potentialAction: {
      "@type": "Action",
      name: "Apply Now",
      target:
        programfield.applyurl || `https://program.affiliatesworks.com/${slug}`,
    },
    about: niches?.nodes?.length
      ? niches.nodes.map((niche) => ({
          "@type": "Thing",
          name: niche.name,
        }))
      : undefined,
    provider: networks?.nodes?.length
      ? networks.nodes.map((network) => ({
          "@type": "Organization",
          name: network.name,
        }))
      : undefined,
    areaServed: countries?.nodes?.length
      ? countries.nodes.map((country) => ({
          "@type": "Country",
          name: country.name,
        }))
      : undefined,
    mainEntity: programfield?.faq?.length
      ? programfield.faq.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        }))
      : undefined,
    offers: {
      "@type": "Offer",
      name: "Affiliate Commission Details",
      description:
        programfield?.commissiontext || "Commission details not available",
      category: "Affiliate Program",
      url: programfield?.applyurl || undefined, // Affiliate link if available
      availability: programstatus || "Unknown",
    },

    relatedLink: {
      "@type": "ItemList",
      name: "Related Programs",
      itemListElement: relatedPrograms.map(
        (relatedProgram: ProgramListingType, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://program.affiliatesworks.com/${relatedProgram.slug}`,
          name: relatedProgram.title,
          image: relatedProgram.featuredImage?.node?.sourceUrl,
        })
      ),
    },
  };

  return schema;
};
