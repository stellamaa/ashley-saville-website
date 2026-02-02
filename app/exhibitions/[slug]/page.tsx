import { getExhibitionBySlug } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadMore from "@/app/components/ReadMore";

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
    <div className="min-h-screen bg-neutral-50 pt-24 px-6 md:px-10 pb-16">
      <div className="max-w-5xl mx-auto">
     
        <h1 className="text-1xl font-medium text-center mb-12">
          {exhibition.isCurrent ? "Current Exhibition" : "Archive"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-1xl font-medium mt-0text-neutral-900">
              {exhibition.artistName}
            </h2>
            <p className="text-lg text-neutral-600 mt-0">
              {exhibition.exhibitionName}
            </p>
            <p className="text-neutral-600 mt-0">
              {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
            </p>
            {exhibition.content && exhibition.content.length > 0 && (
              <div className="mt-6">
                <ReadMore content={exhibition.content} />
              </div>
            )}
          </div>

          <div className="lg:col-span-1 lg:text-right">
            <h3 className="text-sm font-medium text-neutral-900 mb-4">
              Documents
            </h3>
            <div className="flex flex-col items-start lg:items-end gap-2">
              {exhibition.download && (
                <a
                  href={exhibition.download}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline text-neutral-600 hover:text-neutral-900"
                >
                  Download
                </a>
              )}
              {exhibition.pressRelease && (
                <a
                  href={exhibition.pressRelease}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline text-neutral-600 hover:text-neutral-900"
                >
                 Download Press Release
                </a>
              )}
            </div>
          </div>
        </div>

        {exhibition.image && (
          <div className="relative aspect-[4/3] w-full  overflow-hidden bg-neutral-200">
            <Image
              src={exhibition.image}
              alt={exhibition.artistName}
              fill
              className="object-cover"
            />
          </div>
        )}
        {exhibition.images && exhibition.images.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {exhibition.images.map((image, idx) => {
              // Handle if image is a string (URL) or an object with asset
              if (typeof image === 'string') {
                return (
                  <Image
                    key={idx}
                    src={image}
                    alt={exhibition.artistName}
                    width={100}
                    height={100}
                  />
                );
              } else if (image?.asset?.url) {
                return (
                  <Image
                    key={image.asset._key || idx}
                    src={image.asset.url}
                    alt={exhibition.artistName}
                    width={100}
                    height={100}
                  />
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
