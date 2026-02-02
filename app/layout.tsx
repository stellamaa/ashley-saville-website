import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";

const clashGrotesk = localFont({
  src: "./fonts/ClashGrotesk-Light.otf",
  variable: "--font-clash-grotesk",
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
        className={`${clashGrotesk.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
