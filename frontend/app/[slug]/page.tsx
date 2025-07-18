import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { unstable_cache } from "next/cache";
import React, { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Programviewcount from "@/components/Global/singlepage/count";
import { CiCalendarDate } from "react-icons/ci";
import { MdVerified } from "react-icons/md";
import { LuExternalLink } from "react-icons/lu";
import ProgramStatus from "@/components/Global/singlepage/programstatus";
import Calculator from "@/components/Global/singlepage/sidebar/calculator";
import { ProgramListingType } from "@/Data/types/program";
import Siderbarcategory from "@/components/Global/singlepage/sidebar/pop-category";
import ReviewSection from "@/components/Global/singlepage/review/reviewsection";
import { Metadata } from "next";
import AvgReview from "@/components/Global/singlepage/avgreview";
import { notFound } from "next/navigation";
import StarsRating from "@/components/Global/singlepage/review/star";
import Stars from "@/components/Global/singlepage/review/star";
import { generateSchema, GetProgram, GetRelatedProgram } from "./program";
import ActionButtons from "@/components/Global/singlepage/actionbutton/actionbutton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Head from "next/head";
import ProgramListing from "@/components/Global/Listing/Program/Program-Listing";

interface ProgramPageProps {
  params: { slug: string };
}

const page = async ({ params: { slug } }: ProgramPageProps) => {
  const program = await GetProgram(slug);
  
 
  
  // console.log(program);
  if (!program) {
    notFound();
  }

  const categorySlugs =
    program.niches.nodes?.map(
      (niche: { name: string; slug: string; nicheId: number }) => niche.slug
    ) || [];

  const relatedPrograms = await GetRelatedProgram(slug, categorySlugs);


  const schema = generateSchema(program , relatedPrograms);
  // console.log(schema);

  return (
    <>
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}/>

    </Head>
      <main>
        <section className="lg:container mx-auto px-2 my-4">
          <div className="pb-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="font-semibold text-primary">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="font-semibold text-primary">
                  <BreadcrumbLink href="/search">Program</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="font-semibold text-secondary">
                  <BreadcrumbPage className="font-semibold text-secondary">
                    {program.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex justify-between mt-5 flex-col gap-4 md:flex-row flex-wrap">
            <div className="flex gap-4">
              <div className="flex items-center h-20 w-20 sm:h-24 sm:w-24 rounded-lg border-primary-foreground border p-1">
                <Image
                  src={program.featuredImage.node.sourceUrl}
                  alt={`${program.title} logo`}
                  width={100}
                  height={100}
                  className="m-auto"
                />
              </div>
              <div className="h-full flex items-center">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <h1 className="text-xl sm:text-2xl font-bold">
                      {program.title}
                    </h1>
                    <span className="text-[#2875fa] ml-2 mt-1">
                      <MdVerified size={"20px"} />
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      {/* {program.description} */}
                    </p>
                  </div>
                  <div className="mt-2 flex  md:flex-row flex-wrap space-y-1.5 sm:space-y-0 space-x-0 sm:space-x-4 items-end gap-2 ">
                    {/* <div className="text-sm flex  gap-2 justify-center">
                      <span>
                        <CiCalendarDate size={18} className="mt-0.5" />
                      </span>
                      <span className="font-semibold">
                        {new Date(program.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div> */}

                    <Stars stars={program.programfield.avgreview || 0} />
                    <Programviewcount
                      id={program.programId}
                      count={program.programfield.postcount}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex items-center ">
              {/* <div className="font-bold text-2xl text-center flex-grow ">
                {program.programfield.commissiontext}
              </div> */}

              <div className="w-full">
                <Link href={program.programfield.applyurl} className="w-full" target={"_blank"}>
                  <Button
                    className="text-white w-full"
                    variant={"default"}
                    size={"lg"}
                  >
                    Apply Now
                  </Button>
                </Link>
              </div>
              <div className="ml-2">
                <ActionButtons title={program.title} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 bg-[#fceaea]">
          <div className="lg:container mx-auto px-2 grid grid-cols-12 gap-5 md:gap-3 lg:gap-6">
            <div className=" col-span-12 md:col-span-8 lg:col-span-9">
              <div className="space-y-5">
                <div className="border-1 rounded-md bg-white w-full p-4">
                  <div>
                    <h2 className="text-2xl font-semibold mb-1">
                      Program Overview
                    </h2>
                    <hr className="w-36 border-b-2 border-primary rounded-lg" />
                  </div>
                  <div className="lg:flex justify-between gap-4 mt-4 space-y-4 md:space-y-0">
                    <div className="lg:w-[40%]">
                      <div className="bg-slate-200 rounded-md p-4 h-full flex justify-center items-center">
                        <Link href={program.programfield.websiteurl}>
                          <Image
                            src={`https://image.thum.io/get/width/800/crop/700/${program.programfield.websiteurl}`}
                            alt={`${program.title} website preview`}
                            width={300}
                            height={300}
                            className="rounded-sm w-full h-full"
                            loading="lazy"
                            priority={false}
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="lg:w-[60%] space-y-5 pt-3 md:pt-6 lg:pt-0">
                      <div className="flex justify-between border-b-2 pb-2 border-slate-100">
                        <p className="text-sm sm:text-base font-semibold">
                          Status
                        </p>
                        <p>
                          <ProgramStatus
                            status={program.programfield.programstatus}
                          />
                        </p>
                      </div>
                      <div className="flex justify-between border-b-2 pb-2 border-slate-100">
                        <p className="text-sm sm:text-base font-semibold">
                          Commission
                        </p>
                        <p>
                          <span className="text-sm sm:text-base px-2 rounded-full text-primary font-medium">
                            {program.programfield.commissiontext}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between border-b-2 pb-2 border-slate-100">
                        <p className="text-sm sm:text-base font-semibold">
                          Commission Type
                        </p>
                        <p>
                          <span className="px-2 rounded-full leading-4">
                            {program.programfield.commissiontype.map(
                              (
                                type: "CPS" | "CPA" | "COD" | "PPI",
                                index: number
                              ) => (
                                <span
                                  key={index}
                                  className="text-primary font-medium"
                                >
                                  {type}
                                </span>
                              )
                            )}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between flex-wrap border-b-2 pb-2 border-slate-100">
                        <p className="text-sm sm:text-base font-semibold">
                          Networks
                        </p>
                        <p>
                          <span className="px-2 rounded-full text-sm flex flex-wrap leading-4 gap-2 items-end">
                            {program.networks.nodes.map(
                              (
                                network: {
                                  name: string;
                                  slug: string;
                                  networkId: number;
                                  count: number;
                                },
                                index: number
                              ) => (
                                <Link
                                  href={`/network/${network.slug}`}
                                  className="cursor-pointer"
                                  target="_blank"
                                  key={index}
                                >
                                  <span className="font-medium px-2 rounded-sm border-1">
                                    {network.name}
                                  </span>
                                </Link>
                              )
                            )}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between border-b-2 pb-2 border-slate-100">
                        <p className="text-sm sm:text-base font-semibold">
                          Category
                        </p>
                        <p>
                          <span className="px-2 rounded-full text-sm flex flex-wrap leading-4 gap-2 items-end">
                            {program.niches.nodes.map(
                              (
                                niche: {
                                  name: string;
                                  slug: string;
                                  nicheId: number;
                                  count: number;
                                },
                                index: number
                              ) => (
                                <Link
                                  href={`/category/${niche.slug}`}
                                  className="cursor-pointer"
                                  target="_blank"
                                  key={index}
                                >
                                  <span
                                    key={index}
                                    className="font-medium px-2 rounded-sm border-1"
                                  >
                                    {niche.name}
                                  </span>
                                </Link>
                              )
                            )}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between border-b-2 pb-2 border-slate-100">
                        <p className="text-sm mr-3 sm:text-base font-semibold">
                          Country
                        </p>
                        <p>
                          <span className="px-2 rounded-full text-sm flex flex-wrap leading-4 gap-2 items-end">
                            {program.countries.nodes.map(
                              (country: {
                                name: string;
                                countryId: number;
                              }) => (
                                <span
                                  key={country.countryId}
                                  className="font-medium px-1 rounded-sm border-1 cursor-pointer"
                                >
                                  {country.name}
                                </span>
                              )
                            )}
                          </span>
                        </p>
                      </div>
                      <div>
                        <Link
                          href={program.programfield.applyurl}
                          className="cursor-pointer"
                          target={"_blank"}
                        >
                          <Button className="w-full text-white">
                            Join the Offer{" "}
                            <LuExternalLink
                              className="font-bold ml-"
                              size={18}
                            />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-1 rounded-md bg-white w-full p-4">
                  <h2 className="text-2xl font-semibold mb-1">Description</h2>
                  <hr className="w-28 border-b-2 border-primary rounded-lg" />
                  <div className="px-2 sm:px-4 pb-4 mt-4">
                    <div
                      className="program-content-wrapper text-justify"
                      dangerouslySetInnerHTML={{ __html: program.content }}
                    />
                  </div>
                </div>

                {program.programfield.terms && (
                  <div className="border-1 rounded-md bg-white w-full p-4">
                    <h2 className="text-2xl font-semibold mb-1">
                      Terms & Conditions
                    </h2>
                    <hr className="w-28 border-b-2 border-primary rounded-lg" />
                    <div className="px-2 sm:px-5 pb-4 mt-4">
                      <div
                        className="program-content-wrapper text-justify"
                        dangerouslySetInnerHTML={{
                          __html: program.programfield.terms,
                        }}
                      />
                    </div>
                  </div>
                )}
                {program.programfield.faq && (
                  <div className="border-1 rounded-md bg-white w-full p-4">
                    <h2 className="text-2xl font-semibold mb-1">
                    Faq's
                    </h2>
                    <hr className="w-28 border-b-2 border-primary rounded-lg" />
                    <div className=" sm:px-5 pb-4 mt-4">
                    {program.programfield.faq.length === 0 ? (
                        <div>No Faq's Found.</div>
                      ) : (
                        <div className="w-full   gap-2">
                          <Accordion type="single" collapsible  className="space-y-2 w-full">

                          {program.programfield.faq.map(
                            (faq: { question: string; answer: string }, index: number) => (
                              <AccordionItem
                                value={`item-${index}`}
                                key={index}   
                                className="px-5 py-0 border  rounded-xl bg-white  "
                              >
                                <AccordionTrigger className="data-[state=open]:text-secondary text-left font-semibold lg:text-lg hover:no-underline hover:text-secondary">
                                  <div
                                    className="program-faq-wrapper text-justify"
                                    dangerouslySetInnerHTML={{
                                      __html: faq.question,
                                    }}
                                  />
                                </AccordionTrigger>
                                <AccordionContent className="pt-2">
                                  <div
                                    className="program-faq-wrapper text-justify"
                                    dangerouslySetInnerHTML={{
                                      __html: faq.answer,
                                    }}
                                  />
                                </AccordionContent>
                              </AccordionItem>
                            )
                          )}
                          </Accordion>
                        </div>
                      )}
                      
                    </div>
                  </div>
                )}
               
              </div>
            </div>
            <div className=" col-span-12  md:col-span-4 lg:col-span-3">
              <div className="space-y-5">
                <Calculator />
                <Siderbarcategory />
              </div>
            </div>
          </div>
        </section>
        <section className="py-1 bg-[#fceaea] -mt-6">
          <div className="lg:container mx-auto px-2 my-5">
            <div className="bg-white px-4 rounded-md p-5 md:px-7 md:p-">
              <div>
                <h2 className="text-2xl font-semibold mb-1 w-full">
                  Related Program
                </h2>
                <hr className="w-36 border-b-2 border-primary rounded-lg" />
              </div>

              <div className="flex flex-wrap justify-between gap-4 mt-3">
                {relatedPrograms.length === 0 ? (
                  <div>No programs found.</div>
                ) : (
                  <div className="w-full grid-cols-12 grid gap-2">
                    {relatedPrograms.map((program: ProgramListingType) => (
                      <ProgramListing
                        key={program.programId}
                        program={program}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <Suspense fallback={<div>Loading reviews...</div>}>
          <ReviewSection slug={slug} />
        </Suspense>
      </main>
    </>
  );
};

export default page;

interface ProgramPathProps {
  slug: string;
}

export async function generateStaticParams() {
  const GET_ALL_PROGRAMS_SLUGS = gql`
    query programs {
      programs(first: 100000) {
        nodes {
          slug
        }
      }
    }
  `;

  const { data } = await getClient().query({
    query: GET_ALL_PROGRAMS_SLUGS,
    context: {
      headers: {
        Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
      },
    },
  });

  return data.programs.nodes.map((program: ProgramPathProps) => ({
    slug: program.slug,
  }));
}

export const revalidate = 60;
export const dynamicParams = true;

export const runtime = "edge";
export const preferredRegion = "auto";

export async function generateMetadata({
  params: { slug },
}: ProgramPageProps): Promise<Metadata> {
  const program = await GetProgram(slug);
  const categorySlugs =
    program.niches.nodes?.map(
      (niche: { name: string; slug: string; nicheId: number }) => niche.slug
    ) || [];

  const relatedPrograms = await GetRelatedProgram(slug, categorySlugs);
  const schema = generateSchema(program , relatedPrograms);

  
  if (!program) {
    // console.warn(`Program not found for slug: ${slug}`);
    return {
      title: "Program Not Found | Affiliatesworks",
      description: "The requested program could not be found.",
      robots: {
        index: false,
      },
      other:{
        'application/ld+json' : JSON.stringify(schema)
      }
    };
  }

  const canonicalUrl = `https://program.affiliatesworks.com/${slug}`; // Fixed string interpolation syntax

  return {
    title: `${program.title} Affiliate Program | Affiliatesworks`, // Fixed string interpolation syntax
    description: program.seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph:{
      title:`${program.title} Affiliate Program | Affiliatesworks`,
      description: program.seo.description,
      url: canonicalUrl,
      images: ["https://program.affiliatesworks.com/opengraph-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
    twitter: {
      card: "summary_large_image",
      title:`${program.title} Affiliate Program | Affiliatesworks`,
      description: program.seo.description,
      images: ['https://program.affiliatesworks.com/opengraph-image.png'],
    },
    other:{
      'application/ld+json' : JSON.stringify(schema)
    }
  };
}
