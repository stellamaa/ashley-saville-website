"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "@/public/logo.png";
import menuIcon from "@/public/menu.svg";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exhibitionsOpen, setExhibitionsOpen] = useState(false);

  // Don't show header on Sanity Studio
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isLanding = pathname === "/";

  // On the landing page (with the hero image), header/nav text should be white.
  // On all other pages, it stays black.

  const navTextClass = isLanding ? "text-white" : "text-neutral-900";
  const linkHoverClass = isLanding
    ? "hover:text-white/70"
    : "hover:text-neutral-600";

    const invertLogo = isLanding ? "invert" : "";

  // Desktop only: Exhibitions is a normal nav link; Archive shows underneath only when on an exhibitions page (absolute so nav links don't shift)
  const isOnExhibitionsSection = pathname?.startsWith("/exhibitions");
  const exhibitionsBlockDesktop = (
    <div className="relative">
      <Link href="/exhibitions" className={`${linkHoverClass}`}>
        Exhibitions
      </Link>
      {isOnExhibitionsSection && (
        <Link
          href="/exhibitions/archive"
          className={`absolute left-0 top-full mt-0.5 whitespace-nowrap ${navTextClass} ${linkHoverClass}`}
        >
          Archive
        </Link>
      )}
    </div>
  );

  const exhibitionsBlockMobile = (
    <div className="flex flex-col items-center">
      <Link
        href="/exhibitions"
        type="button"
        onClick={() => setExhibitionsOpen((prev) => !prev)}
        className="text-neutral-900 hover:text-neutral-600 text-md p-0 bg-transparent border-0 cursor-pointer font-inherit"
      >
        Exhibitions
      </Link>
      {exhibitionsOpen && (
        <Link
          href="/exhibitions/archive"
          className="text-sm text-neutral-900 hover:text-neutral-600 mt-1"
          onClick={() => {
            setMobileMenuOpen(false);
            setExhibitionsOpen(false);
          }}
        >
          Archive
        </Link>
      )}
    </div>
  );

  const mobileNavLinks = (
    <>
      <Link href="/artists" className={linkHoverClass} onClick={() => setMobileMenuOpen(false)}>
        Artists
      </Link>
      {exhibitionsBlockMobile}
      <Link href="/fairs" className={linkHoverClass} onClick={() => setMobileMenuOpen(false)}>
        Fairs
      </Link>
      <Link href="/information" className={linkHoverClass} onClick={() => setMobileMenuOpen(false)}>
        Information
      </Link>
    </>
  );

  const desktopNavLinks = (
    <>
      <Link href="/artists" className={linkHoverClass}>
        Artists
      </Link>
      {exhibitionsBlockDesktop}
      <Link href="/fairs" className={linkHoverClass}>
        Fairs
      </Link>
      <Link href="/information" className={linkHoverClass}>
        Information
      </Link>
    </>
  );

  return (
    <header className={`fixed left-0 right-0 top-0 z-20 flex items-center justify-between px-3 py-1 md:px-2 `}>
      <Link href="/" className="flex">
        <Image
          src={logo}
          alt="Ashley Saville"
          width={150}
          height={25}
          className={`h-11 w-auto ${invertLogo}`}
        />
      </Link>

      {/* Desktop nav: Exhibitions goes to current exhibition, Archive underneath */}
      <nav className={`hidden md:flex md:px-3 gap-6 items-baseline text-base ${navTextClass}`}>
        {desktopNavLinks}
      </nav>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`md:hidden p-0 ${isLanding ? "text-white" : "text-neutral-900"}`}
        aria-label="Toggle menu"
      >
        <Image
          src={menuIcon}
          alt="Menu"
          width={24}
          height={24}
          className={`${invertLogo} mt-2 w-13 h-14 transition-transform duration-200 ease-in-out ${mobileMenuOpen ? "rotate-45" : ""}`}
        />
      </button>

      {/* Mobile menu overlay - top bar with logo + menu icon, then nav links on white */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-white md:hidden flex flex-col"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex items-center justify-between px-3 py-1 flex-shrink-0">
            <Link href="/" className="flex" onClick={() => setMobileMenuOpen(false)}>
              <Image
                src={logo}
                alt="Ashley Saville"
                width={150}
                height={25}
                className="h-11 w-auto"
              />
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(false);
              }}
              className="p-0 text-neutral-900"
              aria-label="Close menu"
            >
              <Image
                src={menuIcon}
                alt="Menu"
                width={24}
                height={24}
                className="mt-2 w-13 h-14 rotate-45 transition-transform duration-200 ease-in-out"
              />
            </button>
          </div>
          <nav className="flex flex-col justify-center items-center mb-50 flex-1 gap-2 text-neutral-900 text-md [&_a]:text-neutral-900 [&_a:hover]:text-neutral-600">
            {mobileNavLinks}
          </nav>
        </div>
      )}
    </header>
  );
}
