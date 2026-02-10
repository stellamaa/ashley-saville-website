import { PortableTextBlock } from "sanity";

export type ExhibitionImage = { url: string; caption?: string };

export type Exhibition = {
    _id: string;
    _createdAt: string;
    artistName: string;
    exhibitionName: string;
    startDate: string;
    endDate: string;
    exhibitionImages: ExhibitionImage[];
    worksImages: ExhibitionImage[];
    slug: string;
    image: string;
    url?: string;
    isCurrent?: boolean;
    download?: string;
    pressRelease?: string;
    pressLinks?: { label: string; url: string }[];
    content: PortableTextBlock[];
}