"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "@/public/logo.png";

type HeaderVariant = "light" | "dark";

export default function Header({ variant }: { variant?: HeaderVariant }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't show header on Sanity Studio
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const resolvedVariant =
    variant ?? (pathname === "/" || pathname?.startsWith("/exhibitions/archive") ? "light" : "dark");

  const textClass =
    resolvedVariant === "light" ? "text-white" : "text-neutral-900";
  const linkHoverClass =
    resolvedVariant === "light" ? "hover:text-white/90" : "hover:text-neutral-600";

  const navLinks = (
    <>
      <Link href="/artists" className={linkHoverClass} onClick={() => setMobileMenuOpen(false)}>
        Artists
      </Link>
      <div className="flex flex-col">
        <Link href="/exhibitions" className={linkHoverClass} onClick={() => setMobileMenuOpen(false)}>
          Exhibitions
        </Link>
    
      </div>
      <Link href="/fairs" className={linkHoverClass} onClick={() => setMobileMenuOpen(false)}>
        Fairs
      </Link>
      <Link href="/information" className={linkHoverClass} onClick={() => setMobileMenuOpen(false)}>
        Information
      </Link>
    </>
  );

  return (
    <header className="fixed left-0 right-0 top-0 z-20 flex items-center justify-between px-3 py-1 md:px-9">
      <Link href="/" className="flex">
        <Image
          src={logo}
          alt="Ashley Saville"
          width={150}
          height={25}
          className="h-11 w-auto"
        />
      </Link>

      {/* Desktop nav */}
      <nav className={`hidden md:flex gap-6 text-sm ${textClass}`}>
        {navLinks}
      </nav>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`md:hidden p-0 ${textClass}`}
        aria-label="Toggle menu"
      >
        <Image
          src="/menu.svg"
          alt="Menu"
          width={24}
          height={24}
          className="mt-2 w-13 h-14"
        />
      </button>

      {/* Mobile menu overlay - nav centered, positioned further to bottom */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[52px] bg-white md:hidden flex flex-col justify-center items-center"
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav className="flex flex-col items-center gap-4 text-neutral-900 text-lg [&_a]:text-neutral-900 [&_a:hover]:text-neutral-600">
            {navLinks}
          </nav>
        </div>
      )}
    </header>
  );
}
