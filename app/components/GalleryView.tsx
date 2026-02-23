"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "gallery-prev-index";

export type GalleryImage = {
  url: string;
  caption?: string;
};

type Props = {
  images: GalleryImage[];
  currentIndex: number;
  basePath: string;
  backHref: string;
  backLabel?: string;
  alt?: string;
};

export default function GalleryView({
  images,
  currentIndex,
  basePath,
  backHref,
  backLabel,
  alt = "",
}: Props) {
  const router = useRouter();
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null
  );

  useEffect(() => {
    const stored = sessionStorage.getItem(`${STORAGE_KEY}-${basePath}`);
    const prevIndex = stored !== null ? parseInt(stored, 10) : null;
    if (prevIndex !== null && prevIndex !== currentIndex) {
      setSlideDirection(currentIndex > prevIndex ? "right" : "left");
    }
    sessionStorage.setItem(`${STORAGE_KEY}-${basePath}`, String(currentIndex));
  }, [currentIndex, basePath]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push(backHref);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, backHref]);

  if (images.length === 0) return null;

  const current = images[currentIndex];
  if (!current) return null;

  const prevIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;
  const hasPrev = prevIndex >= 0;
  const hasNext = nextIndex < images.length;

  const navBar = (
    <div className="w-full bg:transparent flex justify-between items-center md:mt-2 fixed bottom-2 left-0 right-0 px-3 py-4 bg-neutral-50 md:static md:px-0 md:py-0 bg-transparent">
      <div className="min-w-[5rem]">
        {hasPrev ? (
          <Link
            href={`${basePath}/${prevIndex}`}
            className="text-md text-neutral-900 hover:text-neutral-600 bg-transparent"
          >
            Previous
          </Link>
        ) : backLabel ? (
          <Link
            href={backHref}
            className="text-md text-neutral-900 hover:text-neutral-600 bg-transparent"
          >
            {backLabel}
          </Link>
        ) : (
          <span className="text-md text-neutral-400 bg-transparent">Previous</span>
        )}
      </div>
      <div className="min-w-[5rem] text-right">
        {hasNext ? (
          <Link
            href={`${basePath}/${nextIndex}`}
            className="text-md text-neutral-900 hover:text-neutral-600 bg-transparent"
          >
            Next
          </Link>
        ) : (
          <span className="text-md text-neutral-400 bg-transparent">Next</span>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-neutral-50 lg:pt-25 pt-30 px-2 md:px-10 md:pb-16 cursor-default overflow-hidden"
      onClick={() => router.push(backHref)}
      aria-label="Close gallery (click outside or press Escape)"
        
    >
      <div
        className="max-w-4xl mx-auto flex flex-col items-center w-full cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex flex-col items-center">
          {/* Top-right Close button */}
          <div className="w-full flex justify-end mb-4 md:mb-6">
            <button
              type="button"
              onClick={() => router.push(backHref)}
              className="text-md text-neutral-900 hover:text-neutral-600"
            >
              Close
            </button>
          </div>

          <div className="relative w-full h-[60vh] md:h-auto md:aspect-[4/3] overflow-hidden bg-neutral-50 mb-0">
            <div
              key={currentIndex}
              className={`absolute inset-0 ${slideDirection === "right" ? "animate-slide-in-right" : slideDirection === "left" ? "animate-slide-in-left" : ""}`}
            >
              <Image
                src={current.url}
                alt={alt || current.caption || "Gallery image"}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {(current.caption ?? "").trim() && (
            <p className="w-full mt-5 md:mt-5 mb-5 text-md font-medium text-neutral-900 text-center md:mb-5">
              {current.caption}
            </p>
          )}

          {navBar}
        </div>
      </div>
    </div>
  );
}
