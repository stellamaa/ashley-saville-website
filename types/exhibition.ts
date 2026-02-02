import { PortableTextBlock } from "sanity";

export type Exhibition = {
    _id: string;
    _createdAt: string;
    artistName: string;
    exhibitionName: string;
    startDate: string;
    endDate: string;
    images: string[];
    slug: string;
    image: string;
    url?: string;
    isCurrent?: boolean;
    download?: string;
    pressRelease?: string;
    content: PortableTextBlock[];
}