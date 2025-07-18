"use server"
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

export async function updateviewscount(id: string, viewcount: number) {
    const count = viewcount + 1;
    const UPDATE_VIEWS_COUNT = gql`
      mutation UpdatePostCount($programID: ID!, $newCount: Int!) {
        updatePostCount(input: { programID: $programID, newCount: $newCount }) {
            programID
            postcount
        }
      }
    `;
  
    try {
      // Execute the query with authorization header
      const { data } = await getClient().mutate({
        mutation: UPDATE_VIEWS_COUNT,
        variables: { programID: id, newCount: count },
        context: {
          headers: {
            Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
          },
        },
      });
      // console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching category:", error);
      return null;
    }
  }
  