import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/Header";
import PageTransition from "@/app/components/PageTransition";
import { getCurrentFair, getCurrentExhibition } from "@/sanity/sanity-utils";
export const revalidate = 60;

const light = localFont({
  src: "./fonts/ColumbiaSans-Light.otf",
  variable: "--font-light",
  weight: "400",
  style: "normal",
});
 
const vinter = localFont({
  src: "./fonts/ColumbiaSans-Regular.otf",
  variable: "--font-inter", 
  weight: "400",
  style: "normal",

});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  "https://ashleysaville.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ashley Saville",
  description: "Ashley Saville — contemporary art gallery in London.",
  openGraph: {
    title: "Ashley Saville",
    description: "Ashley Saville — contemporary art gallery in London.",
    siteName: "Ashley Saville",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashley Saville",
    description: "Ashley Saville — contemporary art gallery in London.",
    images: ["/opengraph-image.png"],
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentFair = await getCurrentFair();
  const currentExhibition = await getCurrentExhibition();
  const hasCurrentFair = !!currentFair;

  return (
    <html lang="en">
      <body
        className={`${light.variable} ${vinter.variable} font-sans font-medium text-neutral-900 text-md antialiased`}
      >
        <Header 
          hasCurrentFair={hasCurrentFair}
          currentExhibitionSlug={currentExhibition?.slug}
          currentFairSlug={currentFair?.slug}
        />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
