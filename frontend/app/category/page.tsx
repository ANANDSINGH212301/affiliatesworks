
import AllcategoriesPage from '@/components/Pages/Taxonomy/category'
import { getClient } from '@/lib/apollo-client'
import { gql } from '@apollo/client'
import { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import React from 'react'



export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = `https://program.affiliatesworks.com/category`
  return {
    title: "Explore All Affiliate Program Categories | Affiliatesworks",
    description: `Discover a wide range of affiliate programs across multiple categories & niches. Find the perfect programs to suit your niche.`,
    openGraph: {
      title: "Explore All Affiliate Program Categories | Affiliatesworks",
      description: `Discover a wide range of affiliate programs across multiple categories & niches. Find the perfect programs to suit your niche.`,
      url: canonicalUrl,
      images: ["https://program.affiliatesworks.com/opengraph-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
    
    alternates:{
      canonical : "https://program.affilaitesworks.com/category"
    }
  }
}



const page = async () => {

  

  const categories = await GetCategories();
  // console.log(categories);
  
  return (
    
    <AllcategoriesPage categories={categories}/>
    
  )
}

export default page

const GetCategories = unstable_cache(
  async () => {
    // Define the GraphQL query to fetch categories
    const GET_ALL_CATEGORIES_QUERY = gql`
      query FetchCategories {
        niches(first: 1000, where: { orderby: NAME, order: ASC }) {
          nodes {
            slug
            nicheId
            name
            count
            nichefield {
              image {
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
        query: GET_ALL_CATEGORIES_QUERY,
        context: {
          headers: {
            Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
          },
        },
      });

      // console.log(data?.niches.nodes);
      return data?.niches?.nodes || [];
    } catch (error) {
      // Log error and handle as needed
      console.error("Error fetching categories:", error);
      return [];
    }
  },
  ['AllCategory'],
  {
    tags: ['categories'],
    revalidate: 60 * 60 * 3, 
  }
);
