import { getArtistBySlug } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";
import GalleryView from "@/app/components/GalleryView";

type Props = {
  params: Promise<{ slug: string; index: string }>;
};

export default async function ArtistExhibitionGalleryPage({ params }: Props) {
  const { slug, index: indexStr } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) notFound();

  const index = parseInt(indexStr, 10);
  const exhibitionImages = artist.exhibitionImages ?? [];
  const exhibitionCaptions = artist.exhibitionImagesCaption ?? [];
  const images = exhibitionImages.map((url, i) => ({
    url,
    caption: exhibitionCaptions[i],
  }));

  if (Number.isNaN(index) || index < 0 || index >= images.length) notFound();

  return (
    <GalleryView
      images={images}
      currentIndex={index}
      basePath={`/artists/${slug}/exhibition`}
      backHref={`/artists/${slug}`}
      backLabel={artist.name}
      alt={artist.name}
    />
  );
}
