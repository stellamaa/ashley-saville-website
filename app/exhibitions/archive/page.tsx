import { getArchivedExhibitions } from "@/sanity/sanity-utils";
import { Exhibition } from "@/types/exhibition";
import Image from "next/image";
import Link from "next/link";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "long" });
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
          ? "rd"
          : "th";
  return `${day}${suffix} of ${month}`;
}

export default async function ExhibitionsArchivePage() {
  const archivedExhibitions = await getArchivedExhibitions();

  return (
    <div className="min-h-screen bg-neutral-800 pt-24 px-6 md:px-10 pb-16">
      <div className="max-w-5xl mx-auto bg-white rounded-lg p-8 md:p-12">
        <Link
          href="/exhibitions"
          className="mb-8 inline-block text-sm underline text-neutral-600 hover:text-neutral-900"
        >
          ← Back to current exhibition
        </Link>

        <h1 className="text-2xl font-medium text-center mb-12">Archive</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {archivedExhibitions.map((exhibition: Exhibition) =>
            exhibition.image ? (
              <Link
                key={exhibition._id}
                href={`/exhibitions/${exhibition.slug}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-200"
              >
                <Image
                  src={exhibition.image}
                  alt={exhibition.artistName}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-end justify-center p-6">
                  <div className="text-white text-center opacity-0 group-hover:opacity-100 transition">
                    <p className="font-medium">{exhibition.artistName}</p>
                    <p className="text-sm text-white/90">
                      {formatDate(exhibition.startDate)} -{" "}
                      {formatDate(exhibition.endDate)}
                    </p>
                  </div>
                </div>
              </Link>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
