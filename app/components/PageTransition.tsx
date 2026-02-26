"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const FADE_OUT_MS = 400;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const prevPathnameRef = useRef(pathname);
  const isGalleryRoute =
    pathname?.includes("/exhibition/") ||
    pathname?.includes("/works/") ||
    pathname?.includes("/fair/");
  const skipTransition = pathname?.startsWith("/admin") || isGalleryRoute;

  // Fade in on pathname change (new page)
  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname;
      setIsFadingOut(false);
      setIsReady(false);
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsReady(true));
      });
      return () => cancelAnimationFrame(t);
    }
    // Initial mount
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsReady(true));
    });
    return () => cancelAnimationFrame(t);
  }, [pathname]);

  // Listen for logo-triggered navigation (Header dispatches this)
  useEffect(() => {
    const handleTransitionNavigate = () => setIsFadingOut(true);
    const handleFadeIn = () => {
      setIsFadingOut(false);
      setIsReady(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsReady(true));
      });
    };
    window.addEventListener("page-transition-navigate", handleTransitionNavigate);
    window.addEventListener("page-transition-fade-in", handleFadeIn);
    return () => {
      window.removeEventListener("page-transition-navigate", handleTransitionNavigate);
      window.removeEventListener("page-transition-fade-in", handleFadeIn);
    };
  }, []);

  // Intercept internal link clicks: fade out, then navigate
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // Allow new tab, etc.
      const target = (e.target as Element).closest("a");
      if (!target?.href) return;
      if (target.hasAttribute("data-logo-link")) return; // Logo uses its own handler
      try {
        const url = new URL(target.href);
        if (url.origin !== window.location.origin) return;
        if (target.target === "_blank" || target.hasAttribute("download")) return;
        const isGalleryTarget =
          url.pathname.includes("/exhibition/") ||
          url.pathname.includes("/works/") ||
          url.pathname.includes("/fair/");
        if (isGalleryTarget) return; // Don't fade when opening gallery
        if (url.pathname === pathname) return;
        const isNavigatingToHome = url.pathname === "/" || url.pathname === "";
        if (isNavigatingToHome) {
          sessionStorage.setItem("skip-landing-flash", "1"); // Logo/nav to home: show landing without flash
        }
        e.preventDefault();
        setIsFadingOut(true);
        setTimeout(() => {
          router.push(url.pathname + url.search);
        }, FADE_OUT_MS);
      } catch {
        // Invalid URL, let default behavior handle it
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname, router]);

  if (skipTransition) {
    return <div className="min-h-screen">{children}</div>;
  }

  const fadeOut = isFadingOut ? "animate-page-fade-out" : "";
  const fadeIn = isReady && !isFadingOut ? "animate-page-fade-in" : "opacity-0";

  return (
    <div className={`min-h-screen bg-[var(--color-neutral-white)] ${fadeOut} ${fadeIn}`}>
      {children}
    </div>
  );
}
