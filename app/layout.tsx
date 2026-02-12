import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";

// Local VinterTrial Medium font. Make sure the OTF file is placed at:
// app/fonts/VinterTrial-Medium.otf
const vinter = localFont({
  src: "./fonts/VinterTrial-Medium.otf",
  variable: "--font-inter", // reused CSS variable for the sans font
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Ashley Saville",
  description: "Ashley Saville",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${vinter.variable} font-sans font-medium text-neutral-900 text-md antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
