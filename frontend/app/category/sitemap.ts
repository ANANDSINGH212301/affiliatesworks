import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 
  const categoryurl = await getSitemapUrl();
  const fullurls = categoryurl.map((category: {slug: string}) => {
    return {
      url: `https://program.affiliatesworks.com/${category.slug}`,
    };
  });
  return [
    {
      url: "https://program.affilaitesworks.com/category",
    },
    ...fullurls,
  ];
}

const getSitemapUrl = unstable_cache(
  async () => {
    const Get_SLUGS = gql`
      query category {
        niches(where: {}, first: 10000) {
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

    // console.log(data.niches.nodes);

    return data.niches.nodes;
  },
  ["categorysitemap"],
  {
    tags: ["sitemap"],
    revalidate: 24 * 60 * 60,
  }
);
