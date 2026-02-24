"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

function formatDateDDMMYYYY(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}`;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
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

const FLASH_START_MS = 800;
const FLASH_INTERVAL_MS = 300;
const NAVIGATED_FROM_LANDING_KEY = "ashley-saville-navigated-from-landing";

export default function LandingHero({
  image,
  alt,
  exhibitionName,
  artistName,
  artistSlug,
  startDate,
  endDate,
  slug,
  worksImages = [],
}: LandingHeroProps) {
  const worksUrls = useMemo(
    () => worksImages.map((w) => w.url).filter(Boolean),
    [worksImages]
  );

  const [flashImages, setFlashImages] = useState<string[]>([]);
  const [displayImage, setDisplayImage] = useState<string>(image);
  const [phase, setPhase] = useState<"delay" | "flash" | "landing">("delay");
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(NAVIGATED_FROM_LANDING_KEY)) {
      sessionStorage.removeItem(NAVIGATED_FROM_LANDING_KEY);
      setSkipAnimation(true);
      setDisplayImage(image);
      setPhase("landing");
    }
  }, [image]);

  useEffect(() => {
    if (skipAnimation) return;
    if (worksUrls.length === 0) {
      setDisplayImage(image);
      setPhase("landing");
      return;
    }
    const four = shuffle(worksUrls).slice(0, 4);
    setFlashImages([...four, image]);
  }, [worksUrls, image, skipAnimation]);

  useEffect(() => {
    if (skipAnimation || flashImages.length === 0) return;

    setDisplayImage(flashImages[0]);

    const t0 = setTimeout(() => setPhase("flash"), FLASH_START_MS);

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i < flashImages.length; i++) {
      timers.push(
        setTimeout(() => setDisplayImage(flashImages[i]), FLASH_START_MS + i * FLASH_INTERVAL_MS)
      );
    }

    const landingIndex = flashImages.length - 1;
    const landingShowMs = FLASH_START_MS + landingIndex * FLASH_INTERVAL_MS;
    const tLanding = setTimeout(() => setPhase("landing"), landingShowMs);

    return () => {
      clearTimeout(t0);
      timers.forEach(clearTimeout);
      clearTimeout(tLanding);
    };
  }, [flashImages, image, skipAnimation]);

  const currentSrc = displayImage;

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen w-full overflow-hidden bg-white">
        <div
          className={skipAnimation ? "absolute inset-0" : "absolute inset-0 animate-landing-expand"}
          style={{
            transformOrigin: "center center",
            ...(skipAnimation && { transform: "scale(1)", opacity: 1 }),
          }}
        >
          <Image
              key={currentSrc}
              src={currentSrc}
              alt={alt}
              fill
              className={`object-cover ${skipAnimation ? "" : "animate-flash-in"}`}
              sizes="100vw"
              priority
            />
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
              href={`/exhibitions/${slug}`}
              className="mt-0 text-sm text-white underline underline decoration-0 underline underline-offset-2 hover:text-white/90"
            >
              Find out more
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
