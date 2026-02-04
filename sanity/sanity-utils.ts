import { createClient, groq } from "next-sanity";
import { Exhibition } from "@/types/exhibition";
import { Artist } from "@/types/artist";
import { Fair } from "@/types/fair";

const exhibitionProjection = groq`{
    _id,
    _createdAt,
    artistName,
    exhibitionName,
    startDate,
    endDate,
    "exhibitionImages": exhibitionImages[]{"url": asset->url, "caption": caption},
    "worksImages": worksImages[]{"url": asset->url, "caption": caption},
    "slug": slug.current,
    "image": image.asset->url,
    content,
    "download": download.asset->url,
    "pressRelease": pressRelease.asset->url,
    isCurrent,
}`;

export async function getCurrentExhibition(): Promise<Exhibition | null> {
  const client = createClient({
    projectId: "chae03x8",
    dataset: "production",
    apiVersion: "2026-01-26",
  });

  const result = await client.fetch(
    groq`* [_type == "exhibition" && isCurrent == true][0] ${exhibitionProjection}`,
  );
  return result;
}

export async function getArchivedExhibitions(): Promise<Exhibition[]> {
  const client = createClient({
    projectId: "chae03x8",
    dataset: "production",
    apiVersion: "2026-01-26",
  });

  return client.fetch(
    groq`* [_type == "exhibition" && isCurrent != true] | order(_createdAt desc) ${exhibitionProjection}`,
  );
}

export async function getExhibitionsByArtistName(
  artistName: string,
): Promise<Exhibition[]> {
  const client = createClient({
    projectId: "chae03x8",
    dataset: "production",
    apiVersion: "2026-01-26",
  });

  return client.fetch(
    groq`* [_type == "exhibition" && artistName == $artistName] | order(startDate desc) ${exhibitionProjection}`,
    { artistName },
  );
}

export async function getExhibitionBySlug(
  slug: string,
): Promise<Exhibition | null> {
  const client = createClient({
    projectId: "chae03x8",
    dataset: "production",
    apiVersion: "2026-01-26",
  });

  const result = await client.fetch(
    groq`* [_type == "exhibition" && slug.current == $slug][0] ${exhibitionProjection}`,
    { slug },
  );
  return result;
}

export async function getArtists(): Promise<Artist[]> {
  const client = createClient({
    projectId: "chae03x8",
    dataset: "production",
    apiVersion: "2026-01-26",
  });

  return client.fetch(
    groq`* [_type == "artist"] {
            _id,
            _createdAt,
            name,   
            "slug": slug.current,
            "image": image.asset->url,
            biography,
            "CV": CV.asset->url,
            "press": press.asset->url,
            "pressLink": pressLink,
            "exhibitionImages": exhibitionImages[].asset->url,
            "exhibitionImagesAlt": exhibitionImages[].alt,
            "exhibitionImagesCaption": exhibitionImages[].caption,
            "worksImages": worksImages[].asset->url,
            "worksImagesAlt": worksImages[].alt,
            "worksImagesCaption": worksImages[].caption,
        }`,
  );
}

export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  const client = createClient({
    projectId: "chae03x8",
    dataset: "production",
    apiVersion: "2026-01-26",
  });

  const result = await client.fetch(
    groq`* [_type == "artist" && slug.current == $slug][0] {
            _id,
            _createdAt,
            name,
            "slug": slug.current,
            "image": image.asset->url,
            biography,
            "CV": CV.asset->url,
            "press": press.asset->url,
            "pressLink": pressLink,
            "images": images[].asset->url,
            "exhibitionImages": exhibitionImages[].asset->url,
            "exhibitionImagesCaption": exhibitionImages[].caption,
            "worksImages": worksImages[].asset->url,
            "worksImagesCaption": worksImages[].caption,
        }`,
    { slug },
  );
  return result;
}

export async function getFairs(): Promise<Fair[]> {
  const client = createClient({
    projectId: "chae03x8",
    dataset: "production",
    apiVersion: "2026-01-26",
  });

  return client.fetch(
    groq`* [_type == "fair"] {
            _id,
            _createdAt,
            name,
            "slug": slug.current,
            "image": image.asset->url,
            content,
        }`,
  );
}
