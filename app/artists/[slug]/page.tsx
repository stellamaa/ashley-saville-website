import { getArtistBySlug, getExhibitionsByArtistName } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadMore from "@/app/components/ReadMore";
import ArtistNavigation from "./ArtistNavigation";
import ArtistMobileNav from "./ArtistMobileNav";
import { Exhibition } from "@/types/exhibition";
import ArtistDocuments from "./ArtistDocuments";
import Reveal from "@/app/components/Reveal"; 

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

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  const exhibitions = await getExhibitionsByArtistName(artist.name);
  const archivedExhibitions = exhibitions.filter(
    (exhibition) => !exhibition.isCurrent,
  );

  return (
    <div className="min-h-screen bg-neutral-50 pt-22 px-5 md:px-10 pb-15 lg:pb-16 md:pt-12">
      <div className="max-w-4xl mx-auto">
        <Reveal>
      <h1 className="text-1xl text-neutral-800 text-center mt-0 md:mt-20 mb-10">
          {artist.name}
        </h1>
            
       
       
        </Reveal>
        <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-1">
          <div id="biography" className="lg:col-span-2 scroll-mt-32 text-justify hyphens-auto">
           
            {artist.biography && artist.biography.length > 0 && (
              <>
              <div className="mt-3 text-md font-medium leading-snug">
                <ReadMore content={artist.biography} />
                </div>
              <div className="mt-4 flex flex-col gap-1">
                <Link href="mailto:ashley@ashleysaville.com" className="text underline decoration-1 underline-offset-2 hover:text-neutral-600">
                  Enquire about available works
                </Link>
                {artist.press && (
                  <a href={artist.press} target="_blank" rel="noopener noreferrer" className="text underline underline-offset-2 hover:text-neutral-600">
                    Download Press Release
                  </a>
                )}
                {artist.CV && (
                  <a href={artist.CV} target="_blank" rel="noopener noreferrer" className="text underline underline decoration-1 underline-offset-2 hover:text-neutral-600">
                    Download CV
                  </a>
                )}
              </div>           
               </>

            )}
          </div>
          <div className="lg:col-span-1 lg:text-right">
            <div className="sticky top-32 flex flex-col items-start lg:items-end gap-7 hidden lg:flex">
              <div className="mt-3">
                <ArtistNavigation 
                  hasInstallations={artist.exhibitionImages?.length > 0}
                  hasWorks={artist.worksImages?.length > 0}
                />
              </div>
                <div className="mt-3">
                  <ArtistDocuments pressLinks={artist.pressLinks} />
                </div>
              
            </div>
          </div>
        
          {/* Mobile: Documents above image */}
          <div className="lg:col-span-3 lg:hidden mb-5">
            <ArtistDocuments pressLinks={artist.pressLinks} />
          </div>
      
        </div>
        </Reveal>
        {artist.image && (
            <div className="lg:col-span-3 mt-5">
              <Link
                href={`/artists/${slug}/works/0`}
                className="block relative aspect-[16/9] w-full overflow-hidden bg-white"
              >
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
              </Link>
           
            </div>
          )}

        <Reveal>
        <h3 id="installations" className="text-md justify-center text-center font-medium text-neutral-900 mt-20 scroll-mt-32">
          Installations
        </h3>
        {artist.exhibitionImages && artist.exhibitionImages.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-20 items-center justify-center">
            {artist.exhibitionImages.map((img, idx) => (
              <Reveal>
              <Link key={idx} href={`/artists/${slug}/exhibition/${idx}`}>
                <Image
                  src={img}
                  alt={artist.name}
                  width={500}
                  height={500}
                />
              </Link>
              </Reveal>
            ))}
          </div>
        )}
       {artist.worksImages && artist.worksImages.length > 0 && (
        <h3 id="works" className="text-md justify-center text-center font-medium text-neutral-900 mt-20 scroll-mt-32">
          Works
        </h3>

       )}
        {artist.worksImages && artist.worksImages.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-10 mt-20 items-center justify-center">
            {artist.worksImages.map((img, idx) => (
              <Reveal>
              <Link key={idx}
                href={`/artists/${slug}/works/${artist.image ? idx + 1 : idx}`}
              >
                <Image
                  src={img}
                  alt={artist.name}
                  width={500}
                  height={500}
                  className="flex items-center justify-center"
                />
              </Link>
              </Reveal>
            ))}
          </div>
        )}
        </Reveal>

        {archivedExhibitions.length > 0 && (
          <>
            <h3 id="exhibitions" className="text-md justify-center text-center font-medium text-neutral-900 mt-20 scroll-mt-32">
              Previous exhibitions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 mb-16">
              {archivedExhibitions.map((exhibition: Exhibition) => {
                const imageUrl =
                  exhibition.image ||
                  exhibition.exhibitionImages?.[0]?.url ||
                  exhibition.worksImages?.[0]?.url;
                if (!imageUrl) return null;
                const exhibitionAlt =
                  (exhibition.artistNames?.length
                    ? exhibition.artistNames.join(", ")
                    : exhibition.artistName) || exhibition.exhibitionName;
                return (
                  <Link
                    key={exhibition._id}
                    href={`/exhibitions/${exhibition.slug}`}
                    className="group relative aspect-[4/3] overflow-hidden bg-white block"
                  >
                    <Image
                      src={imageUrl}
                      alt={exhibitionAlt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/70 transition flex items-center justify-center p-6">
                      <div className="text-black text-center opacity-0 group-hover:opacity-100 transition">
                        <p className="text-sm font-medium uppercase">
                          {exhibition.exhibitionName}
                        </p>
                        <p className="text-sm text-black/90 font-medium">
                          {formatDate(exhibition.startDate)} -{" "}
                          {formatDate(exhibition.endDate)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
      <ArtistMobileNav
        hasInstallations={(artist.exhibitionImages?.length ?? 0) > 0}
        hasWorks={(artist.worksImages?.length ?? 0) > 0}
      />
    </div>
  );
}