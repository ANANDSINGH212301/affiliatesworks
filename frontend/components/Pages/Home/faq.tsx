import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <>
      <section className="bg-slate-50 py-5 " >
        <div className="sm:container max-w-[1280px] mx-auto px-3 md:py-2 lg:px-20 lg:py-4 xl:py-12 my-2 sm:my-4 md:my-6 lg:my-12">
          <div className="flex  flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col md:w-[30%] w-full items-center space-y-3 md:space-y-0">
              <h2 className="font-semibold text-4xl  text-center sm:text-start md:text-3xl lg:text-4xl leading-9">
                Any questions? Check out the FAQ
              </h2>
              <p className="pb-3 pt-2 sm:pb-4 sm:pt-3 text-center sm:text-start">
                No need to wait the chat response, get general query answers
                from these FAQ&apos;s
              </p>
              <div className="hidden md:block justify-items-center ">
                <svg
                  className="text-warning ms-n4 w-32 h-32  lg:w-52 lg:h-52"
                  width="200"
                  height="211"
                  viewBox="0 0 200 211"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M198.804 194.488C189.279 189.596 179.529 185.52 169.407 182.07L169.384 182.049C169.227 181.994 169.07 181.939 168.912 181.884C166.669 181.139 165.906 184.546 167.669 185.615C174.053 189.473 182.761 191.837 189.146 195.695C156.603 195.912 119.781 196.591 91.266 179.049C62.5221 161.368 48.1094 130.695 56.934 98.891C84.5539 98.7247 112.556 84.0176 129.508 62.667C136.396 53.9724 146.193 35.1448 129.773 30.2717C114.292 25.6624 93.7109 41.8875 83.1971 51.3147C70.1109 63.039 59.63 78.433 54.2039 95.0087C52.1221 94.9842 50.0776 94.8683 48.0703 94.6608C30.1803 92.8027 11.2197 83.6338 5.44902 65.1074C-1.88449 41.5699 14.4994 19.0183 27.9202 1.56641C28.6411 0.625793 27.2862 -0.561638 26.5419 0.358501C13.4588 16.4098 -0.221091 34.5242 0.896608 56.5659C1.8218 74.6941 14.221 87.9401 30.4121 94.2058C37.7076 97.0203 45.3454 98.5003 53.0334 98.8449C47.8679 117.532 49.2961 137.487 60.7729 155.283C87.7615 197.081 139.616 201.147 184.786 201.155L174.332 206.827C172.119 208.033 174.345 211.287 176.537 210.105C182.06 207.125 187.582 204.122 193.084 201.144C193.346 201.147 195.161 199.887 195.423 199.868C197.08 198.548 193.084 201.144 195.528 199.81C196.688 199.192 197.846 198.552 199.006 197.935C200.397 197.167 200.007 195.087 198.804 194.488ZM60.8213 88.0427C67.6894 72.648 78.8538 59.1566 92.1207 49.0388C98.8475 43.9065 106.334 39.2953 114.188 36.1439C117.295 34.8947 120.798 33.6609 124.168 33.635C134.365 33.5511 136.354 42.9911 132.638 51.031C120.47 77.4222 86.8639 93.9837 58.0983 94.9666C58.8971 92.6666 59.783 90.3603 60.8213 88.0427Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="w-full md:w-[60%] ">
            <Accordion type="single" collapsible  className="w-full space-y-3">
          <AccordionItem value="item-1" className="px-5 py-2  rounded-xl bg-white  " >
            <AccordionTrigger className="data-[state=open]:text-secondary text-left font-semibold lg:text-lg hover:no-underline hover:text-secondary">
              How do I use Affiliatesworks directory?
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              Simply search for programs by keyword, category, or network, and
              filter results based on your preferences. Click on a program to
              view details, and join the Affiliate Program by clicking Apply
              Now.
            </AccordionContent>
          </AccordionItem>
           <AccordionItem value="item-2" className="px-5 py-2  rounded-xl bg-white  ">
          <AccordionTrigger className="data-[state=open]:text-secondary text-left font-semibold lg:text-lg hover:no-underline hover:text-secondary">
              Is Affilaitesworks Directory free to use?
            </AccordionTrigger>
            <AccordionContent>
              Yes, our directory is completely free to use. We do not charge any
              fees for access or membership.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="px-5 py-2  rounded-xl bg-white ">
          <AccordionTrigger  className="data-[state=open]:text-secondary text-left font-semibold lg:text-lg hover:no-underline hover:text-secondary">
              How do you ensure program accuracy and updates?
            </AccordionTrigger>
            <AccordionContent>
              We regularly update our directory with new programs and remove
              inactive ones. We also rely on user feedback to ensure program
              details are accurate.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="px-5 py-2  rounded-xl bg-white  ">
          <AccordionTrigger  className="data-[state=open]:text-secondary text-left font-semibold lg:text-lg hover:no-underline hover:text-secondary">
              Can I submit my own affiliate program to the directory?
            </AccordionTrigger>
            <AccordionContent>
              Yes, please contact us with your program details, and we will review
              and add it to our directory if it meets our guidelines.
            </AccordionContent>
          </AccordionItem>
          
        </Accordion>


            </div>
          </div>
        </div>
        
      </section>
      
    </>
  );
};

export default FAQ;
