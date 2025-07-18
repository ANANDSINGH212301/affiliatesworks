import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


interface NetworkListingProps {
    title: string;
    number: number;
    href: string;
    image?: string;
    affiliateurl: string;
  }
  
const NetworkListing = ({ title, number, href, image, affiliateurl }: NetworkListingProps) => {
  return (
    <div className="border bg-white  p-3 rounded-md flex gap-4 flex-grow sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
   
        <Image
          src={image ||  "/images/Affiliatesworks.svg"}
          alt="logo"
          width={50}
          height={50}
          className="w-[55px] h-[55px]  rounded-md shadow-sm"
        />
      

      <Link href={`/network/${href}`} className="w-full flex justify-between items-center">
      <div>

        <h4 className="text-lg font-semibold hover:text-primary">{title}</h4>
        <p className="text-sm ">
          Available Program <span>{number || 0}</span>
        </p>
      </div>
      <div >
        <Link href={affiliateurl || "https://affiliatesworks.com"} className='text-sm px-3 py-2 rounded-md bg-primary text-white '>Join</Link>
      </div>
      </Link>
    </div>
  )
}

export default NetworkListing
