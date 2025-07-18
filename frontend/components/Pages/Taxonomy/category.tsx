"use client";

import CategoryListing from "@/components/Global/Listing/Category/CategoryListing";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState, useMemo } from "react";

type Category = {
  name: string;
  count: number;
  slug: string;
  categoryId: number; // Fixed typo
  nichefield: { image?: { node?: { sourceUrl: string } } };
};

type AllCategoriesPageProps = {
  categories: Category[];
};

const AllcategoriesPage: React.FC<AllCategoriesPageProps> = ({ categories }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Memoize filtered niches to avoid recalculating on every render
  const filteredNiches = useMemo(() => {
    if (!Array.isArray(categories)) return [];
    const searchQueryLower = searchQuery.toLowerCase();
    return categories.filter((niche: Category) =>
      niche.name.toLowerCase().includes(searchQueryLower)
    );
  }, [searchQuery, categories]);

  return (
    <>
      <section className="bg-blue-50 m-2 sm:m-5 rounded-lg py-12">
        <div className="space-y-6 px-4 sm:px-0">
          <h1 className="text-3xl font-bold text-center">
            What are you looking for?
          </h1>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories"
            className="bg-white active:border-2 max-w-md mx-auto py-5 text-base"
            aria-label="Search categories"
          />
        </div>
      </section>
      <section className="bg-slate-100 py-8">
        <div className="container">
          <h2 className="text-2xl font-bold mb-5">
            Explore program by Category
          </h2>
          <div className="grid grid-cols-6 gap-4 pt-4">
            {filteredNiches.map((category: Category) => (
              <CategoryListing
                key={category.categoryId}
                title={category.name}
                number={category.count}
                href={category.slug}
                image={category.nichefield.image?.node?.sourceUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllcategoriesPage;
