import { PortableTextBlock } from "sanity";

export type Information = {
  _id: string;
  informationText?: PortableTextBlock[];
  openingHours?: PortableTextBlock[];
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactInstagram?: string;
};
