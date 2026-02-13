"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FairNavigation() {
  const pathname = usePathname();
  const isArchivePage = pathname?.includes("/fairs/archive");

  return (
    <nav className="flex flex-col gap-1">
      <Link
        href="/fairs/archive"
        className={`text-sm ${
          isArchivePage
            ? "text-neutral-900 font-medium"
            : "text-neutral-900 hover:text-neutral-600"
        }`}
      >
        Archive
      </Link>
    </nav>
  );
}
