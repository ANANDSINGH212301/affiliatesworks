"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { ScrollArea } from "../../ui/scroll-area";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import SearchInput from "./SearchInput";

interface Niche {
  slug: string;
  count: number;
  NicheId: number;
  name: string;
}
interface Network {
  slug: string;
  count: number ;
  NetworkId: number;
  name: string;
}
interface Country {
  slug: string;
  count: number ;
  CountryId: number;
  name: string;
 
}

interface AdvancedFilterProps {
  niches: Niche[];
  networks: Network[];
  countries: Country[];
}

const AdvancedFilter = ({
  niches,
  networks,
  countries,
}: AdvancedFilterProps) => {
  // console.log("coutnries",countries);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [nichevalue, setNicheValue] = useState("");
  const [networkvalue, setNetworkValue] = useState("");
  const [countryvalue, setCountryValue] = useState("");


  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (nichevalue) params.set("category", nichevalue);
    else params.delete("category");
    if (networkvalue) params.set("network", networkvalue);
    else params.delete("network");
    if (countryvalue) params.set("country", countryvalue);
    else params.delete("country");
  
    replace(`${pathname}?${params.toString()}`); 
  }, [nichevalue, networkvalue, countryvalue, pathname, replace, searchParams]);
  

  return (
    <div className="w-full ">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg">Filters</h2>
        </div>
        <div>
          <Button
            className="text-secondary underline"
            variant={"link"}
            onClick={() => {
              setNicheValue("");
              setNetworkValue("");
              setCountryValue("");
            }}
          >
            Reset All
          </Button>
        </div>
      </div>
      <div>
        <div>
         <SearchInput />
        </div>
        <Accordion
          type="single"
          defaultValue="categories"
          collapsible
          className="w-full space-y-3"
        >
          <AccordionItem value="categories" className=" bg-white  ">
            <AccordionTrigger className="data-[state=open]:text-secondary text-left font-semibold lg:text-lg hover:no-underline border border-primary rounded-lg px-4">
              Category
            </AccordionTrigger>
            <AccordionContent className="pt-4 px-4">
              <ScrollArea className="h-[300px]">
                <Command>
                  <CommandInput
                    placeholder="Search Cateogry..."
                    className="h-9"
                  />
                  <CommandEmpty>No Category found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {Array.isArray(niches) &&
                        niches.map((niche: Niche) => (
                          <CommandItem
                            key={niche.NicheId}
                            value={niche.slug}
                            onSelect={(currentValue) => {
                              setNicheValue(
                                currentValue === nichevalue ? "" : currentValue
                              );
                              // setOpen(false);
                            }}
                            className="pointer hover:bg-slate-600"
                          >
                            <div className="flex w-full items-center ">
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4 font-bold",
                                  nichevalue === niche.slug
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />

                              <span>{niche.name}</span>
                            </div>
                            <span className="text-primary text-sm font-bold px-1 rounded-full">
                              {niche.count || 0}
                            </span>
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="networks" className=" bg-white  ">
            <AccordionTrigger className="data-[state=open]:text-secondary text-left font-semibold lg:text-lg hover:no-underline border border-primary rounded-lg px-4">
              Networks
            </AccordionTrigger>
            <AccordionContent className="pt-4 px-2">
              <ScrollArea className="h-[250px]">
                <Command>
                  <CommandInput
                    placeholder="Search Cateogry..."
                    className="h-9"
                  />
                  <CommandEmpty>No Networks found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {Array.isArray(networks) &&
                        networks.map((network: Network) => (
                          <CommandItem
                            key={network.NetworkId}
                            value={network.slug}
                            onSelect={(currentValue) => {
                              setNetworkValue(
                                currentValue === networkvalue
                                  ? ""
                                  : currentValue
                              );
                              // setOpen(false);
                            }}
                            className="pointer hover:bg-slate-600"
                          >
                            <div className="flex w-full items-center ">
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  networkvalue === network.slug
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />

                              <span>{network.name}</span>
                            </div>
                            <span className="text-primary text-sm font-bold px-1 rounded-full">
                              {network.count || 0}
                            </span>
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="countries" className=" bg-white  ">
            <AccordionTrigger className="data-[state=open]:text-secondary text-left font-semibold lg:text-lg hover:no-underline border border-primary rounded-lg px-4">
              Countries
            </AccordionTrigger>
            <AccordionContent className="pt-4 px-2">
              <ScrollArea className="h-[250px]">
                <Command>
                  <CommandInput
                    placeholder="Search Cateogry..."
                    className="h-9"
                  />
                  <CommandEmpty>No Countries found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {Array.isArray(countries) &&
                        countries.map((country: Country) => {
                          const code = country.slug.toUpperCase();
                          const fullName = getCountryFullName(code);

                          const flagEmoji = country.slug
                            .toUpperCase()
                            .split("")
                            .map((char) =>
                              String.fromCodePoint(
                                0x1f1e6 + char.charCodeAt(0) - 65
                              )
                            )
                            .join("");
                          return (
                            <CommandItem
                              key={country.CountryId}
                              value={country.slug}
                              onSelect={(currentValue) => {
                                setCountryValue(
                                  currentValue === countryvalue
                                    ? ""
                                    : currentValue
                                );
                                // setOpen(false);
                              }}
                              className="pointer hover:bg-slate-600"
                            >
                              <div className="flex w-full items-center ">
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    countryvalue === country.slug
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />

                                <span>{fullName || country.name}</span>
                                <span className="pl-2">{flagEmoji}</span>
                              </div>

                              <span className="text-primary text-sm font-bold px-1 ">
                                {country.count || 0}
                              </span>
                            </CommandItem>
                          );
                        })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default AdvancedFilter;

const getCountryFullName = (code: string): string => {
  const countryNameMap: { [key: string]: string } = {
    WW: "Global",
    AF: "Afghanistan",
    AX: "Åland Islands",
    AL: "Albania",
    DZ: "Algeria",
    AS: "American Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarctica",
    AG: "Antigua and Barbuda",
    AR: "Argentina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaijan",
    BS: "Bahamas",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Belarus",
    BE: "Belgium",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia",
    BQ: "Bonaire, Sint Eustatius and Saba",
    BA: "Bosnia and Herzegovina",
    BW: "Botswana",
    BV: "Bouvet Island",
    BR: "Brazil",
    IO: "British Indian Ocean Territory",
    BN: "Brunei Darussalam",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    CV: "Cabo Verde",
    KH: "Cambodia",
    CM: "Cameroon",
    CA: "Canada",
    KY: "Cayman Islands",
    CF: "Central African Republic",
    TD: "Chad",
    CL: "Chile",
    CN: "China",
    CX: "Christmas Island",
    CC: "Cocos (Keeling) Islands",
    CO: "Colombia",
    KM: "Comoros",
    CG: "Congo",
    CD: "Congo (Democratic Republic of the)",
    CK: "Cook Islands",
    CR: "Costa Rica",
    CI: "Côte d'Ivoire",
    HR: "Croatia",
    CU: "Cuba",
    CW: "Curaçao",
    CY: "Cyprus",
    CZ: "Czechia",
    DK: "Denmark",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominican Republic",
    EC: "Ecuador",
    EG: "Egypt",
    SV: "El Salvador",
    GQ: "Equatorial Guinea",
    ER: "Eritrea",
    EE: "Estonia",
    SZ: "Eswatini",
    ET: "Ethiopia",
    FK: "Falkland Islands (Malvinas)",
    FO: "Faroe Islands",
    FJ: "Fiji",
    FI: "Finland",
    FR: "France",
    GF: "French Guiana",
    PF: "French Polynesia",
    TF: "French Southern Territories",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Germany",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Greece",
    GL: "Greenland",
    GD: "Grenada",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GG: "Guernsey",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heard Island and McDonald Islands",
    VA: "Holy See",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hungary",
    IS: "Iceland",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran",
    IQ: "Iraq",
    IE: "Ireland",
    IM: "Isle of Man",
    IL: "Israel",
    IT: "Italy",
    JM: "Jamaica",
    JP: "Japan",
    JE: "Jersey",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "Korea (Democratic People's Republic of)",
    KR: "Korea (Republic of)",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Lao People's Democratic Republic",
    LV: "Latvia",
    LB: "Lebanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libya",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxembourg",
    MO: "Macao",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malta",
    MH: "Marshall Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Mexico",
    FM: "Micronesia (Federated States of)",
    MD: "Moldova",
    MC: "Monaco",
    MN: "Mongolia",
    ME: "Montenegro",
    MS: "Montserrat",
    MA: "Morocco",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Netherlands",
    NC: "New Caledonia",
    NZ: "New Zealand",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolk Island",
    MK: "North Macedonia",
    MP: "Northern Mariana Islands",
    NO: "Norway",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestine",
    PA: "Panama",
    PG: "Papua New Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Philippines",
    PN: "Pitcairn",
    PL: "Poland",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    RE: "Réunion",
    RO: "Romania",
    RU: "Russia",
    RW: "Rwanda",
    BL: "Saint Barthélemy",
    SH: "Saint Helena",
    KN: "Saint Kitts and Nevis",
    LC: "Saint Lucia",
    MF: "Saint Martin",
    PM: "Saint Pierre and Miquelon",
    VC: "Saint Vincent and the Grenadines",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Sao Tome and Principe",
    SA: "Saudi Arabia",
    SN: "Senegal",
    RS: "Serbia",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SG: "Singapore",
    SX: "Sint Maarten",
    SK: "Slovakia",
    SI: "Slovenia",
    SB: "Solomon Islands",
    SO: "Somalia",
    ZA: "South Africa",
    GS: "South Georgia and the South Sandwich Islands",
    SS: "South Sudan",
    ES: "Spain",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Suriname",
    SE: "Sweden",
    CH: "Switzerland",
    SY: "Syrian Arab Republic",
    TW: "Taiwan",
    TJ: "Tajikistan",
    TZ: "Tanzania",
    TH: "Thailand",
    TL: "Timor-Leste",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad and Tobago",
    TN: "Tunisia",
    TR: "Turkey",
    TM: "Turkmenistan",
    TC: "Turks and Caicos Islands",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraine",
    AE: "United Arab Emirates",
    GB: "United Kingdom",
    US: "United States",
    UM: "United States Minor Outlying Islands",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VE: "Venezuela",
    VN: "Viet Nam",
    VG: "Virgin Islands (British)",
    VI: "Virgin Islands (U.S.)",
    WF: "Wallis and Futuna",
    EH: "Western Sahara",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe",
  };

  return countryNameMap[code.toUpperCase()] || "";
};


