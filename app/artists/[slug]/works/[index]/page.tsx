import { getArtistBySlug } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";
import GalleryView from "@/app/components/GalleryView";

type Props = {
  params: Promise<{ slug: string; index: string }>;
};

export default async function ArtistWorksGalleryPage({ params }: Props) {
  const { slug, index: indexStr } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) notFound();

  const index = parseInt(indexStr, 10);
  const worksImages = artist.worksImages ?? [];
  const worksCaptions = artist.worksImagesCaption ?? [];

  const heroImages =
    artist.image
      ? [
          {
            url: artist.image,
            caption: artist.imageCaption,
          },
        ]
      : [];

  const images = [
    ...heroImages,
    ...worksImages.map((url, i) => ({
      url,
      caption: worksCaptions[i],
    })),
  ];

  if (Number.isNaN(index) || index < 0 || index >= images.length) notFound();

  return (
    <GalleryView
      images={images}
      currentIndex={index}
      basePath={`/artists/${slug}/works`}
      backHref={`/artists/${slug}`}
      backLabel={artist.name}
      alt={artist.name}
    />
  );
}
