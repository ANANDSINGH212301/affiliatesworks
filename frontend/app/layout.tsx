import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/Global/Others/googleanalytics";
import Header from "@/components/Global/Header/header";
import Footer from "@/components/Global/Footer/footer";
import { ApolloWrapper } from "@/lib/apolloWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Affiliatesworks | Best Affiliate Programs Every Day.",
  description:
    "Discover top affiliate programs with Affiliatesworks. Get reviews, tools, and high-paying opportunities to boost your affiliate marketing success.",
  openGraph: {
    title: "Affiliatesworks | Best Affiliate Every Day.",
    description:
      "Explore the best affiliate programs with Affiliatesworks.com! Find high-paying opportunities, reviews, and tools to boost your affiliate marketing success.",
    url: "https://program.affiliatesworks.com",
    images: ["https://program.affiliatesworks.com/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Affiliatesworks | Best Affiliate Every Day.",
    description:
      "Explore the best affiliate programs with Affiliatesworks.com! Find high-paying opportunities, reviews, and tools to boost your affiliate marketing success.",
    images: ["https://program.affiliatesworks.com/opengraph-image.png"],
  },
  alternates: {
    canonical: "https://program.affiliatesworks.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <main>
            <Header />
            {children}
            <Footer />
          </main>
        </ApolloWrapper>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
