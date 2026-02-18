import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/app/components/Header";
import { getCurrentFair, getCurrentExhibition } from "@/sanity/sanity-utils";

const light = localFont({
  src: "./fonts/ColumbiaSans-Light.otf",
  variable: "--font-light",
  weight: "400",
  style: "normal",
});
 
const vinter = localFont({
  src: "./fonts/ColumbiaSans-ExtraLight.otf",
  variable: "--font-inter", // reused CSS variable for the sans font
  weight: "400",
  style: "normal",

});

export const metadata: Metadata = {
  title: "Ashley Saville",
  description: "Ashley Saville",
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
        className={`${vinter.variable} font-sans font-medium text-neutral-900 text-md antialiased`}
      >
        <Header 
          hasCurrentFair={hasCurrentFair}
          currentExhibitionSlug={currentExhibition?.slug}
          currentFairSlug={currentFair?.slug}
        />
        {children}
      </body>
    </html>
  );
}
