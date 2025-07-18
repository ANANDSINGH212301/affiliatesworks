import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("query") || ""
  );

  // Handle input change with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Update the URL when the search value changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      if (searchValue) {
        newSearchParams.set("query", searchValue);
      } else {
        newSearchParams.delete("query");
      }
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    }, 300); // Debounce delay in ms

    return () => clearTimeout(delayDebounce); // Cleanup debounce
  }, [searchValue, pathname, router, searchParams]);

  return (
    <div>
      <input
        type="text"
        className="py-7 mb-3 text-lg flex h-9 w-full rounded-md border border-primary bg-transparent px-3 
      shadow-sm transition-all duration-300 ease-in-out 
      file:border-0 file:bg-transparent file:text-sm file:font-medium 
      file:text-foreground placeholder:text-muted-foreground 
      focus:border-secondary focus-visible:outline-none focus-visible:border
      hover:border-secondary 
      disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Search Programs..."
        value={searchValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchInput;
