"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const FADE_OUT_MS = 400;

interface HeaderProps {
  hasCurrentFair?: boolean;
  currentExhibitionSlug?: string;
  currentFairSlug?: string;
  showFairTab?: boolean;
}

export default function Header({
  hasCurrentFair,
  currentExhibitionSlug,
  currentFairSlug,
  showFairTab = false,
}: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const wasOnHome = pathname === "/";
    sessionStorage.setItem("skip-landing-flash", "1");
    window.dispatchEvent(new CustomEvent("page-transition-navigate"));
    setTimeout(() => {
      router.push("/");
      if (wasOnHome) {
        window.dispatchEvent(new CustomEvent("page-transition-fade-in"));
      }
    }, FADE_OUT_MS);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    return () => document.body.classList.remove("mobile-menu-open");
  }, [mobileMenuOpen]);

  // Don't show header on Sanity Studio or password page
  if (pathname?.startsWith("/admin") || pathname === "/unlock") {
    return null;
  }

  // Light = white text (for dark/image backgrounds like home)
  // Dark = dark text (for light backgrounds like artists, exhibitions, etc.)
  const resolvedVariant = pathname === "/" ? "light" : "dark";

  const textClass = resolvedVariant === "light" ? "text-white" : "text-neutral-900";
  const linkHoverClass = resolvedVariant === "light" ? "hover:text-white" : "hover:text-neutral-600";
  const navTextClass = textClass;
  // Logo and menu icon: pure white on landing (brightness-0 invert), dark otherwise
  const logoClass = resolvedVariant === "light" && !mobileMenuOpen ? "brightness-0 invert" : "";
  const menuIconClass = resolvedVariant === "light" && !mobileMenuOpen ? "brightness-0 invert" : "";

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

  const isOnFairsSection = pathname?.startsWith("/fairs");
  const fairsBlockDesktop = showFairTab ? (
    <div className="relative">
      <Link
        href={hasCurrentFair && currentFairSlug ? `/fairs/${currentFairSlug}` : "/fairs/archive"}
        className={linkHoverClass}
      >
        Fair
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
  ) : null;

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
      </div>
      {showFairTab && (
        <div className="flex flex-col items-center">
          <Link
            href={hasCurrentFair && currentFairSlug ? `/fairs/${currentFairSlug}` : "/fairs/archive"}
            className={linkHoverClass}
            onClick={() => setMobileMenuOpen(false)}
          >
            Fair
          </Link>
        </div>
      )}
      <Link href="/information" className={linkHoverClass} onClick={() => setMobileMenuOpen(false)}>
        Information
      </Link>
    </>
  );

  return (
    <header className="relative md:fixed left-0 right-0 top-0 z-20 flex items-start justify-between px-3 py-2 pr-14 md:px-1 md:pr-1 lg:px-6 lg:pr-6 lg:py-1 bg-transparent">
      <Link
        href="/"
        className={`text-lg font-medium z-22 ${navTextClass} ${linkHoverClass}`}
        onClick={handleLogoClick}
        data-logo-link
      >
        <Image src="/logo.png" alt="Ashley Saville" width={200} height={186} className={`ml-1 mt-0 z-22 w-[140px] h-auto md:w-[225px] lg:mt-0 lg:-ml-1 ${logoClass || "opacity-90"}`} />
      </Link>

      {/* Mobile: menu (right) sticky; Ashley logo (left) scrolls. Desktop: all nav links on the right */}
      <div className="flex justify-end fixed right-0 top-0 py-2 pr-3 z-30 md:static md:py-0 md:pr-0">
        <nav className={`hidden md:flex gap-6 text-md md:mt-5 ${navTextClass}`}>
          {desktopNavLinks}
        </nav>
        <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`md:hidden p-0 pt-1 z-22 ${textClass}`}
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
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-0 bg-neutral-white md:hidden z-10 px-6 py-8 flex flex-col items-center justify-center pb-42 "
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav className="flex flex-col items-center justify-center gap-2 text-neutral-900 text-lg text-center [&_a]:text-neutral-900 [&_a:hover]:text-neutral-600 [&_a]:block [&_a]:text-center">
            {mobileNavLinks}
          </nav>
        </div>
      )}
    </header>
  );
}
