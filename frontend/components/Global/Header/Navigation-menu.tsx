"use client";

import Link from "next/link";

import React from "react";

const Navigation = () => {
  return (
    <nav className="hidden md:block">
      <ul className="flex gap-5 ">
        <li className="px-2 hover:text-secondary "><Link href={"/"}>Home</Link></li>
        <li className="px-2 hover:text-secondary " ><Link href="https://affiliatesworks.com/blog">Blog</Link></li>
        <li className="px-2 hover:text-secondary " ><Link href="https://affiliatesworks.com/about">About</Link></li>
        <li className="px-2 hover:text-secondary " ><Link href="https://affiliatesworks.com/contact">Contact</Link></li>
        {/* <li className="px-2 hover:text-primary "><Link href={"/advertise"}>Advertise</Link></li> */}
      </ul>
      
    </nav>
  );
};

export default Navigation;
