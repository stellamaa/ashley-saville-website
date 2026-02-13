import { PortableTextBlock } from "sanity";

export type Fair = {
    _id: string;
    _createdAt: string;
    name: string;
    slug: string;
    location: string;
    startDate: string;
    endDate: string;
    image: string;
    imageCaption?: string;
    fairImages?: Array<{
        url: string;
        caption?: string;
    }>;
    content?: PortableTextBlock[];
    download?: string;
    pressRelease?: string;
    pressLinks?: Array<{
        label: string;
        url: string;
    }>;
    isCurrent?: boolean;
}