import { getExhibitionBySlug, getArtistSlugByName } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadMore from "@/app/components/ReadMore";
import ExhibitionNavigation from "./ExhibitionNavigation";
import ExhibitionDocuments from "./ExhibitionDocuments";
import ExhibitionMobileNav from "./ExhibitionMobileNav";
import Reveal from "@/app/components/Reveal";

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

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ExhibitionPage({ params }: Props) {
  const { slug } = await params;
  const exhibition = await getExhibitionBySlug(slug);

  if (!exhibition) {
    notFound();
  }

  const artistSlug = await getArtistSlugByName(exhibition.artistName);

  return (
    <div className="min-h-screen bg-transparent lg:pt-10 pt-19 px-5 md:px-10 pb-24 lg:pb-16">
      <div className="max-w-4xl mx-auto">
       
        <Reveal>
        <h1 className="text-1xl text-neutral-800 text-base text-center sm:mt-17 mt-3 mb-5 lg:mb-16 ">
          {exhibition.isCurrent ? `${exhibition.exhibitionName}` : `${exhibition.exhibitionName}`}
        </h1>
        
    
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-16">
          <div id="text" className="lg:col-span-2 scroll-mt-32 text-justify">
            <p className="text-md text-neutral-800 mt-0 uppercase"></p>
            <h2 className="text-sm md:text-base mb-0 mt-0 text-neutral-800 ">
              {artistSlug ? (
                <Link href={`/artists/${artistSlug}`} className="hover:underline">
                  {exhibition.artistName}
                </Link>
              ) : (
                exhibition.artistName
              )}
            </h2>
            <p className="text-sm md:text-base text-neutral-800 mt-0 mb-6">
              {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
            </p>
            {exhibition.content && exhibition.content.length > 0 && (
              <div className="mt-3 text-sm md:text-base leading-snug">
                <ReadMore content={exhibition.content} />
              </div>
            )}
          </div>
          {/* Sidebar: sticky nav + documents, spans text + image rows so nav follows scroll until gallery */}
          <div className={`lg:col-span-1 lg:text-right hidden lg:flex flex-col ${exhibition.image ? "lg:row-span-2" : ""}`}>
            <div className="sticky top-3 flex flex-col items-start lg:items-end justify-between w-full pt-0 lg:pt-[3rem]">
              {(exhibition.exhibitionImages?.length > 0 || exhibition.worksImages?.length > 0) && (
                <div>
                  <ExhibitionNavigation
                    hasInstallations={exhibition.exhibitionImages?.length > 0}
                    hasWorks={exhibition.worksImages?.length > 0}
                  />
                </div>
              )}
              {(exhibition.download || exhibition.pressRelease || exhibition.pressLinks?.some(link => link.url)) && (
                <div className="mt-6">
                  <ExhibitionDocuments
                    download={exhibition.download}
                    pressRelease={exhibition.pressRelease}
                    pressLinks={exhibition.pressLinks}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Documents above image */}
          {(exhibition.download || exhibition.pressRelease || exhibition.pressLinks?.some(link => link.url)) && (
            <div className="lg:col-span-3 lg:hidden mb-5">
              <ExhibitionDocuments
                download={exhibition.download}
                pressRelease={exhibition.pressRelease}
                pressLinks={exhibition.pressLinks}
              />
            </div>
          )}

          {/* Image: row 2 on desktop, sidebar spans this row too */}
          {exhibition.image && (
            <div className="lg:col-span-3 lg:mb-0 mt-5">
              <Link
                href={`/exhibitions/${slug}/exhibition/0`}
                className="block relative md:aspect-[16/9] aspect-[4/3] w-full overflow-hidden"
              >
                <Image
                  src={exhibition.image}
                  alt={exhibition.artistName}
                  fill
                  className="object-cover"
                />
              </Link>
              {exhibition.imageCaption && (
                <p className="block text-sm text-neutral-800 mt-2 text-center">
                  {exhibition.imageCaption}
                </p>
              )}
            </div>
          )}
        </div>
        
        {exhibition.exhibitionImages &&
          exhibition.exhibitionImages.length > 0 && (
            <h3
              id="installations"
              className="text-md justify-center text-center font-medium text-neutral-900 mt-20 scroll-mt-32"
            >
              Installations
            </h3>
          )}
        {exhibition.exhibitionImages &&
          exhibition.exhibitionImages.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-20 items-center justify-center">
              {exhibition.exhibitionImages.map((item, idx) => (
                <Link
                  key={idx}
                  href={`/exhibitions/${slug}/exhibition/${exhibition.image ? idx + 1 : idx}`}
                >
                  <Image
                    src={item.url}
                    alt={exhibition.artistName}
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
              className="text-md justify-center text-center font-medium text-neutral-900 mt-20 scroll-mt-32"
            >
              Works
            </h3>
          </>
        )}
        {exhibition.worksImages && exhibition.worksImages.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10 mt-20 items-center justify-center">
            {exhibition.worksImages.map((item, idx) => (
              <Link
                key={idx}
                href={`/exhibitions/${slug}/works/${idx}`}
              >
                <Image
                  src={item.url}
                  alt={exhibition.artistName}
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
