import { getCurrentExhibition } from "@/sanity/sanity-utils";
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

        <div className="relative z-10 flex min-h-screen flex-col items-center px-6 py-24">
          <div className="flex-1 min-h-[1px]" />
        
          <div className="flex-1 min-h-[1px]" />
          <div className="flex flex-col items-start gap-0 text-right pb-8 md:absolute md:bottom-12 md:right-15 md:pb-0 font-medium text-base">
          <h2 className="text-center text-1xl font-medium tracking-wide text-white md:text-4xl lg:text-xl">
            {exhibition.artistName}
          </h2>
            <p className=" text-white/95">
              {exhibition.exhibitionName}
            </p>
            <p className="text-white/90">
              {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
            </p>
            <Link
              href={`/exhibitions/${exhibition.slug}`}
              className="mt-0 text-sm text-white underline underline decoration-0 underline underline-offset-4 hover:text-white/90"
            >
              Find out more
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
