"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa6";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { FormError } from "../../Form/form-error";
import { FormSuccess } from "../../Form/form-success";
import { SubmitReview } from "./submitreview";

const ReviewSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  email: z.string().email("Invalid email address"),
  rating: z
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating must be between 1 and 5"),
  reviewText: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review is too long"),
});

type ReviewFormProps = {
  title: string;
  id: number;
};

export default function ReviewForm({ title, id }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const maxChars = 1000;

  const form = useForm<z.infer<typeof ReviewSchema>>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: rating || 1,
      reviewText: reviewText || "",
    },
  });

  const handleReviewTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputText = e.target.value;
    setReviewText(inputText.slice(0, maxChars));
  };
  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
    form.setValue("rating", newRating); // Update form rating directly
  };
  const handleRatingHover = (hoverRating: number) =>
    setHoveredRating(hoverRating);
  const handleRatingLeave = () => setHoveredRating(null);

  const onSubmit = (values: z.infer<typeof ReviewSchema>) => {
    
    setError("");
    setSuccess("");

    startTransition(() => {
      SubmitReview(id, values)
        .then((data) => {
            // console.log(data);
          if (data?.error) {
            // form.reset();
            setError(data.error);
          } else if (data?.success) {
            form.reset();
            setSuccess("Review submitted successfully!");
          }
        })
        .catch(() => setError("Something went wrong! Please try again."));
    });
  };

  return (
    <div className="flex justify-end w-full h-full items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-emerald-500 py-5 px-7 text-emerald-800 hover:text-emerald-800 hover:bg-white border-2 rounded-md w-full md:w-auto"
          >
            <FaStar className="text-emerald-500" />
            Write a review
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[425px] md:max-w-[567px]">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold">
              Review {title}
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm">
              Please share your honest review. Your feedback will help us
              improve.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            //   disabled={isPending}
                            placeholder="Jhon Doe"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // disabled={isPending}
                            placeholder="Jhon.doe@example.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <div className="flex items-center mb-4">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <FaStar
                                key={num}
                                onClick={() => handleRatingClick(num)}
                                onMouseEnter={() => handleRatingHover(num)}
                                onMouseLeave={handleRatingLeave}
                                className={`cursor-pointer pr-1 ${
                                  num <= (hoveredRating ?? rating)
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }`}
                                size={30}
                              />
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reviewText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Review</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            id="review"
                            name="review"
                            value={field.value} // Ensure this is linked to the form field
                            onChange={(e) => {
                              field.onChange(e); // Update form state
                              handleReviewTextChange(e); // Update local state
                            }}
                            required
                            className="mb-1 w-full h-16"
                            placeholder="Write your review here..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                  // disabled={isPending}
                  type="submit"
                  className="w-full text-white"
                >
                  Submit Review
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
