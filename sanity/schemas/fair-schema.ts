import { defineType, defineField } from "sanity";

const fair = defineType({
    name: "fair",
    title: "Fairs",
    type: "document",
    fields: [
        defineField({
            name: "fairName",
            title: "Fair Name",
            type: "string",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "fairName" },
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "string",
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
            name: "image",
            title: "Image",
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
            name: "fairImages",
            title: "Fair Images",
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
            title: "Is Fair Current?",
            type: "boolean",
        }),
    ],
});

export default fair;
