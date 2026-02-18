import { getArtists } from "@/sanity/sanity-utils";
import Link from "next/link";

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <div className="min-h-screen bg-neutral-100 pt-0 px-8 pb-32 flex flex-col items-center justify-center">
      <ul className="flex flex-wrap justify-center md:flex-row flex-col items-center gap-x-6 gap-y-2">
        {artists.filter((artist) => artist.slug).map((artist) => (
          <li key={artist._id}>
            <Link
              href={`/artists/${artist.slug}`}
              className="text-lg font-ml text-neutral-900 hover:text-neutral-500 leading-normal h-auto"
            >
              {artist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
