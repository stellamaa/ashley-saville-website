import { getArtistBySlug, getExhibitionsByArtistName } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";
import ArtistPageLayout from "./ArtistPageLayout";

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

  return <ArtistPageLayout artist={artist} exhibitions={exhibitions} />;
}
