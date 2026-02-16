import { getFairBySlug } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadMore from "@/app/components/ReadMore";
import FairDocuments from "./FairDocuments";
import FairNavigation from "./FairNavigation";

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
        <div className="lg:col-span-1 lg:text-right">
            <div className="sticky top-32 flex flex-col items-end text-right lg:items-end gap-7">
              <div className="mt-3">
                <FairNavigation />
              </div>
            </div>
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
            {/* Documents below content in two columns */}
            <div className="mt-6">
              <FairDocuments 
                download={fair.download} 
                pressRelease={fair.pressRelease} 
                pressLinks={fair.pressLinks} 
              />
            </div>
          </div>
      
          
          {fair.image && (
            <Link
              href={`/fairs/${slug}/fair/0`}
              className="lg:col-span-3 mt-5 block relative aspect-[4/3] w-full overflow-hidden bg-neutral-200"
            >
              <Image
                src={fair.image}
                alt={fair.imageCaption ?? fair.name}
                fill
                className="object-cover"
              />
            </Link>
          )}
        </div>

        <h3 id="installations" className="text-md justify-center text-center font-medium text-neutral-900 mt-20 scroll-mt-32">
          Installations
        </h3>
        {fair.fairImages && fair.fairImages.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-20 items-center justify-center">
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
        )}
      </div>
    </div>
  );
}
