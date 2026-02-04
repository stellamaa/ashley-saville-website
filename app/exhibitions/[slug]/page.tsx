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
      <div className="max-w-4xl mx-auto">
     
        <h1 className="text-1xl font-light text-center mt-0 sm:mt-20 mb-16">
          {exhibition.isCurrent ? "Current Exhibition" : "Archive"}
        </h1>
     

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-sm font-light mb-0 mt-0text-neutral-900">
              {exhibition.artistName}
            </h2>
            <p className="text-sm text-neutral-600 mt-0">
              {exhibition.exhibitionName}
            </p>
            <p className="text-sm text-neutral-600 mt-0">
              {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
            </p>
            {exhibition.content && exhibition.content.length > 0 && (
              <div className="mt-3 text-sm">
                <ReadMore content={exhibition.content} />
              </div>
            )}
          </div>

          <div className="lg:col-span-1 lg:text-right">
            
            <div className="flex flex-col items-start lg:items-end gap-2">
              {exhibition.download && (
                <a
                  href={exhibition.download}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-600 hover:text-neutral-900"
                >
                  Download
                </a>
              )}
              {exhibition.pressRelease && (
                <a
                  href={exhibition.pressRelease}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm mt-20 text-neutral-600 hover:text-neutral-900"
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
        <h3 className="text-sm justify-center text-center font-light text-neutral-600 mt-20">Exhibition</h3>
        {exhibition.exhibitionImages && exhibition.exhibitionImages.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-20">
            {exhibition.exhibitionImages.map((item, idx) => (
              <Link key={idx} href={`/exhibitions/${slug}/exhibition/${idx}`}>
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
        <h3 className="text-sm justify-center text-center font-light text-neutral-600 mt-20">Works</h3>
        {exhibition.worksImages && exhibition.worksImages.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-20">
            {exhibition.worksImages.map((item, idx) => (
              <Link key={idx} href={`/exhibitions/${slug}/works/${idx}`}>
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
      </div>
    </div>
  );
}
