"use client";

import { useEffect, useRef, useState } from "react";

type SectionId = "biography" |"installations" | "works";

export default function ArtistNavigation() {
  const [activeSection, setActiveSection] = useState<SectionId>("biography");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections: SectionId[] = ["biography", "installations" ,"works"];
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
    `block w-full text-right lg:text-right text-sm font-medium ${
      activeSection === id ? "underline text-neutral-900" : "text-neutral-600 hover:text-neutral-900"
    }`;

  return (
    <nav className="space-y-1">
      <button onClick={() => scrollTo("biography")} className={navClass("biography")}>
        Biography
      </button>
      <button onClick={() => scrollTo("installations")} className={navClass("installations")}>
        Installations
      </button>
      <button onClick={() => scrollTo("works")} className={"md:mb-10 " + navClass("works")}>
        Works
      </button>
    
    </nav>
  );
}
