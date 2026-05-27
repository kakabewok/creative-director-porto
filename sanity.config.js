import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { GuideWidget } from './components/studio/GuideWidget'
import { BulkDeleteWidget } from './components/studio/BulkDeleteWidget'
import { projectSchema } from './sanity/schemas/project';
import { userSchema } from './sanity/schemas/user';
import { cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary'
import { dashboardTool } from '@sanity/dashboard'
import { documentListWidget } from 'sanity-plugin-dashboard-widget-document-list'


export default defineConfig({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '02lojwef',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    plugins: [
        dashboardTool({
            widgets: [
                {
                    name: 'guide-widget',
                    component: GuideWidget,
                    layout: { width: 'full' }
                },
                {
                    name: 'bulk-delete-projects',
                    component: BulkDeleteWidget,
                    layout: { width: 'full' }
                },
                documentListWidget({
                    title: 'Last Edited Projects',
                    order: '_updatedAt desc',
                    types: ['project'],
                    layout: { width: 'full' }
                }),
                // projectInfoWidget({ layout: { width: 'large' } }),
                // projectUsersWidget({ layout: { width: 'medium' } }),
            ]
        }),
        structureTool(),
        visionTool(),
        cloudinarySchemaPlugin(),
    ],
    schema: {
        types: [projectSchema, userSchema],
    },
    basePath: '/studio',
})