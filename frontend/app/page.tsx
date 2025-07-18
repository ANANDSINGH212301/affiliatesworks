import FAQ from "@/components/Pages/Home/faq";
import Hero from "@/components/Pages/Home/hero";
import PopularCategory from "@/components/Pages/Home/popular-category";
import PopularPrograms from "@/components/Pages/Home/popular-Programs";
import Testimonials from "@/components/Pages/Home/testimonials";
import { generateSchemacategoryListing } from "@/Data/schema/category";
import { generateSchemaProgramListing } from "@/Data/schema/program";
import { ProgramListingType } from "@/Data/types/program";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";

export default async function Home() {
  const homedata = await getPopCategory();
  const categories = homedata.niches.nodes;
  const programs: ProgramListingType[] = homedata.programs.nodes;
  // console.log(programs);
  return (
    <>
      <Hero />
      <PopularCategory categories={categories} />
      <PopularPrograms Programs={programs} />
      <Testimonials />
      <FAQ />
    </>
  );
}

const GET_HomeData = gql`
  query HomeData {
    niches(first: 9, where: { orderby: COUNT }) {
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
    programs(first: 9, where: { orderby: { field: DATE, order: DESC } }) {
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

const getPopCategory = unstable_cache(
  async () => {
    try {
      const { data } = await getClient().query({
        query: GET_HomeData,
        context: {
          headers: {
            Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
          },
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
  ["Homedata"],
  { revalidate: 60 * 60 * 3 }
);


export async function generateMetadata(): Promise<Metadata> {
  
  const homedata = await getPopCategory();
  const categories = homedata.niches.nodes;
  const programs: ProgramListingType[] = homedata.programs.nodes;
  const categoriesSchema = generateSchemacategoryListing(categories);
  const programsSchema = generateSchemaProgramListing(programs);

  const combinedSchemas = [categoriesSchema, ...programsSchema];

  // if (!homedata) {
  //   // console.warn(`Program not found for slug: ${slug}`);
  //   return {
  //     other{

  //     }
  //   };
  // }
   


  return {
    other:{
      'application/ld+json' : JSON.stringify(combinedSchemas),
    }
  };
}
