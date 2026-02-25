"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type SectionId = "biography" | "installations" | "works";

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

/** Only show on main artist slug page (e.g. /artists/jane-doe), not on works/exhibition gallery. */
function isArtistSlugPage(pathname: string | null): boolean {
  return !!pathname && /^\/artists\/[^/]+$/.test(pathname);
}

export default function ArtistMobileNav({
  hasInstallations,
  hasWorks,
}: Props) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<SectionId>("biography");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const sections: SectionId[] = ["biography"];
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

  if (!isArtistSlugPage(pathname)) return null;

  return (
 
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between gap-4 bg-white px-6 py-4 lg:hidden border-t border-b border-neutral-300"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0rem)" }}
    >
      <button
        type="button"
        onClick={() => scrollTo("biography")}
        className={`text-sm font-medium text-neutral-900 pb-1 ${
          activeSection === "biography" ? "border-neutral-900 underline underline-offset-3" : ""
        }`}
      >
        Biography
      </button>
      {hasInstallations && (
        <button
          type="button"
          onClick={() => scrollTo("installations")}
          className={`text-sm font-medium text-neutral-900 pb-1 border-b border-transparent ${
            activeSection === "installations" ? "border-neutral-900 underline underline-offset-3" : ""
          }`}
        >
          Installations
        </button>
      )}
      {hasWorks && (
        <button
          type="button"
          onClick={() => scrollTo("works")}
          className={`text-sm font-medium text-neutral-900 pb-1 border-b border-transparent ${
            activeSection === "works" ? "border-neutral-900 underline underline-offset-3" : ""
          }`}
        >
          Works
        </button>
      )}
    </nav>
  );
}
