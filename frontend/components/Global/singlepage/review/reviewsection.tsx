import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { unstable_cache } from "next/cache";
import React from "react";
import AllReviewListing from "./allreviewlisting";
import ReviewCard from "./reviewcard";

const ReviewSection = async ({ slug }: { slug: string }) => {
  const response = await GetProgramReviews(slug);
  const reviewscount = response.comments.nodes.length;
  // console.log(reviewscount);
  const avgreview = response.programfield.avgreview;
  // console.log(avgreview);

  return (
    <section className="py-1 bg-[#fceaea] -mt-6">
      <div className="lg:container mx-auto px-2 my-5">
        <div className="bg-white px-4 rounded-md  p-5 md:px-7 md:p-">
          <div>
            <h2 className="text-2xl font-semibold mb-1 w-full">Reviews</h2>
            <hr className="w-12  border-b-2 border-primary rounded-lg" />
          </div>

          <div className="flex  flex-wrap justify-between gap-4 md:mt-3">
            <div className="border-b-2 border-primary-foreground py-2 w-full">
              <ReviewCard averageRating={avgreview} reviewscount={reviewscount} title={response.title} id={response.programId}/>
            </div>
            <div className="w-full ">
              <AllReviewListing comments={response.comments.nodes}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;

const GetProgramReviews = async (slug: string) => {
  // Define the cache function, dynamically incorporating the slug

  const fetchProgramReviews = unstable_cache(
    async (slug) => {
      // console.log(slug)
      const GET_Reviews = gql`
        query program($slug: ID!) {
          program(id: $slug, idType: SLUG) {
            title
            status
            slug
            programId
            commentCount
            commentStatus
            programfield {
              avgreview
            }
            comments(first: 100000, where: { orderby: COMMENT_DATE }) {
              nodes {
                id
                date
                content
                commentId
                review {
                  review
                }
                author {
                  node {
                    email
                    name
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
          query: GET_Reviews,
          variables: { slug },
          context: {
            headers: {
              Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
            },
          },
        });
        // console.log(data);
        return data.program;
      } catch (error) {
        console.error("Error fetching category:", error);
        return null;
      }
    },
    [`GetReviews-${slug}`], // Unique cache key per slug
    {
      tags: [`Reviews-${slug}`], // Unique tag per slug
      revalidate: 60 * 60 * 3, // Revalidate every 24 hours
    }
  );

  // Call the cached function and return the result
  return await fetchProgramReviews(slug);
};
