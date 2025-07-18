import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoryListingProps {
  title: string;
  number: number;
  href: string;
  image?: string;
}

function CategoryListing({ title, number, href, image }: CategoryListingProps) {
  return (
    <div className="border bg-white  p-3 rounded-md flex gap-4 flex-grow lg:col-span-2 sm:col-span-3 col-span-6 ">

      {image?
        <Image
          src={image ||  "/images/Affiliatesworks.svg"}
          alt="logo"
          width={50}
          height={50}
          className="w-[55px] h-[55px] p-2 rounded-md shadow-sm border"
        />
         :  <Image
         src={  "/images/Affiliatesworks.svg"}
         alt="logo"
         width={50}
         height={50}
         className="w-[55px] h-[55px]  rounded-md shadow-sm"
       /> }

      

      <Link href={`/category/${href}`} className="w-full">
      <div>

        <h4 className="lg:text-lg font-semibold text-base ">{title}</h4>
        <p className="text-sm ">
          Available Program <span>{number || 0}</span>
        </p>
      </div>
      </Link>
    </div>
  );
}

export default CategoryListing;
