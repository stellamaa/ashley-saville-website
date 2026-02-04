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
            name: "exhibitionImages",
            title: "Exhibition Images",
            type: "array",
            of: [
                {
                  type: 'image',
                  options: {
                    hotspot: true, // Enables cropping UI
                  },
                  fields: [
                    // --- Custom fields go here ---
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
                      description: 'Important for accessibility and SEO',
                      validation: (Rule) => Rule.required(), // Highly recommended
                    },
                    {
                      name: 'caption',
                      type: 'string',
                      title: 'Caption',
                    },
                  ],
                },
              ],
        
        }),
        defineField({
            name: "worksImages",
            title: "Works Images",
            type: "array",
            of: [{
                type: "image",
                options: { hotspot: true },
                fields: [
                    { name: "alt", type: "string", title: "Alt" },
                    { name: "caption", type: "string", title: "Caption" },
                ],
            }],
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
            name: "pressLink",
            title: "Press link",
            type: "object",
            fields: [
                defineField({
                    name: "label",
                    title: "Label",
                    type: "string",
                    description: "Text to show for the link (e.g. \"Vogue\")",
                }),
                defineField({
                    name: "url",
                    title: "URL",
                    type: "url",
                   
                }),
            ],
            
        }),
    ],
});

export default artist;
