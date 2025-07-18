


type CategoryListingtype= {
    slug : string;
    name: string;
    count: number;
    nichefield : {
        image :{
            node:{
                sourceUrl: string;
            }
        }
    }
  }


  
export const generateSchemacategoryListing =(niches: CategoryListingtype[])=>{
    const itemList = niches.map((niche, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": niche.name,
        "url": `https://example.com/category/${niche.slug}`, // Replace with your domain
        "image": niche.nichefield?.image?.node?.sourceUrl || null
      }));
    
      // JSON-LD structured data for niches
      const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Top Affiliate Program Categories",
        "itemListElement": itemList
      };

    return schema;
}