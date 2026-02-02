import {defineConfig} from 'sanity'
import { structureTool } from 'sanity/structure';
import schemas from './sanity/schemas';

const config = defineConfig({
    projectId: "chae03x8",
    dataset: "production",
    apiVersion: "2026-01-26",
    title: "Ashley Saville",
    basePath: "/admin",
    plugins: [
        structureTool(),
    ],
    schema: {
        types: schemas,
    },
}) 

export default config;