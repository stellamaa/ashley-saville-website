"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
  }, [isClosing]);

  const handleAnimationEnd = useCallback(
    (e: React.AnimationEvent) => {
      if (isClosing && e.animationName.includes("gallery-slide-down")) {
        router.push(backHref);
      }
    },
    [isClosing, backHref, router]
  );

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollToTop();
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTop);
    });
  }, []);

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
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  if (images.length === 0) return null;

  const current = images[currentIndex];
  if (!current) return null;

  const prevIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;
  const hasPrev = prevIndex >= 0;
  const hasNext = nextIndex < images.length;

  const navBar = (
    <div className="w-full flex-shrink-0 flex flex-col items-center md:mt-2 fixed bottom-2 left-0 right-0 px-4 py-2 md:static md:py-0 overflow-hidden z-10">
      <div className="flex justify-between items-center w-full max-w-4xl">
        <div className="overflow-hidden">
          {hasPrev ? (
            <Link
              href={`${basePath}/${prevIndex}`}
              className="text-md text-neutral-900 hover:text-neutral-600 bg-transparent transition-colors duration-150 ease-out"
            >
              Previous
            </Link>
          ) : backLabel ? (
            <Link
              href={backHref}
              className="text-md text-neutral-900 hover:text-neutral-600 bg-transparent transition-colors duration-150 ease-out"
            >
              {backLabel}
            </Link>
          ) : (
            <span className="text-md text-neutral-400 bg-transparent">Previous</span>
          )}
        </div>
        <div>
          {hasNext ? (
            <Link
              href={`${basePath}/${nextIndex}`}
              className="text-md text-neutral-900 hover:text-neutral-600 bg-transparent transition-colors duration-150 ease-out"
            >
              Next
            </Link>
          ) : (
            <span className="text-md text-neutral-400 bg-transparent">Next</span>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => router.push(backHref)}
        className="text-md text-neutral-900 hover:text-neutral-600 transition-colors duration-150 ease-out mt-2"
      >
        Close
      </button>
    </div>
  );

  return (
    <div
      className="h-dvh md:h-screen md:min-h-0 bg-neutral-white pt-4 lg:pt-20 px-4 md:px-10 pb-24 md:pb-16 cursor-default overflow-hidden"
      onClick={() => router.push(backHref)}
      aria-label="Close gallery (click outside or press Escape)"
    >
      <div
        className="h-full md:min-h-0 max-w-4xl mx-auto flex flex-col items-center w-full cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 min-h-0 w-full flex flex-col items-center justify-start md:flex-1 md:min-h-0">
          <div className="relative w-full h-[55vh] min-h-0 md:mt-auto md:max-h-[calc(100vh-14rem)] md:h-[60vh] overflow-hidden bg-neutral-white">
            <div
              key={currentIndex}
              className={`absolute inset-0 ${slideDirection ? "animate-gallery-fade" : ""}`}
            >
              <Image
                src={current.url}
                alt={alt || current.caption || "Gallery image"}
                fill
                className="object-contain md:object-bottom"
                loading="eager"
              />
            </div>
          </div>

          {(current.caption ?? "").trim() && (
            <p className="gallery-mobile-caption mobile-bottom-nav flex-shrink-0 mt-1 px-4 z-20 text-sm font-medium text-neutral-900 text-center md:w-full md:mt-3 md:mb-5 md:px-0">
              {current.caption}
            </p>
          )}

          {navBar}
        </div>
      </div>
    </div>
  );
}
