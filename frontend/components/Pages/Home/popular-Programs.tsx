import React from "react";
import { Button } from "@/components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { unstable_cache } from "next/cache";
import { ProgramListingType } from "@/Data/types/program";
import ProgramListing from "@/components/Global/Listing/Program/Program-Listing";


interface PopularProgramsProps {
  Programs: ProgramListingType[];
}

export default async function PopularPrograms({Programs}:PopularProgramsProps) {
  // const programs = await getLatestProgram();
  // console.log(Programs);

  return (
    <section className="container" id="Popular-programs">
      <div className="px-2 py-14 mx-auto">
        <div className="sm:flex items-center justify-between gap-5">
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              Latest Affiliate Programs
            </h2>
            <p className="text-sm md:text-[16px] mt-1 md:mt-2">
              1000 Programs Live - 20+ Added Today.
            </p>
          </div>
          <div>
            <Link href={"/search"}>
              <Button
                size={"lg"}
                className="md:py-6 border-2 border-primary text-primary"
                variant={"outline"}
              >
                <span className="mr-2">Browse All</span> <FaArrowRightLong />
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid gap-2 grid-cols-12 mt-3">
          {Programs.length === 0 ? (
            <div>No programs found.</div>
          ) : (
            Programs.map((program: ProgramListingType) => (
              <ProgramListing key={program.programId} program={program} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

// const getLatestProgram = unstable_cache(
//   async () => {
//     const GET_LATESTPROGRAM = gql`
//       query LatestProgram {
//         programs(first: 9, where: { orderby: { field: DATE, order: DESC } }) {
//           nodes {
//             title
//             status
//             slug
//             programId
//             featuredImage {
//               node {
//                 sourceUrl
//               }
//             }
//             programfield {
//               logo
//               postcount
//               commissiontext
//               avgreview
//             }
//             countries {
//               nodes {
//                 name
//               }
//             }
//             networks {
//               nodes {
//                 slug
//                 name
//                 networkId
//               }
//             }
//             niches {
//               nodes {
//                 slug
//                 name
//                 nicheId
//               }
//             }
//           }
//         }
//       }
//     `;

//     try {
//       const { data } = await getClient().query({
//         query: GET_LATESTPROGRAM,
//         context: {
//           headers: {
//             Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
//           },
//         },
//       });
//       // console.log(data.programs.nodes);
//       return data?.programs.nodes;
//     } catch (error) {
//       console.error("Error fetching programs:", error);
//       return [];
//     }
//   },
//   ["PopularPrograms"],
//   {
//     revalidate: 60 * 60 * 3, // Revalidate every 24 hours
//   }
// );
