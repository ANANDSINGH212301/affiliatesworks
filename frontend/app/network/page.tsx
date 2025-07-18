import React from "react";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";
import AllnetworksPage from "@/components/Pages/Taxonomy/network";

export const metadata: Metadata = {
  title: "Explore All Affiliate Program by Networks | Affiliatesworks",
  description:
    "Maximize your earnings with our list of top affiliate networks, offering a wide range of programs.",
  openGraph: {
    title: "Explore All Affiliate Program by Networks | Affiliatesworks",
    description:
      "Maximize your earnings with our list of top affiliate networks, offering a wide range of programs.",
    type: "website",
  },
  robots: {
    index: true,
  },
  alternates: {
    canonical: "https://program.affiliatesworks.com/network",
  },
};

const page = async () => {
  const network = await GetNetworks();
  // console.log(network);
  return <AllnetworksPage networks={network} />;
};

export default page;

const GetNetworks = unstable_cache(
  async () => {
    // Define the GraphQL query to fetch categories
    const GET_ALL_NETWORKS_QUERY = gql`
      query FetchNetworks {
        networks(first: 1000, where: { orderby: NAME, order: ASC }) {
          nodes {
            slug
            networkId
            name
            count
            networkfield {
              logo {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    `;

    try {
      // Execute the query with authorization header
      const { data } = await getClient().query({
        query: GET_ALL_NETWORKS_QUERY,
        context: {
          headers: {
            Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
          },
        },
      });

      // console.log(data?.networks?.nodes);
      // Return the nodes if data is available
      return data?.networks?.nodes || [];
    } catch (error) {
      // Log error and handle as needed
      console.error("Error fetching categories:", error);
      return [];
    }
  },
  ["AllNetworks"],
  {
    tags: ["Networks"],
    revalidate: 60 * 60 * 3, // Revalidate every 24 hours
  }
);
