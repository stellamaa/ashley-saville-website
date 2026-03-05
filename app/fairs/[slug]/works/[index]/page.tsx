import { getFairBySlug } from "@/sanity/sanity-utils";
import { notFound } from "next/navigation";
import GalleryView from "@/app/components/GalleryView";

type Props = {
  params: Promise<{ slug: string; index: string }>;
};

export default async function FairWorksGalleryPage({ params }: Props) {
  const { slug, index: indexStr } = await params;
  const fair = await getFairBySlug(slug);
  if (!fair) notFound();

  const worksImages = fair.worksImages ?? [];
  const images = worksImages.map((item) => ({
    url: item.url,
    caption: item.caption,
  }));

  const index = parseInt(indexStr, 10);
  if (Number.isNaN(index) || index < 0 || index >= images.length) notFound();

  return (
    <GalleryView
      images={images}
      currentIndex={index}
      basePath={`/fairs/${slug}/works`}
      backHref={`/fairs/${slug}`}
      backLabel={fair.name}
      alt={fair.name}
    />
  );
}
