import NetworkSinglePage from "@/components/Pages/Taxonomy/Network/NetworkSinglePage";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import { GetNetworkData } from "./networkprogram";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { Metadata } from "next";
import SharePopup from "@/components/Global/Others/sharepopup";
import { Button } from "@/components/ui/button";
import Image from "next/image";


type NetworkPageLayoutProps = {
  children: React.ReactNode;
  params: { slug: string }; // Get `slug` from the folder structure
};

export default async function CategoryPageLayout({ children, params }: NetworkPageLayoutProps) {
    const {slug} = params;
    const network = await GetNetworkData(slug);
      // console.log(network);
    
      // const programscount = network.programs.nodes;
      const programscount = network.count;
      const image =
        network.networkfield.logo?.node?.sourceUrl || "/images/Affiliatesworks.svg";
    

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
                    <BreadcrumbLink href="/network">Network</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold text-secondary">
                      {network.name}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="flex justify-between mt-5 flex-wrap">
                <div className="flex flex-row gap-5 w-full items-center justify-between">
                  <div className="w-full sm:w-[70%] md:w-[50%]">
                    <h1 className="text-xl sm:text-3xl font-semibold">
                      {network.name}
                    </h1>
                    <p className="text-[16px] font-light mt-1">
                      Discover the best affiliate programs for {network.name} at
                      Affiliatesworks. Explore top programs, earn commissions, and
                      grow your online business.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 mt-3">
                      <SharePopup title={network.name} />
                      <Button variant="outline">{network.count} Programs</Button>
                    </div>
                  </div>
                  <div className="rounded-md border-2 border-primary-foreground">
                    <Image
                      src={image}
                      width={100}
                      height={100}
                      alt={network.name}
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
                <span className="text-lg font-semibold"> {programscount} results found</span>
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
                    {/* <NetworkSinglePage slug={slug}}/> */}{children}
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      );
}




interface NetworkPageProps {
  params: { slug: string };
}

export async function generateMetadata({
    params: { slug },
  }: NetworkPageProps): Promise<Metadata> {
    const network = await GetNetworkData(slug);
    // console.log(network)
  
    const canonicalurl = `https://program.affiliatesworks.com/network/${slug}`;
    const title = `${network.seo.title}  Affiliate Network | Affiliatesworks`;
     const url = "https://program.affiliatesworks.com"
    const description = `${network.seo.description}`;
    return {
      title: network.seo.title,
      description: description,
      keywords: network.seo.focusKeywords,
      alternates: {
        canonical: canonicalurl,
      },
      openGraph: {
        title: network.seo.title,
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
        title: network.seo.title,
        description: description,
        images: ["https://program.affiliatesworks.com/opengraph-image.png"],
      },
    };
  }

  

  
  export async function generateStaticParams() {
    const GET_ALL_NETWORKS_QUERY = gql`
      query niches {
        networks(first: 1000) {
          nodes {
            slug
          }
        }
      }
    `;
  
    const { data } = await getClient().query({
      query: GET_ALL_NETWORKS_QUERY,
      context: {
        headers: {
          Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
        },
      },
    });
  
    return data.networks.nodes.map((network: { slug: string }) => ({
      params: { slug: network.slug },
    }));
  }