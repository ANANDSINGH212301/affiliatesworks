import React from "react";
import Link from "next/link";
import FooterSocialLinks from "./Footer-SL";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 ">
      <div className="pt-8 lg:pt-16">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className=" flex  flex-wrap justify-between mb-6">

            <div className="w-full md:w-[40%] flex flex-col items-center md:items-start mb-6">
              {/*  {/* logo - start */}
              <div className="mb-4 lg:-mt-2">
                <a
                  href="/"
                  className="inline-flex items-center "
                  aria-label="logo"
                >
                 <Image src="/images/Affiliatesworks-full-black.svg" alt="Affiliatesworks Logo" width={250} height={60}/>
                </a>
              </div>
              {/* logo - end */}

              <p className="mb-6 text-gray-500 md:pr-8 text-center md:text-left">
              Affiliatesworks: Your affiliate marketing hub. Learn from experts, access exclusive resources, and join our community. Find top programs in our directory and start achieving success today!
              </p>

              {/* social - start */}
              <div className="flex gap-4">
                <FooterSocialLinks />
              </div>
              {/* social - end */}
            </div>

            <div className=" flex justify-around w-full md:w-[40%]">
              <div>
                <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">
                  Discover
                </div>

                <nav className="flex flex-col gap-4">
                  <div>
                    <Link
                      href="https://affiliatesworks.com/about"
                      className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                    >
                      About
                    </Link>
                  </div>

                  <div>
                    <Link
                      href="Https://affiliatesworks.com/blog"
                      className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                    >
                     Blog
                    </Link>
                  </div>

                  <div>
                    <Link
                      href="https://affiliatesworks.com/glossary"
                      className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                    >
                      Glossary
                    </Link>
                  </div>

                  <div>
                    <Link
                      href="https://affiliatesworks.com/resources"
                      className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                    >
                      Resources
                    </Link>
                  </div>

                  
                </nav>
              </div>
              <div>
                <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">
                  Legal
                </div>

                <nav className="flex flex-col gap-4">
                  <div>
                    <Link
                      href="https://affiliatesworks.com/terms-conditions/"
                      className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                    >
                      Terms of Service
                    </Link>
                  </div>

                  <div>
                    <Link
                      href="https://affiliatesworks.com/privacy-policy/"
                      className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                    >
                      Privacy Policy
                    </Link>
                  </div>

                  <div>
                    <Link
                      href="https://affiliatesworks.com/cookie-policy/"
                      className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                    >
                      Cookie settings
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="https://affiliatesworks.com/disclaimer/"
                      className="text-gray-500 transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                    >
                      Disclosure
                    </Link>
                  </div>
                </nav>
              </div>
            </div>

            {/* nav - end */}
          </div>

          <div className="border-t py-7 text-center text-sm text-gray-400">
            © 2021 - Present Affiliatesworks. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
