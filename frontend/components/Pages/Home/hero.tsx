import React, { lazy, Suspense } from "react";
import Image from "next/image";

const HomeSearch = lazy(() => import("./homesearch"));

const Hero = () => {
  return (
    <section className="container grid px-2 grid-cols-8 gap-5 lg:min-h-[85vh] pt-4 md:my-16 lg:my-0">
      <div className="md:col-span-5 col-span-8 flex-col items-center md:items-start justify-center flex">
        <span className="bg-primary-foreground max-w-fit p-2.5 px-6 rounded-full mb-2 text-sm">
          Best Affiliate Program Directory
        </span>
        <h1 className="text-4xl leading-[3rem] lg:leading-[4.5rem] lg:text-6xl font-bold text-center md:text-start">
          Join Us & Explore Thousands of <span className="text-secondary">Affiliate Programs</span>
        </h1>
        <p className="text-[12px] md:text-[15px] sm:text-[14px] mt-3 text-gray-3 xl:max-w-[520px] text-center md:text-start">
          Start your affiliate marketing journey today and find the perfect
          programs to match your audience and niche.
        </p>
        <div className="flex flex-wrap sm:flex-nowrap gap-2 mt-3 md:mt-5 w-full xl:max-w-[520px]">
          <Suspense fallback={<></>}>
            <HomeSearch />
          </Suspense>
        </div>
      </div>
      <div className="md:col-span-3 col-span-8 flex items-center">
        <Image
          src="/images/home/hero.jpg"
          alt="Hero image showcasing affiliate programs"
          width={500}
          height={500}
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
