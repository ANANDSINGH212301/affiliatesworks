import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

interface NetworkPaginationComponentProps {
  totalprograms: number;
}

const NetworkPaginationComponent = ({ totalprograms }: NetworkPaginationComponentProps) => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Calculate total pages
  const totalPages = Math.ceil(totalprograms / itemsPerPage);

  // Update currentPage from search params on initial render
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

  // Calculate the indices of the first and last items on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= Math.min(5, totalPages); i++) pages.push(i);
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
      }
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
        const params = new URLSearchParams(window.location.search);

        if (pageNumber === 1) {
            params.delete("page");
        } else {
            params.set("page", pageNumber.toString());
        }

        window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
    }
};


  return (
    <>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
                className="border border-primary-foreground p-5 hover:bg-white hover:border-secondary cursor-pointer hover:text-secondary"
              />
            </PaginationItem>
          )}

          {visiblePages.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => handlePageChange(pageNumber)}
                isActive={pageNumber === currentPage}
                className={
                  pageNumber === currentPage
                    ? "border border-secondary text-secondary p-5 hover:bg-white hover:text-secondary cursor-pointer"
                    : "border border-primary-foreground p-5 hover:bg-white cursor-pointer"
                }
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}

          {visiblePages[visiblePages.length - 1] < totalPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className="border border-primary-foreground p-5 hover:bg-white hover:border-secondary cursor-pointer hover:text-secondary"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default NetworkPaginationComponent;
