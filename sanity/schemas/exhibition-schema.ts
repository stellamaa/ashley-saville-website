import { defineType, defineField } from "sanity";

const exhibition = defineType({
    name: "exhibition",
    title: "Exhibitions",
    type: "document",
    fields: [
        defineField({
            name: "artistName",
            title: "Artist Name",
            type: "string",
        }),
        defineField({
            name: "exhibitionName",
            title: "Exhibition Name",
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
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "exhibitionName" },
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
            ],
        }),
        defineField({
            name: "exhibitionImages",
            title: "Exhibition Images",
            type: "array",
            of: [{
                type: "image",
                options: { hotspot: true },
                fields: [
                    defineField({ name: "alt", title: "Alt", type: "string" }),
                    defineField({ name: "caption", title: "Caption", type: "string" }),
                ],
            }],
        }),
        defineField({
            name: "worksImages",
            title: "Works Images",
            type: "array",
            of: [{
                type: "image",
                options: { hotspot: true },
                fields: [
                    defineField({ name: "alt", title: "Alt", type: "string" }),
                    defineField({ name: "caption", title: "Caption", type: "string" }),
                ],
            }],
        }),
    
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "block" }],
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
            name: "isCurrent",
            title: "Is Exhibition Current?",
            type: "boolean",
        }),
    ],
});

export default exhibition;
