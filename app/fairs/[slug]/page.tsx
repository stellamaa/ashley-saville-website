import { getFairBySlug } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadMore from "@/app/components/ReadMore";
import FairNavigation from "./FairNavigation";
import FairDocuments from "./FairDocuments";

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

export default async function FairPage({ params }: Props) {
  const { slug } = await params;
  const fair = await getFairBySlug(slug);

  if (!fair) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 px-6 md:px-10 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-1xl text-neutral-800 text-left font-bold mt-0 sm:mt-20 mb-0 md:mb-5">
          {fair.name}
        </h1>
        {/* Mobile Navigation */}
        <div className="lg:hidden mb-5">
          <FairNavigation
                hasInstallations={Array.isArray(fair.fairImages) && fair.fairImages.length > 0}
                hasWorks={Array.isArray(fair.worksImages) && fair.worksImages.length > 0}
              />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-16">
          <div id="text" className="lg:col-span-2 scroll-mt-32 text-left">
            <p className="text-md text-neutral-900 mt-0">
              {fair.location}
            </p>
            <p className="text-md text-neutral-900 mt-0 mb-6">
              {formatDateRange(fair.startDate, fair.endDate)}
            </p>
            {fair.content && fair.content.length > 0 && (
              <div className="mt-3">
                <ReadMore content={fair.content} />
              </div>
            )}
          </div>
          <div className="lg:col-span-1 lg:text-right">
            <div className="sticky top-32 flex flex-col items-start lg:items-end gap-7 hidden lg:flex">
              <div className="mt-3">
                <FairNavigation
                hasInstallations={Array.isArray(fair.fairImages) && fair.fairImages.length > 0}
                hasWorks={Array.isArray(fair.worksImages) && fair.worksImages.length > 0}
              />
              </div>
              <FairDocuments pressLinks={fair.pressLinks} />
            </div>
          </div>
        
          {/* Mobile: Documents above image */}
          <div className="lg:col-span-3 lg:hidden mb-5">
            <FairDocuments pressLinks={fair.pressLinks} />
          </div>
          
          {fair.image && (
            <Link
              href={`/fairs/${slug}/fair/0`}
              className="lg:col-span-3 mt-5 block relative aspect-[4/3] w-full overflow-hidden bg-neutral-200"
            >
              <Image
                src={fair.image}
                alt={fair.name}
                fill
                className="object-cover"
              />
            </Link>
          )}
        </div>

        {fair.fairImages && fair.fairImages.length > 0 && (
          <>
        <h3 id="installations" className="text-md justify-center text-center font-bold text-neutral-900 mt-10 scroll-mt-32">
          Installations
        </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-8 items-center justify-center">
            {fair.fairImages.map((item, idx) => (
              <Link
                key={idx}
                href={`/fairs/${slug}/fair/${fair.image ? idx + 1 : idx}`}
              >
                <Image
                  src={item.url}
                  alt={fair.name}
                  width={500}
                  height={500}
                />
              </Link>
            ))}
          </div>
          </>
        )}
        {fair.worksImages && fair.worksImages.length > 0 && (
          <>
        <h3 id="works" className="text-md justify-center text-center font-bold text-neutral-900 mt-10 scroll-mt-32">
          Works
        </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-8 items-center justify-center">
            {fair.worksImages.map((item, idx) => (
              <Link key={idx} href={`/fairs/${slug}/works/${idx}`}>
                <Image
                  src={item.url}
                  alt={fair.name}
                  width={500}
                  height={500}
                />
              </Link>
            ))}
          </div>
          </>
        )}
      </div>
    </div>
  );
}
