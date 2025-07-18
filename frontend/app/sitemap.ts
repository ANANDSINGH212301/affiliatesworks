

import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";

export default async function sitemap(): Promise<MetadataRoute.Sitemap>{

    


    const programsurl = await getSitemapUrl();
    const fullurls = programsurl.map((program: {slug : string})=>{
                return {
                    url: `https://program.affiliatesworks.com/${program.slug}`,

                }
            })

    return[
        {
            url:"https://program.affiliatesworks.com"
        },
        {
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/category/sitemap.xml`
        },
        {
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/network/sitemap.xml`
        },
        ...fullurls
    ]
}



const getSitemapUrl = unstable_cache(
     async ()=>{
      const Get_SLUGS = gql`query MyQuery2 {
        programs(where: {orderby: {field: DATE, order: DESC}}, first: 1000) {
          nodes {
            slug
          }
        }
      }`

    const { data } = await getClient().query({
    query: Get_SLUGS,
    context: {
      headers: {
        Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
      },
    },
  });

    // console.log(data.programs.nodes);

    return data.programs.nodes;
     }
     ,['mainsitemap'],
     {
      tags: ['sitemap'],
      revalidate: 24*60*60

     }
);