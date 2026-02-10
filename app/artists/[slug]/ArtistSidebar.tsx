"use client";

import { useEffect, useRef, useState } from "react";

type SectionId = "biography" | "works" | "exhibitions";

type Props = {
  CV?: string;
  press?: string;
  pressLink?: { label?: string; url: string };
};

export default function ArtistSidebar({ CV, press, pressLink }: Props) {
  const [activeSection, setActiveSection] = useState<SectionId>("biography");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections: SectionId[] = ["biography", "works", "exhibitions"];
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
  }, []);

  const scrollTo = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navClass = (id: SectionId) =>
    `block w-full text-left lg:text-right text-sm font-medium ${
      activeSection === id ? "underline text-neutral-900" : "text-neutral-600 hover:text-neutral-900"
    }`;

  return (
    <div className="sticky top-32 flex flex-col items-start lg:items-end gap-6">
      <nav className="space-y-1">
        <button onClick={() => scrollTo("biography")} className={navClass("biography")}>
          Biography
        </button>
        <button onClick={() => scrollTo("works")} className={navClass("works")}>
          Works
        </button>
        <button onClick={() => scrollTo("exhibitions")} className={navClass("exhibitions")}>
          Exhibitions
        </button>
      </nav>
      <div className="flex flex-col items-start lg:items-end">
        <div className="flex flex-col items-start lg:items-end gap-0 leading-tight">
          {CV && (
            <a
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              Download CV
            </a>
          )}
          {press && (
            <a
              href={press}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 hover:text-neutral-900"
            >
              Download Press Release
            </a>
          )}
        </div>
        <p className="text-sm font-medium text-neutral-600 mt-2">Press</p>
        {pressLink?.url && (
          
          <a
            href={pressLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-600 hover:text-neutral-900 mt-0"
          >
            {pressLink.label || "Press link"}
          </a>
        )}
      </div>
    </div>
  );
}
