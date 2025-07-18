import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";

export default async function sitemap(): Promise<MetadataRoute.Sitemap>{

    const networkurl = await getSitemapUrl();
    const fullurls = networkurl.map((network: {slug: string})=>{
                return {
                    url: `https://program.affiliatesworks.com/${network.slug}`,

                }
            })
    return[
        {
            url:"https://program.affilaitesworks.com/network"
        },
        ...fullurls
    ]
}



const getSitemapUrl = unstable_cache(
    async () => {
      const Get_SLUGS = gql`
        query category {
          networks(where: {}, first: 10000) {
            nodes {
              slug
            }
          }
        }
      `;
  
      const { data } = await getClient().query({
        query: Get_SLUGS,
        context: {
          headers: {
            Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
          },
        },
      });
  
      // console.log(data.networks.nodes);
  
      return data.networks.nodes;
    },
    ["networksitemap"],
    {
      tags: ["sitemap"],
      revalidate: 24 * 60 * 60,
    }
  );
  