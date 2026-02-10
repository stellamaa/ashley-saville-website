import { PortableTextBlock } from "sanity";

export type Artist = {
    _id: string;
    _createdAt: string;
    name: string;
    slug: string;
    image: string;
    imageCaption?: string;
    biography: PortableTextBlock[];
    exhibitionImagesAlt: string[];
    exhibitionImagesCaption: string[];
    worksImagesAlt: string[];
    worksImagesCaption: string[];
    exhibitionImages: string[];
    worksImages: string[];
    CV?: string;
    press?: string;
    pressLinks?: { label?: string; url: string }[];
}