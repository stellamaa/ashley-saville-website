import { defineType, defineField } from "sanity";

const information = defineType({
  name: "information",
  title: "Information Page",
  type: "document",
  fields: [
    defineField({
      name: "informationText",
      title: "Information Text",
      type: "array",
      of: [{ type: "block" }],
      description: "Main text about the gallery location and access",
    }),
    defineField({
      name: "openingHours",
      title: "Opening Hours",
      type: "array",
      of: [{ type: "block" }],
      description: "Opening hours text (e.g. Wednesday - Saturday, 10am - 6pm, and by appointment)",
    }),
    defineField({
      name: "contactName",
      title: "Contact Name / Title",
      type: "string",
      description: "e.g. Ashley Saville, Director",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
      description: "Include country code, e.g. +44 (0)752033690",
    }),
    defineField({
      name: "contactInstagram",
      title: "Instagram Handle or URL",
      type: "string",
      description: "e.g. @ashleysavilleworld or full URL",
    }),
  ],
});

export default information;
