import type { Metadata } from "next";
import { getExhibitionBySlug, getArtistSlugsByNames } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadMore from "@/app/components/ReadMore";
import ExhibitionNavigation from "./ExhibitionNavigation";
import ExhibitionDocuments from "./ExhibitionDocuments";
import ExhibitionMobileNav from "./ExhibitionMobileNav";
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

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exhibition = await getExhibitionBySlug(slug);
  if (!exhibition) return {};
  const artistNames = (exhibition.artistNames?.length ? exhibition.artistNames : exhibition.artistName ? [exhibition.artistName] : []) as string[];
  const displayName = artistNames.join(", ") || exhibition.artistName || "";
  return {
    title: `${exhibition.exhibitionName}${displayName ? ` — ${displayName}` : ""} | Ashley Saville`,
    description: `${exhibition.exhibitionName}${displayName ? ` by ${displayName}` : ""}. Ashley Saville — contemporary art gallery in London.`,
  };
}

export default async function ExhibitionPage({ params }: Props) {
  const { slug } = await params;
  const exhibition = await getExhibitionBySlug(slug);

  if (!exhibition) {
    notFound();
  }

  const artistNames = (exhibition.artistNames?.length
    ? exhibition.artistNames
    : exhibition.artistName
      ? [exhibition.artistName]
      : []) as string[];
  const artistSlugs = await getArtistSlugsByNames(artistNames);
  const displayName = artistNames.join(", ") || exhibition.artistName || "";

  return (
    <div className="min-h-screen bg-transparent lg:pt-11 pt-9 px-5 md:px-10 pb-24 lg:pb-16">
      <div className="max-w-4xl mx-auto">

        <Reveal>
          <h1 className="text-1xl text-neutral-800 text-base text-left font-bold sm:mt-20 mt-3 mb-0 md:mb-5">
            {exhibition.exhibitionName}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-16">
              <div id="text" className="lg:col-span-2 lg:max-w-lg scroll-mt-32 text-left">
                <p className="text-md text-neutral-800 mt-0 uppercase"></p>
                <h2 className="text-base mb-0 mt-0 text-neutral-800 ">
                  {artistNames.length > 0 ? (
                    artistNames.map((name, i) => {
                      const slug = artistSlugs[name];
                      const sep = i < artistNames.length - 1 ? ", " : "";
                      return slug ? (
                        <span key={name}>
                          <Link href={`/artists/${slug}`} className="hover:text-neutral-600">
                            {name}
                          </Link>
                          {sep}
                        </span>
                      ) : (
                        <span key={name}>{name}{sep}</span>
                      );
                    })
                  ) : (
                    displayName
                  )}
                </h2>
                <p className="text-base text-neutral-800 mt-0 mb-6">
                  {formatDateRange(exhibition.startDate, exhibition.endDate)}
                </p>
                {exhibition.content && exhibition.content.length > 0 && (
                  <div className="mt-3 text-base md:text-base leading-snug">
                    <ReadMore content={exhibition.content} />
                  </div>
                )}
                <div className="mt-4 flex flex-col gap-1">
                  <Link href="mailto:ashley@ashleysaville.com" className="text underline decoration-1 underline-offset-2 hover:text-neutral-600">
                    Enquire about available works
                  </Link>
                  {exhibition.pressRelease && (
                    <a href={exhibition.pressRelease} target="_blank" rel="noopener noreferrer" className="text underline decoration-1 underline-offset-2 hover:text-neutral-600">
                      Download Press Release
                    </a>
                  )}
                  {exhibition.download && (
                    <a href={exhibition.download} target="_blank" rel="noopener noreferrer" className="text underline decoration-1 underline-offset-2 hover:text-neutral-600">
                      Download
                    </a>
                  )}
                </div>
              </div>
              {/* Sidebar: sticky  + documents, spans text + image rows so nav follows scroll until gallery */}
              <div className={`lg:col-span-1 lg:text-right hidden lg:flex flex-col ${exhibition.mainImage ? "lg:row-span-2" : ""}`}>
                <div className="sticky top-3 flex flex-col items-start lg:items-end justify-between w-full pt-0 lg:pt-[3rem]">
                  {(exhibition.exhibitionImages?.length > 0 || exhibition.worksImages?.length > 0) && (
                    <div>
                      <ExhibitionNavigation
                        hasInstallations={exhibition.exhibitionImages?.length > 0}
                        hasWorks={exhibition.worksImages?.length > 0}
                      />
                    </div>
                  )}
                  {exhibition.pressLinks?.some(link => link.url) && (
                    <div className="mt-6">
                      <ExhibitionDocuments pressLinks={exhibition.pressLinks} />
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile: Documents above image */}
              {exhibition.pressLinks?.some(link => link.url) && (
                <div className="lg:col-span-3 lg:hidden mb-5">
                  <ExhibitionDocuments pressLinks={exhibition.pressLinks} />
                </div>
              )}

              {/* Image: row 2 on desktop, sidebar spans this row too */}
              {exhibition.mainImage && (
                <div className="lg:col-span-3 mt-5 lg:mt-9 lg:mb-10">
                  <Link
                    href={`/exhibitions/${slug}/exhibition/0`}
                    className="block relative aspect-[6/4] w-full overflow-hidden"
                  >
                    <Image
                      src={exhibition.mainImage}
                      alt={displayName}
                      fill
                      className="object-cover"
                    />
                  </Link>

                </div>
              )}
            </div>

            {exhibition.exhibitionImages &&
              exhibition.exhibitionImages.length > 0 && (
                <h3
                  id="installations"
                  className="text-md justify-center text-center font-bold text-neutral-900 mt-10 scroll-mt-32"
                >
                  Installations
                </h3>
              )}
            {exhibition.exhibitionImages &&
              exhibition.exhibitionImages.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-8 items-center justify-center">
                  {exhibition.exhibitionImages.map((item, idx) => (
                    <Link
                      key={idx}
                      href={`/exhibitions/${slug}/exhibition/${exhibition.image ? idx + 1 : idx}`}
                    >
                      <Image
                        src={item.url}
                        alt={displayName}
                        width={500}
                        height={500}
                      />
                    </Link>

                  ))}
                </div>
              )}
            {exhibition.worksImages && exhibition.worksImages.length > 0 && (
              <>
                {" "}
                <h3
                  id="works"
                  className="text-md justify-center text-center font-bold text-neutral-900 mt-10 scroll-mt-32"
                >
                  Works
                </h3>
              </>
            )}
            {exhibition.worksImages && exhibition.worksImages.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-10 mt-8 items-center justify-center">
                {exhibition.worksImages.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/exhibitions/${slug}/works/${idx}`}
                  >
                    <Image
                      src={item.url}
                      alt={displayName}
                      width={500}
                      height={500}
                      className="flex items-center justify-center"
                    />
                  </Link>
                ))}
              </div>
            )}
        </Reveal>
      </div>
      
      <ExhibitionMobileNav hasWorks={(exhibition.worksImages?.length ?? 0) > 0} />
    </div>
  );
}

