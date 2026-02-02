import { defineType, defineField } from "sanity";

const artist = defineType({
    name: "artist",
    title: "Artists",
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
            options: { source: "name" },
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
            name: "images",
            title: "Images",
            type: "array",
            of: [{ type: "image" }],
        }),

        defineField({
            name: "biography",
            title: "Biography",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            
            name: "CV",
            title: "CV",
            type: "file",
         }),
         defineField({ 
          name: "press",
          title: "Press",
          type: "file",
         }),
         defineField({ 
          name: "pressLink",
          title: "Press link",
          type: "url",
         })
    ],
});

export default artist;
