"use server"
import Link from "next/link";
import React from "react";


type categorytype = {
  name : string,
  slug : string,
  count: number,
}

const SidebarCategoryListing = (category: categorytype) => {
  // console.log(category);
  return (
    
      <Link href={`/category/${category.slug}`}>
        <div>
          hi
          {category.name}
        </div>
        <div>
        <span>{category.count || 0}</span>

        </div>
      </Link>
      
 
  );
};

export default SidebarCategoryListing;
