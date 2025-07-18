"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaShareAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { MdReport } from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";
import { FaPinterest } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { submitReport } from "./submit-report";
import { FormError, FormSuccess } from "./success-error";

interface ActionButtonsProps {
  title: string;
}

const ActionButtons = ({ title }: ActionButtonsProps) => {
  const router = useRouter();
  const [currentPageUrl, setCurrentPageUrl] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const url = `${window.location.protocol}://${window.location.host}${window.location.pathname}`;
    setCurrentPageUrl(url);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // console.log("form submitted");
    try {
      const formDataWithUrl = {
        formData: {
          ...formData,
          url: currentPageUrl,
        },
      };

      const result = await submitReport({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        message: formData.message,
        title: title,
        currentPageUrl: currentPageUrl,
      });

      if (result.success) {
        // toast.success("Report submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
        setSuccess(result.successMessage);
      } else {
        // 
        setError(result.errorMessage || "Submission failed");
      }
    } catch (error) {
      // console.error("Form submission error:", error);
      // toast.error("Failed to submit report. Please try again.");
      setError("Failed to submit report. Please try again.");
    }
    setIsSubmitting(false);
  };

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentPageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (error) {
      // console.error("Could not copy text: ", error);
    }
  };

  return (
    <div className="flex gap-1">
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="py-5">
              <FaShareAlt />
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
              <div className="flex flex-wrap justify-between">
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${currentPageUrl}`}
                  target={"_blank"}
                >
                  <FaFacebook size={35} className="text-blue-700" />
                </Link>
                <Link
                  href={`https://twitter.com/intent/tweet?url=YOUR_POST_URL&text=${currentPageUrl}&text=${title}`}
                  className="border border-black p-2 rounded-full"
                  target={"_blank"}
                >
                  <FaXTwitter size={20} className="text-black" />
                </Link>
                <Link
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentPageUrl}`}
                  target={"_blank"}
                >
                  <FaLinkedin size={35} className="text-blue-600" />
                </Link>

                <Link
                  href={`https://api.whatsapp.com/send?text${title}%20${currentPageUrl}`}
                  target={"_blank"}
                >
                  <RiWhatsappFill size={35} className="text-emerald-500" />
                </Link>
                {/* <Link
                  href={`https://pinterest.com/pin/create/button/?url${currentPageUrl}&description${title}`}
                  target={"_blank"}
                >
                  <FaPinterest size={35} className="text-red-500" />
                </Link> */}
                <Link
                  href={`mailto:?subject=Check%20this%20out&body=${title}%20${currentPageUrl}`}
                  target={"_blank"}
                >
                  <IoMail size={35} className="text-black" />
                </Link>
              </div>
              <div className="mt-5">
                <div className=" flex items-center gap-2">
                  <input
                    type="text"
                    defaultValue={currentPageUrl}
                    className=" border w-full py-2 rounded-md px-2"
                    disabled
                  />
                  <Button onClick={handleCopy} className="text-white">
                    Copy
                  </Button>
                </div>
                {copied && (
                  <p className="text-sm pl-2 text-blue-500 font-medium">
                    Link copied to clipboard!
                  </p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="py-5 hover:bg-white hover:text-secondary hover:border-secondary"
            >
              <MdReport />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Report Issue</DialogTitle>
              <DialogDescription>
                Please provide details about the issue you'd like to report.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Hidden inputs for title and URL */}
              <Input type="hidden" id="title" name="title" value={title} />
              <Input type="hidden" id="url" name="url" value={currentPageUrl} />

              <div className="space-y-2">
                <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="min-h-[100px]"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
              <FormError message={error} />
              <FormSuccess message={success} />
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ActionButtons;
