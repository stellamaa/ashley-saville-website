import { getFairBySlug } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadMore from "@/app/components/ReadMore";
import FairNavigation from "./FairNavigation";
import FairDocuments from "./FairDocuments";

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
        <h1 className="text-1xl text-neutral-800 font-medium text-center mt-0 sm:mt-20 mb-16">
          {fair.isCurrent ? "Current Fair" : "Archive"}
        </h1>
        {/* Mobile Navigation */}
        <div className="lg:hidden mb-5">
          <FairNavigation />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-16">
          <div id="text" className="lg:col-span-2 scroll-mt-32 text-justify">
            <h2 className="text-md font-medium mb-0 mt-0 text-neutral-900">
              {fair.name}
            </h2>
            <p className="text-md text-neutral-900 mt-0">
              {fair.location}
            </p>
            <p className="text-md text-neutral-900 mt-0">
              {formatDate(fair.startDate)} - {formatDate(fair.endDate)}
            </p>
            {fair.content && fair.content.length > 0 && (
              <div className="mt-3 text-md font-medium">
                <ReadMore content={fair.content} />
              </div>
            )}
            {/* Desktop: Documents below content in two columns */}
            <div className="hidden lg:block mt-6">
              <FairDocuments 
                download={fair.download} 
                pressRelease={fair.pressRelease} 
                pressLinks={fair.pressLinks} 
              />
            </div>
          </div>
          <div className="lg:col-span-1 lg:text-right">
            <div className="sticky top-32 flex flex-col items-start lg:items-end gap-6 hidden lg:flex">
              <div className="mt-3">
                <FairNavigation />
              </div>
            </div>
          </div>
        
          {/* Mobile: Documents above image */}
          <div className="lg:col-span-3 lg:hidden mb-5">
            <FairDocuments 
              download={fair.download} 
              pressRelease={fair.pressRelease} 
              pressLinks={fair.pressLinks} 
            />
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

        {/* Fair Images Gallery */}
        {fair.fairImages && fair.fairImages.length > 0 && (
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fair.fairImages.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden bg-neutral-200"
                >
                  <Image
                    src={img.url}
                    alt={img.caption || `Fair image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
