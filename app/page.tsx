import { getCurrentExhibition, getArtistSlugByName } from "@/sanity/sanity-utils";
import LandingHero from "@/app/components/LandingHero";

export default async function Home() {
  const exhibition = await getCurrentExhibition();

  if (!exhibition || !exhibition.image) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500">No current exhibition</p>
      </div>
    );
  }

  const artistSlug = await getArtistSlugByName(exhibition.artistName);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <LandingHero
          image={exhibition.image}
          alt={exhibition.artistName}
          exhibitionName={exhibition.exhibitionName}
          artistName={exhibition.artistName}
          artistSlug={artistSlug}
          startDate={exhibition.startDate}
          endDate={exhibition.endDate}
          slug={exhibition.slug}
          worksImages={exhibition.worksImages}
      />
    </div>
  );
}
