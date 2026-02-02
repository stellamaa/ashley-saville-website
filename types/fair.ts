import { PortableTextBlock } from "sanity";

export type Fair = {
    _id: string;
    _createdAt: string;
    name: string;
    slug: string;
    image: string;
    url: string;
    content: PortableTextBlock[];
}