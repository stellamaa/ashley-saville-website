import { getArtistBySlug, getExhibitionsByArtistName } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadMore from "@/app/components/ReadMore";
import ArtistSidebar from "./ArtistSidebar";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  const exhibitions = await getExhibitionsByArtistName(artist.name);

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 px-6 md:px-10 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-1xl text-neutral-800 font-medium text-center mt-0 sm:mt-20 mb-16">
          {artist.name}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div id="biography" className="lg:col-span-2 scroll-mt-32">
            <h2 className="text-sm font-medium mb-0 mt-0 text-neutral-900">
              {artist.name}
            </h2>
            {artist.biography && artist.biography.length > 0 && (
              <div className="mt-3 text-sm font-medium">
                <ReadMore content={artist.biography} />
              </div>
            )}
          </div>
          <div className="lg:col-span-1 lg:text-right">
            <ArtistSidebar CV={artist.CV} press={artist.press} pressLinks={artist.pressLinks} />
          </div>
          {artist.image && (
            <Link
              href={`/artists/${slug}/works/0`}
              className="lg:col-span-3 mt-20 block relative aspect-[4/3] w-full overflow-hidden bg-neutral-200"
            >
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover"
              />
            </Link>
          )}
        </div>

        <h3 id="exhibitions" className="text-sm justify-center text-center font-medium text-neutral-600 mt-20 scroll-mt-32">
          Exhibitions
        </h3>
        {artist.exhibitionImages && artist.exhibitionImages.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-20">
            {artist.exhibitionImages.map((img, idx) => (
              <Link key={idx} href={`/artists/${slug}/exhibition/${idx}`}>
                <Image
                  src={img}
                  alt={artist.name}
                  width={500}
                  height={500}
                />
              </Link>
            ))}
          </div>
        )}

        <h3 id="works" className="text-sm justify-center text-center font-medium text-neutral-600 mt-20 scroll-mt-32">
          Works
        </h3>
        {artist.worksImages && artist.worksImages.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-10 mt-20">
            {artist.worksImages.map((img, idx) => (
              <Link
                key={idx}
                href={`/artists/${slug}/works/${artist.image ? idx + 1 : idx}`}
              >
                <Image
                  src={img}
                  alt={artist.name}
                  width={500}
                  height={500}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
      {exhibitions.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 mt-6 mb-4">
            {exhibitions.map((exhibition) => (
              <Link
                key={exhibition._id}
                href={`/exhibitions/${exhibition.slug}`}
                className="text-sm text-neutral-600 hover:text-neutral-900"
              >
                {exhibition.exhibitionName}
              </Link>
            ))}
          </div>
        )}
  </div>
  );
}