import { defineType, defineField } from "sanity";

const project = defineType({
    name: "project",
    title: "Projects",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
        }),
        defineField({
            name: "slug",
            title: "Slug", 
            type: "slug", 
            options: { source: "name" }
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt",
                    type: "string",
                }),
            ],
        }),
        defineField({
            name: "url",
            title: "URL",
            type: "url",
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "block" }],
        }),
    ],
})

export default project;