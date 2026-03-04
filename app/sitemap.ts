import type { MetadataRoute } from "next";
import {
  getArtists,
  getAllExhibitionSlugs,
  getAllFairSlugs,
} from "@/sanity/sanity-utils";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  "https://ashleysaville.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [artists, exhibitionSlugs, fairSlugs] = await Promise.all([
    getArtists(),
    getAllExhibitionSlugs(),
    getAllFairSlugs(),
  ]);

  const artistUrls = artists
    .filter((a) => a.slug)
    .map((a) => ({
      url: `${baseUrl}/artists/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const exhibitionUrls = exhibitionSlugs.map((slug) => ({
    url: `${baseUrl}/exhibitions/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const fairUrls = fairSlugs.map((slug) => ({
    url: `${baseUrl}/fairs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/artists`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/exhibitions`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/exhibitions/archive`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/fairs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/fairs/archive`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/information`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/information/privacypolicy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  return [...staticUrls, ...artistUrls, ...exhibitionUrls, ...fairUrls];
}
