import { getExhibitionBySlug } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadMore from "@/app/components/ReadMore";
import ExhibitionNavigation from "./ExhibitionNavigation";
import ExhibitionDocuments from "./ExhibitionDocuments";

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

  return (
    <div className="min-h-screen bg-neutral-50 pt-17 px-6 md:px-10 pb-16">
      <div className="max-w-4xl mx-auto">
       
        <h1 className="text-1xl text-neutral-800 font-medium text-center mt-5 sm:mt-17 mb-3 lg:mb-16">
          {exhibition.isCurrent ? "Current Exhibition" : "Archive"}
        </h1>
        {/* Mobile: Archive link and Navigation */}
        <div className="lg:hidden mb-5">
          {exhibition.isCurrent && (
            <div className="mb-4 text-right">
              <Link
                href="/exhibitions/archive"
                className="text-sm text-neutral-600 hover:text-neutral-900 inline-block"
              >
                Archive
              </Link>
            </div>
          )}
          {/* Mobile Navigation - only show if there are sections to navigate */}
          {(exhibition.exhibitionImages?.length > 0 || exhibition.worksImages?.length > 0) && (
            <ExhibitionNavigation 
              hasInstallations={exhibition.exhibitionImages?.length > 0}
              hasWorks={exhibition.worksImages?.length > 0}
            />
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-16">
          <div id="text" className="lg:col-span-2 scroll-mt-32 text-justify">
          <p className="text-md text-neutral-900 mt-0 uppercase">
              {exhibition.exhibitionName}
            </p>
            <h2 className="text-md font-md mb-2 mt-0 text-neutral-900 ">
              {exhibition.artistName}
            </h2>
          
            <p className="text-md text-neutral-900 mt-0 mb-8">
              {formatDate(exhibition.startDate)} -{" "}
              {formatDate(exhibition.endDate)}
            </p>
            {exhibition.content && exhibition.content.length > 0 && (
              <div className="mt-3 text-md">
                <ReadMore content={exhibition.content} />
              </div>
            )}
          </div>
          <div className="lg:col-span-1 lg:text-right">
            <div className="sticky top-32 flex flex-col items-start lg:items-end gap-7 hidden lg:flex">
              {/* Desktop Navigation - only show if there are sections to navigate */}
              {(exhibition.exhibitionImages?.length > 0 || exhibition.worksImages?.length > 0) && (
                <div className="mt-3">
                  <ExhibitionNavigation 
                    hasInstallations={exhibition.exhibitionImages?.length > 0}
                    hasWorks={exhibition.worksImages?.length > 0}
                  />
                </div>
              )}
              {/* Desktop Documents - only render if populated, always at bottom */}
              {(exhibition.download || exhibition.pressRelease || exhibition.pressLinks?.some(link => link.url)) && (
                <div className="mt-auto">
                  <ExhibitionDocuments
                    download={exhibition.download}
                    pressRelease={exhibition.pressRelease}
                    pressLinks={exhibition.pressLinks}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Documents above image - only render if populated */}
          {(exhibition.download || exhibition.pressRelease || exhibition.pressLinks?.some(link => link.url)) && (
            <div className="lg:col-span-3 lg:hidden mb-5">
              <ExhibitionDocuments
                download={exhibition.download}
                pressRelease={exhibition.pressRelease}
                pressLinks={exhibition.pressLinks}
              />
            </div>
          )}

          {exhibition.image && (
            <Link
              href={`/exhibitions/${slug}/exhibition/0`}
              className="lg:col-span-3 mt-5 block relative aspect-[4/3] w-full overflow-hidden bg-neutral-200"
            >
              <Image
                src={exhibition.image}
                alt={exhibition.artistName}
                fill
                className="object-cover"
              />
            </Link>
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
              <>
                <Link key={idx} href={`/exhibitions/${slug}/works/${idx}`}>
                  <Image
                    src={item.url}
                    alt={exhibition.artistName}
                    width={500}
                    height={500}
                    className="flex items-center justify-center"
                  />
                </Link>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
