"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function formatDateDDMMYYYY(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}`;
}

type WorksImage = { url: string; caption?: string };

type LandingHeroProps = {
  image: string;
  alt: string;
  exhibitionName: string;
  artistName: string;
  artistSlug?: string | null;
  startDate: string;
  endDate: string;
  slug: string;
  worksImages?: WorksImage[];
};

const HOLD_DURATION_MS = 3000;

export default function LandingHero({
  image,
  alt,
  exhibitionName,
  artistName,
  artistSlug,
  startDate,
  endDate,
  slug,
}: LandingHeroProps) {
  const [phase, setPhase] = useState<"small" | "expanded">("small");
  const [isMobile, setIsMobile] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("skip-landing-flash")) {
      sessionStorage.removeItem("skip-landing-flash");
      setSkipAnimation(true);
      setPhase("expanded");
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (skipAnimation || isMobile) return;
    const t = setTimeout(() => setPhase("expanded"), HOLD_DURATION_MS);
    return () => clearTimeout(t);
  }, [skipAnimation, isMobile]);

  const exhibitionHref = `/exhibitions/${slug}`;

  const showExpanded = phase === "expanded" || skipAnimation;
  const expandOnDesktop = showExpanded && !isMobile;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <section className="relative min-h-screen w-full overflow-hidden bg-white">
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 transition-all duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              expandOnDesktop ? "scale-100" : "scale-[0.35]"
            }`}
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src={image}
              alt={alt}
              fill
              className={`transition-all duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                expandOnDesktop ? "object-cover" : "object-contain"
              }`}
              sizes="100vw"
              priority
            />
          </div>
        </div>

        <div className="relative z-10 flex min-h-screen flex-col items-center px-6 py-10">
          <div className="flex-1 min-h-[1px]" />
          <div className="flex-1 min-h-[1px]" />
          <div className="flex flex-col items-center gap-0 pb-0 md:absolute md:bottom-12 md:right-15 md:pb-0 text-sm">
            <p className="text-white uppercase">{exhibitionName}</p>
            <h2 className="text-1xl tracking-wide text-white mb-2">
              {artistSlug ? (
                <Link href={`/artists/${artistSlug}`} className="hover:underline">
                  {artistName}
                </Link>
              ) : (
                artistName
              )}
            </h2>
            <p className="text-white">
              {formatDateDDMMYYYY(startDate)} - {formatDateDDMMYYYY(endDate)}
            </p>
            <Link
              href={exhibitionHref}
              className="mt-0 text-sm text-white underline underline decoration-0 underline underline-offset-2 hover:text-white/90"
              prefetch
            >
              Find out more
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
