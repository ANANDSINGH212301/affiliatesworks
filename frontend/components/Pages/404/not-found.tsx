import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const NotFound = () => {
  return (
    <section>
      <div className="px-5   sm:container  flex  flex-col sm:flex-row min-h-screen py-10 gap-4">
        <div className=" w-full my-auto sm: min-w-[60%] md:min-w-[50%]">
          <div className="">
            <h1 className="text-2xl  text-center sm:text-start md:text-3xl font-semibold py-3 text-primary"> 404 - Not Found</h1>
            <p className="text-[16px] text-center sm:text-start  font-light sm:font-normal sm:max-w-[500px]">
              sorry, the page you are looking for doesn&apos;t exist or has been
              moved. Here are some helpful links:
            </p>
          </div>
          <div className="mt-5">
            <div className=" p-2  rounded-lg">
              <Link href={"https://affiliatesworks.com/blog"}>
              
              <h2 className="text-secondary flex items-center gap-3"><span className="font-medium text-lg">Our Blog</span> <span><FaLongArrowAltRight /></span> </h2>
              <p className="text-sm">Read the latest post on our blog.</p>
              </Link>
            </div>
            <div className=" p-2  rounded-lg">
              <Link href={"https://affiliatesworks.com/glossary"}>
              
              <h2 className="text-secondary flex items-center gap-3"><span className="font-medium text-lg">Affiliate Glossary</span> <span><FaLongArrowAltRight /></span> </h2>
              <p className="text-sm">Read the latest post on our blog.</p>
              </Link>
            </div>

          </div>
        </div>
        <div className=" w-full flex items-center justify-center ">
          <Image
            src="/images/Not-found.webp"
            alt="404 Not Found"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}
export default NotFound
