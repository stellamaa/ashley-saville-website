import type { Metadata } from "next";
import { getCurrentExhibition, getArtistSlugByName } from "@/sanity/sanity-utils";
import LandingHero from "@/app/components/LandingHero";

export async function generateMetadata(): Promise<Metadata> {
  const exhibition = await getCurrentExhibition();
  const artistNames = exhibition?.artistNames?.length
    ? exhibition.artistNames
    : exhibition?.artistName
      ? [exhibition.artistName]
      : [];
  const displayName = artistNames.join(", ") || exhibition?.artistName || exhibition?.exhibitionName || "";
  const title = exhibition
    ? `${exhibition.exhibitionName}${displayName ? ` — ${displayName}` : ""} | Ashley Saville`
    : "Ashley Saville";
  const description = exhibition
    ? `${exhibition.exhibitionName}${displayName ? ` by ${displayName}` : ""}. Ashley Saville — contemporary art gallery in London.`
    : "Ashley Saville — contemporary art gallery in London.";
  return { title, description };
}

export default async function Home() {
  const exhibition = await getCurrentExhibition();

  if (!exhibition || !exhibition.image) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500">No current exhibition</p>
      </div>
    );
  }

  const artistNames = (exhibition.artistNames?.length
    ? exhibition.artistNames
    : exhibition.artistName
      ? [exhibition.artistName]
      : []) as string[];
  const displayName = artistNames.join(", ") || exhibition.artistName || exhibition.exhibitionName;
  const artistSlug =
    artistNames.length > 0
      ? await getArtistSlugByName(artistNames[0])
      : exhibition.artistName
        ? await getArtistSlugByName(exhibition.artistName)
        : null;

  return (
    <div className="relative h-dvh md:h-screen overflow-hidden">
      <LandingHero
          image={exhibition.heroImage}
          alt={displayName}
          exhibitionName={exhibition.exhibitionName}
          artistName={displayName}
          artistSlug={artistSlug}
          startDate={exhibition.startDate}
          endDate={exhibition.endDate}
          slug={exhibition.slug}
          worksImages={exhibition.worksImages}
      />
    </div>
  );
}
