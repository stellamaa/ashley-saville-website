"use client";

import Link from "next/link";

type Props = {
  hasWorks: boolean;
};

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function ExhibitionMobileNav({ hasWorks }: Props) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between gap-4 bg-white px-6 py-4 lg:hidden"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 1rem)" }}
    >
      <button
        type="button"
        onClick={() => scrollTo("text")}
        className="text-sm font-medium text-neutral-900"
      >
        Text
      </button>
      {hasWorks && (
        <button
          type="button"
          onClick={() => scrollTo("works")}
          className="text-sm font-medium text-neutral-900"
        >
          Works
        </button>
      )}
      <Link
        href="/exhibitions/archive"
        className="text-sm font-medium text-neutral-900"
      >
        Archive
      </Link>
    </nav>
  );
}
