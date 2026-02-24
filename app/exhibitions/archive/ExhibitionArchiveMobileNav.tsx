"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  currentExhibitionSlug: string | null;
};

/** Only show on exhibitions archive page, mobile only. */
function isArchivePage(pathname: string | null): boolean {
  return pathname === "/exhibitions/archive";
}

export default function ExhibitionArchiveMobileNav({
  currentExhibitionSlug,
}: Props) {
  const pathname = usePathname();
  if (!isArchivePage(pathname)) return null;

  const currentHref = currentExhibitionSlug
    ? `/exhibitions/${currentExhibitionSlug}`
    : "/exhibitions";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between bg-white px-6 py-4 lg:hidden border-t border-neutral-300"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0rem)" }}
    >
      <Link
        href={currentHref}
        className="text-sm font-medium text-neutral-900 hover:text-neutral-600"
      >
        Current Exhibition
      </Link>
      <span className="text-sm font-medium text-neutral-900 underline underline-offset-3">
        Archive
      </span>
    </nav>
  );
}
