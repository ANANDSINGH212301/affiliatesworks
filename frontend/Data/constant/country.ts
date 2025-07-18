"use server"

import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { unstable_cache } from "next/cache";




const getCountries = async()=>{
  return getAllCountries();
}
export default getCountries


const getAllCountries = unstable_cache(async () => {
   
  const GET_ALL_COUNTRY = gql`
  query AllCountry {
  countries(first: 1000) {
    nodes {
      slug
      countryId
      name
      count
    }
  }
}`


try {
  const {data} = await getClient().query({
    query: GET_ALL_COUNTRY,
    context: {
      headers: {
        Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
      },
      
    },
  });
  // console.log(data.countries.nodes);
  return data.countries.nodes;
} catch (error) {
  return ("error! Data not found ");
}
},
  
['ALLCountry'],
{
  revalidate: 60 * 60 * 24, // Revalidate every 24 hours
}


);


