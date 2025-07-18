
import React from "react";


import Link from "next/link";

import { unstable_cache } from "next/cache";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";

interface Category {
  slug: string;
  count: number;
  categoryId: number;
  name: string;
  nichefield: {
    image?: {
      node?: {
        sourceUrl?: string;
      };
    };
  };
}

const SidebarCategory = async() => {
  // const [categories, setCategories] = useState<Category[]>([]);



      const categories = await getsidebarCategories();

      // console.log(categories);
    



  return (
    <div className="w-full bg-white rounded-md shadow-sm p-3 pt-4 ">
      <div>     
        <span className="text-lg font-semibold">Popular Category</span>
        <hr className="w-16 border-b-2 border-primary rounded-lg" />
      </div>
      <div className=" my-3  flex   flex-col gap-1 ">
        {Array.isArray(categories) &&
          categories.map((category, index: number) => (
            <Link key={index} href={`/category/${category.slug}`} className="flex p-2 border hover:border-primary rounded-sm  cursor-pointer justify-between ">
              <h5 className="text-sm font-semibold">{category.name}</h5>
              <span>{category.count || 0}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SidebarCategory;



const getsidebarCategories = unstable_cache(
  async () => {
    const GET_POP_CATEGORIES = gql`
     query category {
  niches(where: {orderby: COUNT}, first: 5) {
    nodes {
      slug
      name
      count
    }
  }
}
    `

const { data, loading, error } = await getClient().query({
  query: GET_POP_CATEGORIES,
  context: {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
    },
  },
});

// console.log(data.niches.nodes);
return data.niches.nodes;
  },
  ['sidebar-popcategories'],
  {
    revalidate: 24*60*60
  }
)