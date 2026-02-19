"use client";

import { useEffect, useRef, useState } from "react";

type SectionId = "biography" |"installations" | "works";

type Props = {
  hasInstallations?: boolean;
  hasWorks?: boolean;
};

export default function ArtistNavigation({ hasInstallations = false, hasWorks = false }: Props) {
  const [activeSection, setActiveSection] = useState<SectionId>("biography");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Build sections array based on what's available
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

  const scrollTo = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 50; // pt-24 = 96px
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navClass = (id: SectionId) =>
    `block w-full text-right lg:text-right text-sm font-medium ${
      activeSection === id ? "underline text-neutral-900" : "text-neutral-900 hover:text-neutral-900"
    }`;

  return (
    <nav className="space-y-1 text-neutral-900">
      <button onClick={() => scrollTo("biography")} className={navClass("biography")}>
        Biography
      </button>
      {hasInstallations && (
        <button onClick={() => scrollTo("installations")} className={navClass("installations")}>
          Installations
        </button>
      )}
      {hasWorks && (
        <button onClick={() => scrollTo("works")} className={"md:mb-10 " + navClass("works")}>
          Works
        </button>
      )}
    </nav>
  );
}
