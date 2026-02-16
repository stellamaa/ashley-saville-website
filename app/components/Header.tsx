"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "@/public/logo.png";
import menuIcon from "@/public/menu.svg";

interface HeaderProps {
  hasCurrentFair?: boolean;
  currentExhibitionSlug?: string;
  currentFairSlug?: string;
}

export default function Header({ 
  hasCurrentFair = false,
  currentExhibitionSlug,
  currentFairSlug,
}: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't show header on Sanity Studio
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isLanding = pathname === "/";

  const navTextClass = isLanding ? "text-white" : "text-neutral-900";
  const linkHoverClass = isLanding
    ? "hover:text-white/70"
    : "hover:text-neutral-600";

    const invertLogo = isLanding ? "invert" : "";

  // Desktop only: Exhibitions links to current exhibition if available; Archive shows underneath only when on an exhibitions page (absolute so nav links don't shift)
  const isOnExhibitionsSection = pathname?.startsWith("/exhibitions");
  const exhibitionsBlockDesktop = (
    <div className="relative">
      <Link 
        href={currentExhibitionSlug ? `/exhibitions/${currentExhibitionSlug}` : "/exhibitions"} 
        className={`${linkHoverClass}`}
      >
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

  // Desktop only: Fairs is shown conditionally; Archive shows underneath only when on a fairs page
  const isOnFairsSection = pathname?.startsWith("/fairs");
  const fairsBlockDesktop = hasCurrentFair && currentFairSlug ? (
    <div className="relative">
      <Link href={`/fairs/${currentFairSlug}`} className={`${linkHoverClass}`}>
        Fairs
      </Link>
      {isOnFairsSection && (
        <Link
          href="/fairs/archive"
          className={`absolute left-0 top-full mt-0.5 whitespace-nowrap ${navTextClass} ${linkHoverClass}`}
        >
          Archive
        </Link>
      )}
    </div>
  ) : null;

  const exhibitionsBlockMobile = currentExhibitionSlug ? (
    <Link
      href={`/exhibitions/${currentExhibitionSlug}`}
      className={`${linkHoverClass} leading-normal h-auto`}
      onClick={() => setMobileMenuOpen(false)}
    >
      Exhibitions
    </Link>
  ) : (
    <Link
      href="/exhibitions"
      className={`${linkHoverClass} leading-normal h-auto`}
      onClick={() => setMobileMenuOpen(false)}
    >
      Exhibitions
    </Link>
  );

  const fairsBlockMobile = hasCurrentFair && currentFairSlug ? (
    <Link
      href={`/fairs/${currentFairSlug}`}
      className={`${linkHoverClass} leading-normal h-auto`}
      onClick={() => setMobileMenuOpen(false)}
    >
      Fairs
    </Link>
  ) : null;

  const mobileNavLinks = (
    <>
      <Link href="/artists" className={`${linkHoverClass} leading-normal h-auto`} onClick={() => setMobileMenuOpen(false)}>
        Artists
      </Link>
      {exhibitionsBlockMobile}
      {fairsBlockMobile}
      <Link href="/information" className={`${linkHoverClass} leading-normal h-auto`} onClick={() => setMobileMenuOpen(false)}>
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
      {fairsBlockDesktop}
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
          className={`${isLanding ? "invert" : "brightness-0"} mt-2 w-13 h-14 transition-transform duration-200 ease-in-out ${mobileMenuOpen ? "rotate-45" : ""}`}
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
          <nav className="flex flex-col justify-center items-center mb-50 flex-1 gap-2 text-neutral-900 text-md">
            {mobileNavLinks}
          </nav>
        </div>
      )}
    </header>
  );
}
