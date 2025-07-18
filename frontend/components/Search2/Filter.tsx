"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const SearchFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handlesearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className=" gap-2 sm:flex items-center sm:w-full md:w-[70%] lg:w-[50%] mx-auto mt-3">
      <Input
        placeholder={"search ..."}
        onChange={(e) => {
          handlesearch(e.target.value);
        }}
        className=" py-6 sm:py-5 text-base"
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Button className="w-full sm:w-40 py-6 sm:py-5 mt-2 sm:mt-0 text-white hover:text-white text-base ">Search</Button>
    </div>
  );
};
