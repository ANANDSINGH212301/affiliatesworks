import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBarsStaggered } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MobileNavigation = () => {
  return (
    <div className="block lg:hidden">
      <Sheet key="left">
        <SheetTrigger asChild>
          <FaBarsStaggered size={"22"} />
        </SheetTrigger>
        <SheetContent className="min-w-[320px] sm:max-w-[400px]">
          <SheetHeader>
            <div>
              <div>
                <Image
                  src="/images/Affiliatesworks-full-black.svg"
                  alt="Affiliatesworks Logo"
                  width={250}
                  height={60}
                />
              </div>
              <div className="w-full py-3">
                <nav>
                  <ul className="text-start space-y-1">
                    <li className=" hover:text-secondary py-2 rounded-sm hover:bg-secondary-foreground px-3">
                      <Link href={"/"} className="font-medium text-lg">Home</Link>
                    </li>
                    <li className="hover:text-secondary py-2 rounded-sm hover:bg-secondary-foreground px-3">
                      <Link href="https://affiliatesworks.com/blog" className="font-medium text-lg">Blog</Link>
                    </li>
                    <li className="hover:text-secondary py-2 rounded-sm hover:bg-secondary-foreground px-3">
                      <Link href="https://affiliatesworks.com/about" className="font-medium text-lg">
                        About
                      </Link>
                    </li>
                    <li className="hover:text-secondary py-2 rounded-sm hover:bg-secondary-foreground px-3">
                      <Link href="https://affiliatesworks.com/contact" className="font-medium text-lg">
                        Contact
                      </Link>
                    </li>
                    {/* <li className="hover:text-primary py-2 rounded-sm hover:bg-slate-100 px-3">
                      <Link href={"/advertise"} className="font-medium text-lg">Advertise</Link>
                    </li> */}
                  </ul>
                </nav>
              </div>
              <div>
                {/* <Link href={"/submit-program"}>
                  <Button className="text-white w-full font-normal opacity-90 hover:bg-primary">
                    Submit Your Program
                  </Button>
                </Link> */}
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
