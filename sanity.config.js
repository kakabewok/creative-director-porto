import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { projectSchema } from './sanity/schemas/project';
import { userSchema } from './sanity/schemas/user';

export default defineConfig({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '02lojwef',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    plugins: [
        structureTool(),
        visionTool(),
    ],
    schema: {
        types: [projectSchema, userSchema],
    },
    basePath: '/studio',
})