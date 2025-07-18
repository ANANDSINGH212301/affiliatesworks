import { Button } from "@/components/ui/button";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import { Cache, gql, useQuery } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";
import CategoryListing from "@/components/Global/Listing/Category/CategoryListing";
import { ProgramListingType } from "@/Data/types/program";
import { generateSchemacategoryListing } from "@/Data/schema/category";
import Head from "next/head";
import { Metadata } from "next";

interface Category {
  name: string;
  slug: string;
  nicheId: number;
  count: number;
  nichefield: {
    image: {
      node: {
        sourceUrl: string;
      };
    };
  };
}

// const GET_CATEGORIES = gql`
//   query GetCategories {
//     niches(where: { orderby: COUNT }) {
//       nodes {
//         slug
//         nicheId
//         name
//         count
//         nichefield {
//           image {
//             node {
//               sourceUrl
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// const getPopCategory = unstable_cache(
//   async () => {
//     try {
//       const { data } = await getClient().query({
//         query: GET_CATEGORIES,
//         context: {
//           headers: {
//             Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
//           },
//         },
//       });
//       return data.niches.nodes;
//     } catch (error) {
//       throw new Error("Failed to fetch categories");
//     }
//   },
//   ["PopularCategory"],
//   { revalidate: 60 * 60 * 3 }
// );

interface PopularCategoryProps {
  categories: Category[];
}

const PopularCategory = async ({ categories }: PopularCategoryProps) => {
  // const categories = await getPopCategory();
  if (!categories || categories.length === 0) {
    return <p>No categories available at the moment.</p>;
  }

  return (
    <>
      <section className="container">
        <div className="px-5 py-14 mx-auto">
          <div className="sm:flex items-center justify-between gap-5">
            <div className="mb-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                Popular Categories
              </h2>
              <p className="text-sm md:text-[16px] mt-1 md:mt-2">
                Updated daily
              </p>
            </div>
            <div>
              <Link href="/category">
                <Button
                  size="lg"
                  className="md:py-6 border-2 border-primary text-primary"
                  variant="outline"
                >
                  <span className="mr-2">Browse All</span>
                  <FaArrowRightLong />
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 pt-4">
            {categories.map((category: Category) => (
              <CategoryListing
                title={category.name}
                number={category.count}
                href={category.slug}
                key={category.nicheId}
                image={category.nichefield.image?.node?.sourceUrl || ""}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularCategory;

export async function generateMetadata({
  categories,
}: PopularCategoryProps): Promise<Metadata> {
  // const categories = await getPopCategory();
  const schema = generateSchemacategoryListing(categories);
  return {
    other: {
      "application/ld+json": JSON.stringify(schema),
    },
  };
}
