import { getArtists } from "@/sanity/sanity-utils";
import Link from "next/link";
import Reveal from "@/app/components/Reveal";

export default async function ArtistsPage() {
  const artists = await getArtists();
  const filteredArtists = artists.filter((artist) => artist.slug);
  const useVerticalLayout = filteredArtists.length > 6;

  return (
    <div className="min-h-screen bg-neutral-100 pt-0 px-8 pb-32 flex flex-col items-center justify-center">
      <Reveal>
      <ul className={`flex justify-center items-center gap-x-6 gap-y-2 ${useVerticalLayout ? "flex-col" : "flex-wrap md:flex-row flex-col"}`}>
        {filteredArtists.map((artist) => (
          <li key={artist._id}>
            <Link
              href={`/artists/${artist.slug}`}
              className="text-lg font-ml text-neutral-800 hover:text-neutral-600 leading-normal h-auto"
            >
              {artist.name}
            </Link>
          </li>
        ))}
      </ul>
      </Reveal>
    </div>
  );
}
