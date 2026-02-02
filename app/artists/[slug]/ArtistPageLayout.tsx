"use client";

import { Artist } from "@/types/artist";
import { Exhibition } from "@/types/exhibition";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ReadMore from "@/app/components/ReadMore";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "long" });
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
          ? "rd"
          : "th";
  return `${day}${suffix} of ${month}`;
}

type Props = {
  artist: Artist;
  exhibitions: Exhibition[];
};

export default function ArtistPageLayout({ artist, exhibitions }: Props) {
  const [activeSection, setActiveSection] = useState<"biography" | "works" | "exhibitions">("biography");
  const biographyRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const exhibitionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = [
      { id: "biography" as const, ref: biographyRef },
      { id: "works" as const, ref: worksRef },
      { id: "exhibitions" as const, ref: exhibitionsRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section") as "biography" | "works" | "exhibitions";
            if (id) setActiveSection(id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (section: "biography" | "works" | "exhibitions") => {
    const refs = { biography: biographyRef, works: worksRef, exhibitions: exhibitionsRef };
    refs[section].current?.scrollIntoView({ behavior: "smooth" });
  };

  const mainImage = artist.images?.[0] ?? artist.image;

  return (
    <div className="min-h-screen bg-white pt-24 px-6 md:px-12 lg:px-16 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-1xl md:text-1xl font-light text-neutral-900 text-center mb-20">
          {artist.name}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-20 mb-24">
          <div className="lg:col-span-6 max-w-md col-span-12">
            <section 
              ref={biographyRef}
              data-section="biography"
              id="biography"
            >
              {artist.biography && artist.biography.length > 0 && (
                <ReadMore content={artist.biography} />
              )}
               {mainImage ? (
            <div className="relative w-full aspect-[16/9] bg-neutral-200">
              <Image
                src={mainImage}
                alt={artist.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-[16/9] bg-neutral-200 flex items-center justify-center">
              <span className="text-neutral-400 text-sm font-light">No image</span>
            </div>
          )}
            </section>
          </div>

          <div className="lg:col-span-6 lg:text-right lg:pl-12">
            <div className="sticky top-32">
              <nav className="space-y-3 mb-10">
                <button
                  onClick={() => scrollToSection("biography")}
                  className={`block w-full text-left lg:text-right text-sm font-light ${
                    activeSection === "biography"
                      ? "underline text-neutral-900"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Biography
                </button>
                <button
                  onClick={() => scrollToSection("works")}
                  className={`block w-full text-left lg:text-right text-sm font-light ${
                    activeSection === "works"
                      ? "underline text-neutral-900"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Works
                </button>
                <button
                  onClick={() => scrollToSection("exhibitions")}
                  className={`block w-full text-left lg:text-right text-sm font-light ${
                    activeSection === "exhibitions"
                      ? "underline text-neutral-900"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Exhibitions
                </button>
              </nav>

              <div>
                <h3 className="text-sm font-light text-neutral-900 mb-4">
                  Documents
                </h3>
                <div className="space-y-2 text-sm font-light text-neutral-600">
                  {artist.CV && (
                    <a
                      href={artist.CV}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-left lg:text-right underline hover:text-neutral-900"
                    >
                      Download CV
                    </a>
                  )}
                  {artist.press && (
                    <a
                      href={artist.press}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-left lg:text-right underline hover:text-neutral-900"
                    >
                      Press
                    </a>
                  )}
                  {artist.pressLink && (
                    <a
                      href={artist.pressLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-left lg:text-right underline hover:text-neutral-900"
                    >
                      Press link
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section
          ref={worksRef}
          data-section="works"
          id="works"
          className="mb-16"
        >
         
        </section>

        <section
          ref={exhibitionsRef}
          data-section="exhibitions"
          id="exhibitions"
          className="mt-24"
        >
          {exhibitions.length > 0 && (
            <div>
              <h2 className="text-sm font-light text-neutral-900 mb-6">
                Exhibitions
              </h2>
              <div className="space-y-4">
                {exhibitions.map((exhibition) => (
                  <Link
                    key={exhibition._id}
                    href={`/exhibitions/${exhibition.slug}`}
                    className="block group"
                  >
                    <p className="font-light text-neutral-900 group-hover:underline">
                      {exhibition.exhibitionName}
                    </p>
                    <p className="text-sm font-light text-neutral-600">
                      {formatDate(exhibition.startDate)} -{" "}
                      {formatDate(exhibition.endDate)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
