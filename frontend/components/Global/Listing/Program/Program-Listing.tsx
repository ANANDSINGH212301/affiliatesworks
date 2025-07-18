"use client";
import React from "react";
import { ProgramListingType } from "@/Data/types/program";
import Image from "next/image";
import Link from "next/link";
import { FaThumbsUp } from "react-icons/fa";
import { LuBadgeDollarSign } from "react-icons/lu";
import { MdStars } from "react-icons/md";
import { BiWallet } from "react-icons/bi";
import Stars from "../../singlepage/review/star";

interface ProgramListingProps {
  program: ProgramListingType;
}

const ProgramListing = ({ program }: ProgramListingProps) => {
  // Memoize the website preview URL
  const websitePreviewUrl = React.useMemo(() => 
    `https://image.thum.io/get/width/800/crop/700/${
      program.programfield.websiteurl || "https://program.affiliatesworks.com"
    }`, 
    [program.programfield.websiteurl]
  );

  // // Memoize program badges
  // const ProgramBadges = React.memo(() => (
   
  // ));

  return (
    <div className="col-span-12 xs:col-span-6 sm:col-span-6 lg:col-span-4 w-full p-1 sm:p-2">
      <Link href={`/${program.slug}`}>
        <div className="h-full border-2 border-[#f4f6f9] bg-white rounded-xl hover:border-white hover:shadow-lg p-2 sm:p-3 transition-all duration-200 relative">
          {/* Website Preview with blur placeholder */}
          <div className="relative w-full h-40 sm:h-52 overflow-hidden rounded-lg bg-gray-50">
            <Image
              src={websitePreviewUrl}
              alt={`${program.title} website preview`}
              width={800}
              height={600}
              className="w-full h-full object-cover"
              loading="lazy"
              quality={75}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMjQ0OEJATjs7Qj44MzQ5TEdKS1BCR0pHQj84T1BCR0f/2wBDARUXFx4aHR4eHUdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            {/* <ProgramBadges /> */}
            <div className="absolute -bottom-2 right-2 flex gap-1">
      {program.programfield.verified && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-yellow-500 text-white flex justify-center items-center rounded-full shadow-md">
          <MdStars size={14} className="sm:text-base" />
        </div>
      )}
      {program.programfield.recommeded && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 text-white flex justify-center items-center rounded-full shadow-md">
          <FaThumbsUp size={14} className="sm:text-base" />
        </div>
      )}
      {program.programfield.sponsered && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 text-white flex justify-center items-center rounded-full shadow-md">
          <LuBadgeDollarSign size={14} className="sm:text-base" />
        </div>
      )}
    </div>
          </div>

          {/* Program Logo with blur placeholder */}
          <div className="relative -mt-8 sm:-mt-10 ml-3">
            <div className="w-14 h-14 sm:w-[70px] sm:h-[70px] border-2 border-[#f4f6f9] bg-white rounded-full overflow-hidden flex justify-center items-center shadow-md">
              <Image
                src={program.featuredImage?.node?.sourceUrl || "/images/Affiliatesworks.svg"}
                alt={program.title || "Program Logo"}
                className="object-contain p-1"
                width={60}
                height={60}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMjQ0OEJATjs7Qj44MzQ5TEdKS1BCR0pHQj84T1BCR0f/2wBDARUXFx4aHR4eHUdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          </div>

          {/* Program Details */}
          <div className="mt-2 p-1 sm:p-2 space-y-2">
            <h3 className="text-base sm:text-lg font-semibold tracking-wide line-clamp-1 -mb-2">
              {program.title}
            </h3>
            
            <Stars stars={program.programfield.avgreview || 0} />

            {/* Program Info Grid */}
            <div className="space-y-2 text-xs sm:text-sm mt-0.5">
              {/* Commission */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-slate-500">Commission</span>
                <span className="text-green-600 bg-green-100 font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                  <BiWallet className="text-green-500" />
                  <span className="line-clamp-1">{program.programfield.commissiontext}</span>
                </span>
              </div>

            <hr className="border-gray-100" />

              {/* Niches */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-slate-500">Niches</span>
                <div className="flex flex-wrap justify-end gap-1">
                  {program.niches?.nodes?.slice(0, 2).map((niche, index, array) => (
                    <React.Fragment key={niche.nicheId}>
                      <span className="hover:text-secondary font-medium">
                        {niche.name}
                      </span>
                      {index < array.length - 1 && <span>|</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

            <hr className="border-gray-100" />

              {/* Networks */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-slate-500">Networks</span>
                <div className="flex flex-wrap justify-end gap-1">
                  {program.networks?.nodes?.slice(0, 2).map((network, index, array) => (
                    <React.Fragment key={network.networkId}>
                      <span className="hover:text-secondary font-medium">
                        {network.name}
                      </span>
                      {index < array.length - 1 && <span>|</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default React.memo(ProgramListing);
