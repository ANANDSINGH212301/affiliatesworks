
export type ProgramFieldPageType = {
  commissiontext: string;
  logo: string | null;
  postcount: number | null;
  avgreview: number | null;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  tiktok: string;
  reddit: string;
  pinterest: string;
  description: string;
  websiteurl: string;
  applyurl: string;
  faq: FAQ[];
  conversiontype : string[];
  recommeded: boolean;
  verified: boolean;
  sponsered: boolean;

};

export type ProgramFieldType = {
  commissiontext: string;
  logo: string | null;
  postcount: number | null;
  avgreview: number | null;
  websiteurl : string;
  conversiontype : string[];
  recommeded: boolean;
  verified: boolean;
  sponsered: boolean;
};
export type Seo={
  description : string;
  focusKeywords: string;
}
export type FAQ={
  question: string;
  answer: string;
}

export type NicheType = {
  slug: string;
  nicheId: number;
  name: string;
};

export type NetworkType = {
  slug: string;
  name: string;
  networkId: number;
};

export type CountryType = {
  name: string;
};

export type FeaturedImageType = {
  node: {
    sourceUrl: string;
  };
};

export type ProgramListingType = {
  title: string;
  slug: string;
  status: string;
  programId: number;
  programstatus: string;
  featuredImage: FeaturedImageType;
  programfield: ProgramFieldType;
  niches: {
    nodes: NicheType[];
  };
  networks: {
    nodes: NetworkType[];
  };
  countries: {
    nodes: CountryType[];
  };
};


export type ProgramListingPageType = {
  title: string;
  slug: string;
  status: string;
  programId: number;
  programstatus: string;
  featuredImage: FeaturedImageType;
  programfield: ProgramFieldPageType;
  seo: Seo;
  niches: {
    nodes: NicheType[];
  };
  networks: {
    nodes: NetworkType[];
  };
  countries: {
    nodes: CountryType[];
  };
};

