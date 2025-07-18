
import ProgramListing from "@/components/Global/Listing/Program/Program-Listing";
import SharePopup from "@/components/Global/Others/sharepopup";
import SearchProgramComponent from "@/components/Search2/searchprogramcomponent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgramListingType } from "@/Data/types/program";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import CategorySinglePage from "@/components/Pages/Taxonomy/category/CategorySinglePage";
import { GetCategoryData, GetCategoryPrograms } from "./programs";



type CategoryPageLayoutProps = {
  children: React.ReactNode;
  params: { slug: string }; // Get `slug` from the folder structure
};

export default async function CategoryPageLayout({ children, params }: CategoryPageLayoutProps) {
   const {slug} = params;
   const category = await GetCategoryData(slug);
   
    const programscount = category.count;
    const image = category.nichefield.image?.node?.sourceUrl || "/images/Affiliatesworks.svg";
  return (
    <>
      <section className="container mx-auto px-2">
        <div className="container px-5 py-4 w-full justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="font-semibold text-primary">
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="font-semibold text-primary">
                <BreadcrumbLink href="/category">Category</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-secondary">
                  {category.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex justify-between mt-5 flex-wrap">
            <div className="flex flex-row gap-5 w-full items-center justify-between">
              <div className="w-full sm:w-[70%] md:w-[50%]">
                <h1 className="text-xl sm:text-3xl font-semibold">
                  {category.name}
                </h1>
                <p className="text-[16px] font-light mt-1">
                  Discover the best affiliate programs for {category.name} at
                  Affiliatesworks. Explore top programs, earn commissions, and
                  grow your online business.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  <SharePopup title={category.name} />
                  <Button variant="outline">{category.count} Programs</Button>
                </div>
              </div>
              <div className="rounded-md border-2 border-primary-foreground">
                <Image
                  src={image}
                  width={100}
                  height={100}
                  alt={category.name}
                  className="border-1 border-slate-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f7f7f7] py-6 ">
        <div className=" bg-white  container mx-auto px-8 py-8 rounded-3xl">
          <div className="flex justify-between flex-wrap">
            <span> {programscount} results found</span>
          </div>
          <div className="space-y-4 mt-2">
            {programscount === 0 ? (
              <div>No programs found.</div>
            ) : (
              // <div className="grid grid-cols-12 gap-4">
              //   {/* {programs.map((program: ProgramListingType) => (
              //     <ProgramListing key={program.programId} program={program} />
              //   ))} */}

              // </div>
              <div>
                {children}
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  )
}

export async function generateStaticParams() {
  const GET_ALL_CATEGORY_QUERY = gql`
    query niches {
      niches(first: 1000) {
        nodes {
          slug
        }
      }
    }
  `;

  const { data } = await getClient().query({
    query: GET_ALL_CATEGORY_QUERY,
    context: {
      headers: {
        Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
      },
    },
  });

  return data.niches.nodes.map((niche: { slug: string }) => ({
    params: { slug: niche.slug },
  }));
}


interface NichePageProps {
  params: { slug: string };
}

export async function generateMetadata({
    params: { slug },
  }: NichePageProps): Promise<Metadata> {
    const niche = await GetCategoryData(slug);
    // console.log(niche)
  
    const canonicalurl = `https://program.affiliatesworks.com/category/${slug}`;
    const url = "https://program.affiliatesworks.com"
    const title = `${niche.seo.title}  Affiliate niche | Affiliatesworks`;
    const description = `${niche.seo.description}`;
    return {
      title: niche.seo.title,
      description: description,
      keywords: niche.seo.focusKeywords,
      alternates: {
        canonical: canonicalurl,
      },
      openGraph: {
        title: niche.seo.title,
        description: description,
        url: url,
        images: [
          {
            url: '/og-image.png',
            width: 1200,
            height: 630,
            alt: 'Open Graph Image',
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: niche.seo.title,
        description: description,
        images: ["https://program.affiliatesworks.com/opengraph-image.png"],
      },
    };
  }
