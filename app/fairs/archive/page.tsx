import type { Metadata } from "next";
import { getArchivedFairs, getCurrentFair } from "@/sanity/sanity-utils";
import { Fair } from "@/types/fair";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/app/components/Reveal";

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
  title: "Fair Archive | Ashley Saville",
  description: "Archive of past art fairs featuring Ashley Saville. Contemporary art gallery in London.",
};

export default async function FairsArchivePage() {
  const archivedFairs = await getArchivedFairs();
  const currentFair = await getCurrentFair();

  return (
    <div className="min-h-screen bg-white lg:pt--1 px-6 md:px-10 pb-16">
      <div className="max-w-4xl mx-auto">
    

        <h1 className="text-md text-neutral-900 text-center mb-16 lg:mt-32 mt-11">Archive</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {archivedFairs.map((fair: Fair, idx) =>
            fair.image ? (
              <Reveal key={fair._id} delay={idx * 50}>
              <div className="flex flex-col">
                <Link
                  href={`/fairs/${fair.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden bg-neutral-200"
                >
                  <Image
                    src={fair.image}
                    alt={fair.name}
                    fill
                    className="object-cover uppercase"
                  />
                  {/* Desktop hover overlay */}
                  <div className="absolute inset-0 bg-white/0 lg:group-hover:bg-white/70 transition flex items-center justify-center p-6">
                    <div className="text-black text-center opacity-0 lg:group-hover:opacity-100 transition">
                      <p className="text-sm font-medium uppercase">{fair.name}</p>
                      <p className="text-sm text-black/90 font-medium">
                        {formatDateRange(fair.startDate, fair.endDate)}
                      </p>
                    </div>
                  </div>
                </Link>
                {/* Mobile: Name and date below image */}
                <div className="lg:hidden mt-2 mb-2 text-center">
                  <p className="text-sm font-medium text-neutral-900">{fair.name}</p>
                  <p className="text-sm text-neutral-600">
                    {formatDateRange(fair.startDate, fair.endDate)}
                  </p>
                </div>
              </div>
              </Reveal>
            ) : null
          )}
          
        </div>
        {currentFair?.slug && (
          <Link
            href={`/fairs/${currentFair.slug}`}
            className="mb-0 inline-block text-base  text-white lg:text-neutral-900 hover:text-neutral-600 lg:mt-10"
          >
            Current fair
          </Link>
        )}
      </div>
      
    </div>
  );
}
