import { getArchivedFairs } from "@/sanity/sanity-utils";
import { Fair } from "@/types/fair";
import Image from "next/image";
import Link from "next/link";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "long" });
  const suffix =
    day === 1 || day === 21 || day === 31
      ? ""
      : day === 2 || day === 22
        ? ""
        : day === 3 || day === 23
          ? ""
          : "";
  return `${day}${suffix} of ${month}`;
}

export default async function FairsArchivePage() {
  const archivedFairs = await getArchivedFairs();

  return (
    <div className="min-h-screen bg-white pt-24 px-6 md:px-10 pb-16">
      <div className="max-w-5xl mx-auto bg-white rounded-lg p-8 md:p-12">
        <Link
          href="/fairs"
          className="mb-8 inline-block text-sm  text-neutral-900 hover:text-neutral-600"
        >
          Current fair
        </Link>

        <h1 className="text-md text-neutral-900 text-center mb-12">Archive</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {archivedFairs.map((fair: Fair) =>
            fair.image ? (
              <Link
                key={fair._id}
                href={`/fairs/${fair.slug}`}
                className="group relative aspect-[4/3] overflow-hidden bg-neutral-200"
              >
                <Image
                  src={fair.image}
                  alt={fair.name}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/70 transition flex items-center justify-center p-6">
                  <div className="text-black text-center opacity-0 group-hover:opacity-100 transition">
                    <p className=" text-sm font-medium">{fair.name}</p>
                    <p className="text-sm text-black/90 font-medium">
                      {formatDate(fair.startDate)} -{" "}
                      {formatDate(fair.endDate)}
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
