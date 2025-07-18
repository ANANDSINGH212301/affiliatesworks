"use client"
import React, { useEffect, useState } from "react";

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
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import getCategories from "@/Data/constant/category";


interface Category {
  slug: string;
  count: number | null;
  NicheId: number;
  name: string;
}

const CategoryInput = () => {
  const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const category = await getCategories();
      setCategories(category);
      // console.log(category);
      localStorage.setItem("categoires-menu", JSON.stringify(category));
    };
    fetchCategories();
  }, []);
  // console.log("client", categories);



  useEffect (()=>{
    const params = new URLSearchParams(searchParams);
    if(value){
        params.set('category', value);
    } else {
        params.delete('category');
    }
    replace(`${pathname}?${params.toString()}`);


  },[value, pathname, replace, searchParams])

  

  return (
    <div className="my-4 space-y-2 ">
      <label htmlFor="Category">Category</label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            role={"combobox"}
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? categories.find((category) => category.slug === value)?.name
              : "All Category"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[270px] p-2">
          <Command>
            <CommandInput placeholder="Search Cateogry..." className="h-9" />
            <CommandEmpty>No Category found.</CommandEmpty>
            <CommandList >
              <CommandGroup>
                {Array.isArray(categories) && categories.map((category: Category) => (
                  <CommandItem
                    key={category.NicheId}
                    value={category.slug}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                    className="pointer hover:bg-slate-600"
                  >

                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === category.slug ? "opacity-100" : "opacity-0"
                      )}
                    />
                    
                    <span>{category.name}</span>
                    {/* <span className="text-white text-xs bg-slate-500 p-0.5 rounded-full">{category.count || 0}</span> */}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
   
  );
};

export default CategoryInput;


