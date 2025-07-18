import React from "react";
  
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function NetworkScroll() {
  return (
    <section className=" py-6 bg-slate-300">
      <Carousel className=" container w-full" opts={{ align:"start", loop:true}}>
        <CarouselContent className="flex items-center">
          <CarouselItem className="basis-1/2 sm:basis-1/3 lg:basis-1/5  w-full pl-4">
          <div className="sm:w-40 w-24">

          <Image src={"/images/home/scroll/logoipsum-259.svg"} alt="logo" width={135} height={40}/> 
          </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2 sm:basis-1/3 lg:basis-1/5  w-full pl-4">
          <div className="sm:w-40 w-24">

          <Image src={"/images/home/scroll/logoipsum-260.svg"} alt="logo" width={135} height={40}/> 
          </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2 sm:basis-1/3 lg:basis-1/5  w-full pl-4">
          <div className="sm:w-40 w-24">

          <Image src={"/images/home/scroll/logoipsum-261.svg"} alt="logo" width={135} height={40}/> 
          </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2 sm:basis-1/3 lg:basis-1/5  w-full pl-4">
          <div className="sm:w-40 w-24">

          <Image src={"/images/home/scroll/logoipsum-262.svg"} alt="logo" width={135} height={40}/> 
          </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2 sm:basis-1/3 lg:basis-1/5  w-full pl-4">
          <div className="sm:w-40 w-24 h-auto">

          <Image src={"/images/home/scroll/logoipsum-263.svg"} alt="logo" width={135} height={50}/> 
          </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2 sm:basis-1/3 lg:basis-1/5  w-full pl-4">
          <div className="sm:w-40 w-24">

          <Image src={"/images/home/scroll/logoipsum-264.svg"} alt="logo" width={135} height={40}/> 
          </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2 sm:basis-1/3 lg:basis-1/5  w-full pl-4">
          <div className="sm:w-40 w-24">

          <Image src={"/images/home/scroll/logoipsum-265.svg"} alt="logo" width={135} height={40}/> 
          </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2 sm:basis-1/3 lg:basis-1/5  w-full pl-4">
          <div className="sm:w-40 w-24">

          <Image src={"/images/home/scroll/logoipsum-285.svg"} alt="logo" width={135} height={40}/> 
          </div>
          </CarouselItem>
          <CarouselItem className="basis-1/2 sm:basis-1/3 lg:basis-1/5  w-full pl-4">
          <div className="sm:w-40 w-24">

          <Image src={"/images/home/scroll/logoipsum-286.svg"} alt="logo" width={135} height={40}/> 
          </div>
          </CarouselItem>
          
          
          
          
          
        </CarouselContent>
      
      </Carousel>
    </section>
  );
}

export default NetworkScroll;
