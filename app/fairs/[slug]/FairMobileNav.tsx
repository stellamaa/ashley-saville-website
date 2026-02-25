"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SectionId = "text" | "installations" | "works";

type Props = {
  hasInstallations: boolean;
  hasWorks: boolean;
};

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const headerHeight = 50;
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
}

/** Only show on main fair slug page (e.g. /fairs/frieze), not on gallery sub-routes. */
function isFairSlugPage(pathname: string | null): boolean {
  return !!pathname && /^\/fairs\/[^/]+$/.test(pathname);
}

export default function FairMobileNav({
  hasInstallations,
  hasWorks,
}: Props) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<SectionId>("text");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const sections: SectionId[] = ["text"];
  if (hasInstallations) sections.push("installations");
  if (hasWorks) sections.push("works");

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id as SectionId;
          if (sections.includes(id)) setActiveSection(id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el && observerRef.current) observerRef.current.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [hasInstallations, hasWorks]);

  if (!isFairSlugPage(pathname)) return null;

  return (
    <nav
      className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between divide-x divide-neutral-300 bg-white h-8 lg:hidden border-t border-neutral-300"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0rem)" }}
    >
      <div className="flex-1 flex justify-center">
        <button
          type="button"
          onClick={() => scrollTo("text")}
          className={`text-sm font-medium text-neutral-900 pb-1 ${
            activeSection === "text" ? "underline underline-offset-3" : "hover:text-neutral-600"
          }`}
        >
          Text
        </button>
      </div>
      {hasInstallations && (
        <div className="flex-1 flex justify-center">
          <button
            type="button"
            onClick={() => scrollTo("installations")}
            className={`text-sm font-medium text-neutral-900 pb-1 ${
              activeSection === "installations" ? "underline underline-offset-3" : "hover:text-neutral-600"
            }`}
          >
            Installations
          </button>
        </div>
      )}
      {hasWorks && (
        <div className="flex-1 flex justify-center">
          <button
            type="button"
            onClick={() => scrollTo("works")}
            className={`text-sm font-medium text-neutral-900 pb-1 ${
              activeSection === "works" ? "underline underline-offset-3" : "hover:text-neutral-600"
            }`}
          >
            Works
          </button>
        </div>
      )}
      <div className="flex-1 flex justify-center">
        <Link
          href="/fairs/archive"
          className="text-sm font-medium text-neutral-900 hover:text-neutral-600"
        >
          Archive
        </Link>
      </div>
    </nav>
  );
}
