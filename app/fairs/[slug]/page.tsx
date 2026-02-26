import { getFairBySlug } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadMore from "@/app/components/ReadMore";
import FairDocuments from "./FairDocuments";
import FairNavigation from "./FairNavigation";
import FairMobileNav from "./FairMobileNav";
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
  return `${day}${suffix} ${month} ${year}`;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function FairPage({ params }: Props) {
  const { slug } = await params;
  const fair = await getFairBySlug(slug);

  if (!fair) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-15 px-5 md:px-10 pb-24 lg:pb-16 md:pt-0">
      <div className="max-w-4xl mx-auto">
        {fair.isCurrent && (
          <Link
            href="/fairs/archive"
            className="text-sm  text-neutral-600 hover:text-neutral-900 mb-4 text-white hover:text-white inline-block"
          >
            Archive
          </Link>
        )}
        <Reveal>
        <h1 className="text-1xl text-neutral-800 font-medium text-center mt-0 sm:mt-20 mb-10 ">
          {fair.name}
        </h1>
        </Reveal>
        <Reveal delay={0}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-16">
          <div id="text" className="lg:col-span-2 scroll-mt-32 text-justify hyphens-auto">
          
            <p className="text-md text-neutral-900 mt-0">{fair.location}</p>
            <p className="text-md text-neutral-900 mt-0">
              {formatDate(fair.startDate)} - {formatDate(fair.endDate)}
            </p>
            {fair.content && fair.content.length > 0 && (
              <div className="mt-3 text-md font-medium">
                <ReadMore content={fair.content} />
              </div>
            )}
            <div className="mt-4 flex flex-col gap-1">
              <Link href="mailto:ashley@ashleysaville.com" className="text underline decoration-1 underline-offset-2">
                Enquire about available works
              </Link>
              {fair.pressRelease && (
                <a href={fair.pressRelease} target="_blank" rel="noopener noreferrer" className="text underline decoration-1 underline-offset-2">
                  Download Press Release
                </a>
              )}
              {fair.download && (
                <a href={fair.download} target="_blank" rel="noopener noreferrer" className="text underline decoration-1 underline-offset-2">
                  Download
                </a>
              )}
            </div>
          </div>
          <div className="lg:col-span-1  lg:text-right">
            <div className="sticky top-32 flex flex-col items-start lg:items-end gap-7 hidden lg:flex pt-0 lg:pt-[3.75rem]">
              <div>
                <FairNavigation 
                  hasInstallations={Array.isArray(fair.fairImages) && fair.fairImages.length > 0}
                  hasWorks={Array.isArray(fair.worksImages) && fair.worksImages.length > 0}
                />
              </div>
              {fair.pressLinks?.some(link => link.url) && (
                <div className="mt-3">
                  <FairDocuments pressLinks={fair.pressLinks} />
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Documents above image */}
          {fair.pressLinks?.some(link => link.url) && (
            <div className="grid grid-cols-1 lg:grid-cols- gap-2 lg:col-span-3    lg:hidden mb-5">
              <FairDocuments pressLinks={fair.pressLinks} />
            </div>
          )}

          {fair.image && (
            <div className="lg:col-span-3 mt-5">
              <Link
                href={`/fairs/${slug}/fair/0`}
                className="block relative aspect-[16/9] w-full overflow-hidden bg-white"
              >
                <Image
                  src={fair.image}
                  alt={fair.name}
                  fill
                  className="object-cover"
                />
              </Link>
          
            </div>
          )}
        </div>
        </Reveal>
 {fair.fairImages && fair.fairImages.length > 0 && (
        <h3
          id="installations"
          className="text-md justify-center text-center font-medium text-neutral-900 mt-20 scroll-mt-32"
        >
          Installations
        </h3>
        )}
        {fair.fairImages && fair.fairImages.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-20 items-center justify-center">
            {fair.fairImages.map((item, idx) => (
              <Reveal key={idx} delay={idx * 40}>
              <Link
                href={`/fairs/${slug}/fair/${fair.image ? idx + 1 : idx}`}
              >
                <Image
                  src={item.url}
                  alt={fair.name}
                  width={500}
                  height={500}
                />
              </Link>
              </Reveal>
            ))}
          </div>
        )}
        {fair.worksImages && fair.worksImages.length > 0 && (
          <h3
            id="works"
            className="text-md justify-center text-center font-medium text-neutral-900 mt-20 scroll-mt-32"
          >
            Works
          </h3>
        )}
        {fair.worksImages && fair.worksImages.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-20 items-center justify-center">
            {fair.worksImages.map((item, idx) => (
              <Reveal key={idx} delay={idx * 40}>
              <Link
                href={`/fairs/${slug}/works/${idx}`}
              >
                <Image
                  src={item.url}
                  alt={fair.name}
                  width={500}
                  height={500}
                />
              </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
      <FairMobileNav
        hasInstallations={Array.isArray(fair.fairImages) && fair.fairImages.length > 0}
        hasWorks={Array.isArray(fair.worksImages) && fair.worksImages.length > 0}
      />
    </div>
  );
}
