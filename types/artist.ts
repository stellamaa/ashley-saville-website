import { PortableTextBlock } from "sanity";

export type Artist = {
    _id: string;
    _createdAt: string;
    name: string;
    slug: string;
    image: string;
    biography: PortableTextBlock[];
    exhibitionImagesAlt: string[];
    exhibitionImagesCaption: string[];
    worksImagesAlt: string[];
    worksImagesCaption: string[];
    exhibitionImages: string[];
    worksImages: string[];
    CV?: string;
    press?: string;
    pressLink?: { label?: string; url: string };
}