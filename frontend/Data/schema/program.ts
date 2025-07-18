import { ProgramListingType } from "../types/program";

export function generateSchemaProgramListing(programs: ProgramListingType[]) {
    return programs.map((program) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: program.title,
      url: `/program/${program.slug}`,
      image: program.programfield.logo || program.featuredImage?.node?.sourceUrl || "",
      description: `Affiliate program offering ${program.programfield.commissiontext}.`,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: program.programfield.avgreview || 0,
        reviewCount: program.programfield.postcount || 0,
      },
      offers: {
        "@type": "Offer",
        availability: program.status === "active" ? "InStock" : "OutOfStock",
        url: `/program/${program.slug}`,
      },
    }));
  }