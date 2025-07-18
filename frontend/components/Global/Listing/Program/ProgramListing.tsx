"use client";
import React from "react";
import { MdVerified } from "react-icons/md";
import Image from "next/image";
import { ProgramListingType } from "@/Data/types/program";
import { useRouter } from "next/navigation";
import Stars from "../../singlepage/review/star";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiSolidCategory } from "react-icons/bi";
import { TiLocation } from "react-icons/ti";
import { FaNetworkWired } from "react-icons/fa";

interface ProgramListingProps {
  program: ProgramListingType;
}

const ProgramListing = ({ program }: ProgramListingProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/${program.slug}`);
  };

  return (
    <>
      <div
        className="border border-gray-300 col-span-12 sm:col-span-6 lg:col-span-4 w-full bg-white p-1 sm:p-2 rounded-lg 
        shadow-sm hover:shadow-lg space-y-3 cursor-pointer"
           // onClick={handleNavigation}
      >
        <div className="flex gap-1 sm:gap-2">
          <div className="flex items-center justify-center border border-gray-200 p-1 rounded-md min-w-14 h-14 md:min-w-16 md:min-h-16">
            <Image
              src={
                program.featuredImage?.node?.sourceUrl ||
                "/images/Affiliatesworks.svg"
              }
              alt={program.title || "Program Image"}
              className="block w-14 h-14 object-contain"
              loading="lazy"
              width={50}
              height={50}
            />
          </div>
          <div className="w-full  space-y-1">
            <div>
              <Link href={`/${program.slug}`} className="cursor-pointer">
                <h4 className="text-lg font-semibold tracking-wide">
                  {program.title}
                </h4>
              </Link>
            </div>
            <div>
              <Stars stars={program.programfield.avgreview || 0} />
            </div>
          </div>
        </div>
        <div className="px-2 space-y-1">
          <div className="flex items-center gap-2">
            <div>
              <FaNetworkWired size={25} className="text-primary" />
            </div>
            <div>
              {program.networks?.nodes
                ?.slice(0, 2)
                .map((network, index, array) => (
                  <React.Fragment key={index}>
                    <Link
                      className="text-[14px] tracking-wide font-normal hover:text-secondary"
                      href={`/network/${network.slug}`}
                    >
                      {network.name}
                    </Link>
                    {index < array.length - 1 && <span> | </span>}
                  </React.Fragment>
                ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <BiSolidCategory size={25} className="text-primary" />
            </div>
            <div className="space-x-1">
              {program.niches?.nodes?.slice(0, 2).map((niche, index, array) => (
                <React.Fragment key={index}>
                  <Link
                    className="text-[14px] tracking-wide font-normal hover:text-secondary"
                    href={`/category/${niche.slug}`}
                  >
                    {niche.name}
                  </Link>
                  {index < array.length - 1 && <span> | </span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <TiLocation size={25} className="text-primary" />
            </div>
            <div className="space-x-1">
              {program.countries?.nodes
                ?.slice(0, 2)
                .map((country, index, array) => (
                  <React.Fragment key={index}>
                    <span className="text-[14px] tracking-wide font-normal hover:text-secondary inline-block">
                      {country.name}
                    </span>
                    {index < array.length - 1 && <span> | </span>}
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="w-full  hover:text-primary border border-primary bg-white text-primary hover:bg-white py-5 rounded-lg cursor-pointer">
            {program.programfield.commissiontext}
          </Button>
          <Button
            className="w-full text-white hover:text-white py-5 rounded-lg cursor-pointer"
            onClick={handleNavigation}
          >
            Read more
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProgramListing;
