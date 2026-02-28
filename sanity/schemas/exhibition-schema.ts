import { defineType, defineField } from "sanity";

const exhibition = defineType({
  name: "exhibition",
  title: "Exhibitions",
  type: "document",
  fields: [
    defineField({
      name: "exhibitionName",
      title: "Exhibition Name",
      type: "string",
    }),
    defineField({
      
      name: "artistName",
      title: "Artist Name (single, legacy)",
      type: "string",
      description: "Use for solo shows. For group shows, use Artist Names below.",
   
    }),
    defineField({
      name: "artistNames",
      title: "Artist Names",
      type: "array",
      of: [{ type: "string" }],
      description: "For group shows: add multiple artist names. Each artist will see this exhibition in their Previous exhibitions.",
    }),
  
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      options: { dateFormat: "DD-MM-YYYY" },
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      options: { dateFormat: "DD-MM-YYYY" },
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "exhibitionName" },
    }),
    defineField({
      name: "mainImage",
      title: "Main Exhibition Page Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineField({
      name: "exhibitionImages",
      title: "Exhibition Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "worksImages",
      title: "Works Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
    }),

    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "object",
          name: "readMoreBreak",
          title: "Read more Break",
          fields: [
            defineField({
              name: "marker",
              title: "Marker",
              type: "string",
              initialValue: "readMoreBreak",
              hidden: true,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "download",
      title: "Download",
      type: "file",
    }),
    defineField({
      name: "pressRelease",
      title: "Press Release",
      type: "file",
    }),
    defineField({
      name: "pressLinks",
      title: "Press links",
      type: "array",
      of: [
        {
          name: "pressLink",
          title: "Press link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'Text to show for the link (e.g. "Vogue")',
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "isCurrent",
      title: "Is Exhibition Current?",
      type: "boolean",
    }),
  ],
});

export default exhibition;
