import { getExhibitionBySlug } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";
import GalleryView from "@/app/components/GalleryView";

type Props = {
  params: Promise<{ slug: string; index: string }>;
};

export default async function ExhibitionImagesGalleryPage({ params }: Props) {
  const { slug, index: indexStr } = await params;
  const exhibition = await getExhibitionBySlug(slug);
  if (!exhibition) notFound();

  const index = parseInt(indexStr, 10);
  const heroImages =
    exhibition.image
      ? [
          {
            url: exhibition.image,
            caption: exhibition.imageCaption,
          },
        ]
      : [];

  const images = [...heroImages, ...(exhibition.exhibitionImages ?? [])];

  if (Number.isNaN(index) || index < 0 || index >= images.length) notFound();

  const displayName =
    (exhibition.artistNames?.length
      ? exhibition.artistNames.join(", ")
      : exhibition.artistName) || exhibition.exhibitionName;

  return (
    <GalleryView
      images={images}
      currentIndex={index}
      basePath={`/exhibitions/${slug}/exhibition`}
      backHref={`/exhibitions/${slug}`}
      backLabel={exhibition.exhibitionName}
      alt={displayName}
    />
  );
}
