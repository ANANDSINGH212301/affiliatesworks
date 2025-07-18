"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PiShareFatLight } from "react-icons/pi";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { RiWhatsappFill } from "react-icons/ri";

interface SharePopupProps {
  title: string;
}

const SharePopup = ({ title }: SharePopupProps) => {
  const [currentPageUrl, setCurrentPageUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") { // Ensures client-side execution
      const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
      setCurrentPageUrl(url);
    }
  }, []);

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentPageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (error) {
      console.error("Could not copy text: ", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <span className="mr-2 mt-1">
            <PiShareFatLight size={18} />
          </span>
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>
            Share this post with your friends and followers on social media!
          </DialogDescription>
        </DialogHeader>

        <div>
          <div className="flex justify-evenly">
            <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentPageUrl)}`} target="_blank">
              <FaFacebook size={35} className="text-blue-700" />
            </Link>
            <Link href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentPageUrl)}&text=${encodeURIComponent(title)}`} target="_blank">
              <FaXTwitter  size={35} className="text-black" />
            </Link>
            <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentPageUrl)}`} target="_blank">
              <FaLinkedin size={35} className="text-blue-600" />
            </Link>
            <Link href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(currentPageUrl)}`} target="_blank">
              <RiWhatsappFill size={35} className="text-emerald-500" />
            </Link>
            <Link href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentPageUrl)}&description=${encodeURIComponent(title)}`} target="_blank">
              <FaPinterest size={35} className="text-red-500" />
            </Link>
            <Link href={`mailto:?subject=${encodeURIComponent("Check this out")}&body=${encodeURIComponent(title)}%20${encodeURIComponent(currentPageUrl)}`} target="_blank">
              <IoMail size={35} className="text-black" />
            </Link>
          </div>

          <div className="mt-5">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={currentPageUrl}
                className="border w-full py-2 rounded-md px-2"
                disabled
              />
              <Button onClick={handleCopy} className="text-white">
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            {copied && <p className="text-sm pl-2 text-blue-500 font-medium">Link copied to clipboard!</p>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SharePopup;
