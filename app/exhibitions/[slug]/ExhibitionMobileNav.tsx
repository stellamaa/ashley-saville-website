"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SectionId = "text" | "works";

type Props = {
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

/** Only show on main exhibition slug page (e.g. /exhibitions/my-show), not on gallery sub-routes. */
function isExhibitionSlugPage(pathname: string | null): boolean {
  return !!pathname && /^\/exhibitions\/[^/]+$/.test(pathname);
}

export default function ExhibitionMobileNav({ hasWorks }: Props) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<SectionId>("text");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const sections: SectionId[] = ["text"];
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
  }, [hasWorks]);

  if (!isExhibitionSlugPage(pathname)) return null;

  return (
    <nav
      className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between divide-x divide-neutral-300 bg-white  lg:hidden border-t border-neutral-300"
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
          href="/exhibitions/archive"
          className="text-sm font-medium text-neutral-900 hover:text-neutral-600"
        >
          Archive
        </Link>
      </div>
    </nav>
  );
}
