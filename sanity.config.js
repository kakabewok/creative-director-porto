import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { GuideWidget } from './components/studio/GuideWidget'
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
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Content')
                    .items([
                        S.listItem()
                            .title('User Profile')
                            .id('user')
                            .child(
                                S.document()
                                    .schemaType('user')
                                    .documentId('user')
                            ),
                        // Add regular document types here
                        S.documentTypeListItem('project').title('Projects'),
                    ]),
        }),
        visionTool(),
        cloudinarySchemaPlugin(),
    ],
    schema: {
        types: [projectSchema, userSchema],
    },
    document: {
        actions: (input, context) => {
            if (context.schemaType === 'user') {
                const singletonActions = new Set([
                    "publish",
                    "discardChanges",
                    "restore",
                    "delete",
                ])
                return input.filter(({ action }) => action && singletonActions.has(action))
            }
            return input
        },
        newDocumentOptions: (prev, { creationContext }) => {
            if (creationContext.type === 'global') {
                return prev.filter((templateItem) => templateItem.templateId !== 'user')
            }
            return prev
        }
    },
    basePath: '/studio',
})