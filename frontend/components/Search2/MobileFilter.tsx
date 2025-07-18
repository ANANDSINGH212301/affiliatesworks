import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface Niche {
  slug: string;
  count: number;
  NicheId: number;
  name: string;
}
interface Network {
  slug: string;
  count: number;
  NetworkId: number;
  name: string;
}
interface Country {
  slug: string;
  count: number;
  CountryId: number;
  name: string;
}

interface FilterDataType {
  niches: { nodes: Niche[] };
  networks: { nodes: Network[] };
  countries: { nodes: Country[] };
}

interface FilterData {
  Filterdata: FilterDataType;
}

const MobileFilter = ({ Filterdata }: FilterData) => {
  return (
    <>
      <div className="block lg:hidden">
        <Sheet key="left">
          <SheetTrigger asChild>
            <Button variant={"outline"} className="w-full sm:w-[300px]">Filter</Button>
          </SheetTrigger>
          <SheetContent className="min-w-[320px] sm:max-w-[400px]">
            <SheetHeader></SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MobileFilter;
