import {createClient, groq} from 'next-sanity';
import { Project } from '@/types/project';

export async function getProjects(): Promise<Project[]> {
    const client = createClient({

        projectId: "chae03x8",
        dataset: "production",
        apiVersion: "2026-01-26",
    });

   return client.fetch(
    
    groq `* [_type == "project"] {
            _id,
            _createdAt,
            name,
            "slug": slug.current,
            "image": image.asset->url,
            url,
            content,
        }`
    );

}