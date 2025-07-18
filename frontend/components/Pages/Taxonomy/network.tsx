"use client"


import NetworkListing from "@/components/Global/Listing/network/network-listing";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";


type Network = {
    name: string;
    count: number;
    slug: string;
    NetworkId: number;
    networkfield: {
        affiliateurl: string,
        logo: { node: {sourceUrl:string}}
    }
  };

  
type AllCategoriesPageProps = {
    networks: Network[];
  };
const AllnetworksPage: React.FC<AllCategoriesPageProps> = ({
    networks,
  }) => {

    // console.log(networks);
    const [searchQuery, setSearchQuery] = useState("");
  const [filteredNetworks, setFilteredNetworks] = useState<Network[]>([]);

  useEffect(() => {
    if (Array.isArray(networks)) {
      // console.log(networks);
      setFilteredNetworks(
        networks.filter((network: Network) => {
          const networkName = network.name.toLowerCase();
          const searchQueryLower = searchQuery.toLowerCase();
          return networkName.includes(searchQueryLower);
        })
      );
    }
  }, [searchQuery, networks]);
  return (
    <>
      <section className="bg-blue-50 m-2 sm:m-5 rounded-lg py-12">
        <div className="space-y-6 px-4 sm:px-0">
          <h1 className="text-3xl font-bold text-center">
            What are you looking for?
          </h1>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Network"
            className="bg-white active:border-2 max-w-md mx-auto py-5 text-base"
          />
        </div>
      </section>
      <section className="bg-slate-100 py-8">
        <div className="sm:container px-3">
          <h2 className="text-2xl font-bold mb-5">
            Explore program by Networks
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-items-stretch gap-5">
            {Array.isArray(filteredNetworks) &&
              filteredNetworks.map((network: Network) => (
                <NetworkListing
                  key={network.NetworkId}
                  title={network.name}
                  number={network.count}
                  href={network.slug}
                  image={network.networkfield.logo?.node?.sourceUrl || "/images/Affiliatesworks.svg"}
                  affiliateurl = {network.networkfield.affiliateurl}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default AllnetworksPage
