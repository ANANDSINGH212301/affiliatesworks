"use client";
import { Input } from "@/components/ui/input";
import React, { FormEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

import { Button } from "@/components/ui/button";


import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";



interface Category {
  slug: string;
  count: number | null;
  categoryId: number;
  name: string;
}

const HomeSearch = () => {
    const [query, setQuery] = useState('');
    const router = useRouter() 


    function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const trimmedQuery = query.trim();
      if (trimmedQuery) {
        router.push(`/search?query=${trimmedQuery}`);
      }
    }
    
    
  return (
    <form id="search-form" className="search-form w-full" onSubmit={handleSubmit}>
      <div className="flex items-center relative  ">
        <IoIosSearch size={19} className="absolute ml-3" />
        <input
          type="text"
          placeholder="Search affiliate programs..."
          className="pl-9 py-3 text-lg placeholder:text-sm w-full rounded-lg border border-black shadow-lg focus:border-primary"
          value={query}
          onChange={(e) => setQuery(e.target.value.trim())}

        />
        {/* <HomeCategory /> */}
      </div>
    </form>
  );
};

export default HomeSearch;
