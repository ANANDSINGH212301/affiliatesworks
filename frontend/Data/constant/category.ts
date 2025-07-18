"use server"

import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { unstable_cache } from "next/cache";




const getCategories = async()=>{
  return getAllCategories();
}
export default getCategories


const getAllCategories = unstable_cache(async () => {
   
  const GET_ALL_CATEGORY = gql`
  query AllCategory {
  niches(first: 1000) {
    nodes {
      slug
      nicheId
      name
      count
    }
  }
}`


try {
  const {data} = await getClient().query({
    query: GET_ALL_CATEGORY,
    context: {
      headers: {
        Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
      },
      
    },
  });
  // console.log(data.niches.nodes);
  return data.niches.nodes;
} catch (error) {
  return ("error! Data not found ");
}
},
  
['ALLCategory'],
{
  revalidate: 60 * 60 * 24, // Revalidate every 24 hours
}


);