import { getCurrentExhibition } from "@/sanity/sanity-utils";
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

export default async function Home() {
  const exhibition = await getCurrentExhibition();

  if (!exhibition || !exhibition.image) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500">No current exhibition</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen w-full overflow-hidden">
        <Image
          src={exhibition.image}
          alt={exhibition.artistName}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24">
          <h2 className="text-center text-4xl font-medium tracking-wide text-white md:text-6xl lg:text-7xl">
            {exhibition.artistName}
          </h2>

          <div className="mt-8 flex flex-col items-center gap-1 text-start md:absolute md:bottom-10 md:right-10 md:mt-0 md:items-end md:text-right">
            <p className="text-sm text-white/95">
              &ldquo;{exhibition.exhibitionName}&rdquo;
            </p>
            <p className="text-sm text-white/90">
              {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
            </p>
            <Link
              href={`/exhibitions/${exhibition.slug}`}
              className="mt-2 text-sm text-white underline hover:text-white/90"
            >
              Find out more
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
