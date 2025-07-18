

import React from "react";
import Navigation from "./Navigation-menu";
import MobileNavigation from "./mobile-navigation";
import SubmitProgramButton from "./submit-program-button";
import Image from "next/image";
import SocialLinks from "./Social-links";

const Header = () => {
  return (

  <header className="  shadow-md bg-white  sticky top-0 z-50 ">
    <div className=" mx-auto max-w-screen-2xl flex items-center justify-between h-[80px] px-4 md:px-8 ">
       {/*logo - start */}
      <a href="/" className="inline-flex items-center " aria-label="logo">
        <Image src="/images/Affiliatesworks-full-black.svg" alt="Affiliatesworks Logo" width={250} height={60}/>
      </a>
       {/*logo - end */}

       {/*nav - start */}     
      <div className="hidden gap-12 lg:flex">
      <Navigation />
      </div>
       {/*nav - end */}

       {/*buttons - start */}
       {/* <SubmitProgramButton /> */}
       <SocialLinks />

      <MobileNavigation />
       {/*buttons - end */}
    </div>
  </header>

  );
};

export default Header;
