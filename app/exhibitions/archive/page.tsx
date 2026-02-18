import { getArchivedExhibitions } from "@/sanity/sanity-utils";
import { Exhibition } from "@/types/exhibition";
import Image from "next/image";
import Link from "next/link";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "long" });
  const year = date.getFullYear();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? ""
      : day === 2 || day === 22
        ? ""
        : day === 3 || day === 23
          ? ""
          : "";
  return `${day}${suffix} of ${month} ${year}`;
}

export default async function ExhibitionsArchivePage() {
  const archivedExhibitions = await getArchivedExhibitions();

  return (
    <div className="min-h-screen bg-white pt-18 px-6 md:px-10 pb-16">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/exhibitions"
          className="mb-8 inline-block text-sm text-neutral-900 hover:text-neutral-600"
        >
          Current exhibition
        </Link>

        <h1 className="text-md text-neutral-900 text-center mb-16">Archive</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {archivedExhibitions.map((exhibition: Exhibition) =>
            exhibition.image ? (
              <div key={exhibition._id} className="flex flex-col">
                <Link
                  href={`/exhibitions/${exhibition.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden bg-neutral-200"
                >
                  <Image
                    src={exhibition.image}
                    alt={exhibition.artistName}
                    fill
                    className="object-cover"
                  />
                  {/* Desktop hover overlay */}
                  <div className="absolute inset-0 bg-white/0 lg:group-hover:bg-white/70 transition flex items-center justify-center p-6">
                    <div className="text-black text-center opacity-0 lg:group-hover:opacity-100 transition">
                      <p className="text-sm font-medium">{exhibition.artistName}</p>
                      <p className="text-sm text-black/90 font-medium">
                        {formatDate(exhibition.startDate)} -{" "}
                        {formatDate(exhibition.endDate)}
                      </p>
                    </div>
                  </div>
                </Link>
                {/* Mobile: Name and date below image */}
                <div className="lg:hidden mt-2 text-center">
                  <p className="text-sm font-medium text-neutral-900">{exhibition.artistName}</p>
                  <p className="text-sm text-neutral-600">
                    {formatDate(exhibition.startDate)} -{" "}
                    {formatDate(exhibition.endDate)}
                  </p>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
