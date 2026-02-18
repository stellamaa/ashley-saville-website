"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface HeaderProps {
  hasCurrentFair?: boolean;
  currentExhibitionSlug?: string;
  currentFairSlug?: string;
}

export default function Header({
  hasCurrentFair,
  currentExhibitionSlug,
  currentFairSlug,
}: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't show header on Sanity Studio
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Light = white text (for dark/image backgrounds like home)
  // Dark = dark text (for light backgrounds like artists, exhibitions, etc.)
  const resolvedVariant = pathname === "/" ? "light" : "dark";

  const textClass = resolvedVariant === "light" ? "text-white" : "text-neutral-900";
  const linkHoverClass = resolvedVariant === "light" ? "hover:text-white/90" : "hover:text-neutral-600";
  const navTextClass = textClass;
  // Logo and menu icon should be white only on landing page when menu is closed
  const logoClass = resolvedVariant === "light" && !mobileMenuOpen ? "invert" : "";
  const menuIconClass = resolvedVariant === "light" && !mobileMenuOpen ? "invert" : "";

  // Desktop only: Exhibitions is a normal nav link; Archive shows underneath only when on an exhibitions page (absolute so nav links don't shift)
  const isOnExhibitionsSection = pathname?.startsWith("/exhibitions");
  const exhibitionsBlockDesktop = (
    <div className="relative">
      <Link 
        href={currentExhibitionSlug ? `/exhibitions/${currentExhibitionSlug}` : "/exhibitions"} 
        className={linkHoverClass}
      >
        Exhibitions
      </Link>
      {isOnExhibitionsSection && (
        <Link
          href="/exhibitions/archive"
          className={`absolute left-0 top-full mt-0.5 whitespace-nowrap text-sm ${navTextClass} ${linkHoverClass}`}
        >
          Archive
        </Link>
      )}
    </div>
  );

  // Desktop only: Fairs is a normal nav link; Archive shows underneath only when on a fairs page (absolute so nav links don't shift)
  const isOnFairsSection = pathname?.startsWith("/fairs");
  const fairsBlockDesktop = (
    <div className="relative">
      <Link 
        href={currentFairSlug ? `/fairs/${currentFairSlug}` : "/fairs/archive"} 
        className={linkHoverClass}
      >
        Fairs
      </Link>
      {isOnFairsSection && (
        <Link
          href="/fairs/archive"
          className={`absolute left-0 top-full mt-0.5 whitespace-nowrap text-sm ${navTextClass} ${linkHoverClass}`}
        >
          Archive
        </Link>
      )}
    </div>
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

  const mobileNavLinks = (
    <>
      <Link href="/artists" className={linkHoverClass} onClick={() => setMobileMenuOpen(false)}>
        Artists
      </Link>
      <div className="flex flex-col items-center">
        <Link 
          href={currentExhibitionSlug ? `/exhibitions/${currentExhibitionSlug}` : "/exhibitions"} 
          className={linkHoverClass} 
          onClick={() => setMobileMenuOpen(false)}
        >
          Exhibitions
        </Link>
        {isOnExhibitionsSection && (
          <Link
            href="/exhibitions/archive"
            className={`text-xs mt-1 ${linkHoverClass}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Archive
          </Link>
        )}
      </div>
      <div className="flex flex-col items-center">
        <Link 
          href={currentFairSlug ? `/fairs/${currentFairSlug}` : "/fairs/archive"} 
          className={linkHoverClass} 
          onClick={() => setMobileMenuOpen(false)}
        >
          Fairs
        </Link>
        {isOnFairsSection && (
          <Link
            href="/fairs/archive"
            className={`text-xs mt-1 ${linkHoverClass}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Archive
          </Link>
        )}
      </div>
      <Link href="/information" className={linkHoverClass} onClick={() => setMobileMenuOpen(false)}>
        Information
      </Link>
    </>
  );

  return (
    <header className="fixed left-0 right-0 top-0 z-20 flex items-start justify-between px-3 py-2 md:px-1">
      <Link href="/" className={`text-lg font-medium z-22 ${navTextClass} ${linkHoverClass}`}>
        <Image src="/logo.png" alt="Ashley Saville" width={110} height={110} className={`ml-1 mt-2 z-22 ${logoClass}`} />
      </Link>

      {/* Desktop nav */}
      <nav className={`hidden md:flex gap-6 text-md ${navTextClass}`}>
        {desktopNavLinks}
      </nav>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`md:hidden p-2 z-22 ${textClass}`}
        aria-label="Toggle menu"
      >
        <Image
          src="/menu.svg"
          alt="Menu"
          width={30}
          height={30}
          className={`w-12 h-12 transition-transform duration-300 ease-in-out ${menuIconClass} ${mobileMenuOpen ? "-rotate-45" : ""}`}
        />
      </button>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-0 bg-white md:hidden z-10 px-6 py-8 flex flex-col items-center justify-center pb-42"
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav className="flex flex-col items-center gap-1 text-neutral-900 text-lg [&_a]:text-neutral-900 [&_a:hover]:text-neutral-600">
            {mobileNavLinks}
          </nav>
        </div>
      )}
    </header>
  );
}
