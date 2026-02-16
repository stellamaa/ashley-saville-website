import { getFairBySlug } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";
import GalleryView from "@/app/components/GalleryView";

type Props = {
  params: Promise<{ slug: string; index: string }>;
};

export default async function FairImagesGalleryPage({ params }: Props) {
  const { slug, index: indexStr } = await params;
  const fair = await getFairBySlug(slug);
  if (!fair) notFound();

  const index = parseInt(indexStr, 10);
  const heroImages =
    fair.image
      ? [
          {
            url: fair.image,
            caption: fair.imageCaption,
          },
        ]
      : [];

  const images = [...heroImages, ...(fair.fairImages ?? [])];

  if (Number.isNaN(index) || index < 0 || index >= images.length) notFound();

  return (
    <GalleryView
      images={images}
      currentIndex={index}
      basePath={`/fairs/${slug}/fair`}
      backHref={`/fairs/${slug}`}
      backLabel={fair.name}
      alt={fair.name}
    />
  );
}
