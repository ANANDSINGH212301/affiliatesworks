"use server";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import * as z from "zod";

const ReviewSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.string().email("Invalid email address"),
  rating: z
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating must be between 1 and 5"),
  reviewText: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review is too long"),
});

export const SubmitReview = async (
  programid: number,
  values: z.infer<typeof ReviewSchema>
) => {
  const validatedFields = ReviewSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  // console.log(values, "programid", programid);

  const CREATE_COMMENT = gql`
    mutation UpdatePostCount(
      $programID: ID!
      $name: String!
      $email: String!
      $rating: Int!
      $reviewText: String!
    ) {
      createCommentWithReview(
        input: {
          author: $name
          authorEmail: $email
          commentOn: $programID
          content: $reviewText
          review: $rating
          status: "HOLD"
        }
      ) {
        clientMutationId
        message
        success
      }
    }
  `;

  try {
    // Execute the query with authorization header
    const { data } = await getClient().mutate({
      mutation: CREATE_COMMENT,
      variables: {
        programID: programid,
        name: values.name,
        email: values.email,
        rating: values.rating,
        reviewText: values.reviewText,
      },
      context: {
        headers: {
          Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
        },
      },
    });

     // console.log(data);
    // console.log(data.result.error);
    // if (data.result.error) {
    //   console.error(data.result.error);
    //   return { error: "something went wrong!" };
    // }
    return { success: "Thank you for submitting your review!" };
  } catch (error) {
    console.error("Error fetching category:", error);
    return { error: "something went wrong!" };
  }
};
