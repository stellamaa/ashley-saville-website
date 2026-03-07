import type { Metadata } from "next";
import { getArchivedExhibitions, getCurrentExhibition } from "@/sanity/sanity-utils";
import { Exhibition } from "@/types/exhibition";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/app/components/Reveal";
import ExhibitionArchiveMobileNav from "./ExhibitionArchiveMobileNav";

function formatDateRange(startStr: string, endStr: string): string {
  if (!startStr || !endStr) return "";
  const formatPart = (dateStr: string, includeYear: boolean) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-GB", { month: "long" });
    return includeYear ? `${day} ${month} ${date.getFullYear()}` : `${day} ${month}`;
  };
  return `${formatPart(startStr, false)} - ${formatPart(endStr, true)}`;
}

export const metadata: Metadata = {
  title: "Exhibition Archive | Ashley Saville",
  description: "Archive of past exhibitions at Ashley Saville. Contemporary art gallery in London.",
};

export default async function ExhibitionsArchivePage() {
  const [archivedExhibitions, currentExhibition] = await Promise.all([
    getArchivedExhibitions(),
    getCurrentExhibition(),
  ]);

  return (
    <div className="min-h-screen bg-white lg:pt-4 px-6 md:px-10 pb-24 lg:pb-16">
      <div className="max-w-4xl mx-auto">
     

        <h1 className="text-md text-neutral-900 text-center mb-16 mt-11">Archive</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {archivedExhibitions.map((exhibition: Exhibition, idx) => {
            const displayName =
              (exhibition.artistNames?.length
                ? exhibition.artistNames.join(", ")
                : exhibition.artistName) || exhibition.exhibitionName;
            return exhibition.image ? (
              <Reveal key={exhibition._id} delay={idx * 50}>
              <div className="flex flex-col">
                <Link
                  href={`/exhibitions/${exhibition.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden bg-neutral-200"
                >
                  <Image
                    src={exhibition.image}
                    alt={displayName}
                    fill
                    className="object-cover"
                  />
                  {/* Desktop hover overlay */}
                  <div className="absolute inset-0 bg-white/0 lg:group-hover:bg-white/70 transition flex items-center justify-center p-6">
                    <div className="text-black text-center opacity-0 lg:group-hover:opacity-100 transition">
                      <p className="text-sm font-medium uppercase">{exhibition.exhibitionName}</p>
                      <p className="text-sm font-medium">{displayName}</p>
                      <p className="text-sm text-black/90 font-medium">
                        {formatDateRange(exhibition.startDate, exhibition.endDate)}
                      </p>
                    </div>
                  </div>
                </Link>
                {/* Mobile: Name and date below image */}
                <div className="lg:hidden mt-2 text-center">
                  <p className="text-sm text-neutral-900 uppercase">{exhibition.exhibitionName}</p>
                  <p className="text-sm text-neutral-900 mb-0">{displayName}</p>
                  <p className="text-sm text-neutral-900">
                    {formatDateRange(exhibition.startDate, exhibition.endDate)}
                  </p>
                </div>
              </div>
              </Reveal>
            ) : null;
          })}
          
        </div>
        <Link
          href="/exhibitions"
          className="mb-0 inline-block text-sm text-white lg:text-neutral-900 hover:text-neutral-600 lg:mt-10"
        >
          Current exhibition
        </Link>
      </div>
      
      <ExhibitionArchiveMobileNav currentExhibitionSlug={currentExhibition?.slug ?? null} />
    </div>
  );
}
