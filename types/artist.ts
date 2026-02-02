import { PortableTextBlock } from "sanity";

export type Artist = {
    _id: string;
    _createdAt: string;
    name: string;
    slug: string;
    image: string;
    url?: string;
    biography: PortableTextBlock[];
    images?: string[];
    CV?: string;
    press?: string;
    pressLink?: string;
}