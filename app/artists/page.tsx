import { getArtists } from "@/sanity/sanity-utils";
import Link from "next/link";

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <div className="min-h-screen bg-neutral-100 pt-0 px-8 pb-8 flex flex-col items-center justify-center">
      <ul className="flex flex-wrap justify-center md:flex-row flex-col items-center  gap-x-6 gap-y-4">
        {artists.filter((artist) => artist.slug).map((artist) => (
          <li key={artist._id}>
            <Link
              href={`/artists/${artist.slug}`}
              className=" text-md font-medium text-neutral-900 hover:text-neutral-500 "
            >
              {artist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
