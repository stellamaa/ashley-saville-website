import { getCurrentExhibition } from "@/sanity/sanity-utils";
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

  return (
    <LandingHero
      image={exhibition.image}
      alt={exhibition.artistName}
      exhibitionName={exhibition.exhibitionName}
      artistName={exhibition.artistName}
      startDate={exhibition.startDate}
      endDate={exhibition.endDate}
      slug={exhibition.slug}
      worksImages={exhibition.worksImages}
    />
  );
}
