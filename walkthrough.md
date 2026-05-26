# Official Sanity + Cloudinary Migration Walkthrough

This walkthrough details the steps completed to migrate the project's media handling to the official `sanity-plugin-cloudinary` workflow.

## What Was Accomplished
1. **Plugin Installation**: Installed `sanity-plugin-cloudinary` via npm.
2. **Schema Upgrades**: Removed the old custom `cloudinaryImage` schema object. We migrated all `coverImage`, `profileImage`, `heroPoster`, and `gallery[].image` field types inside `sanity/schemas/project.ts` and `sanity/schemas/user.ts` directly to the `cloudinary.asset` type provided by the official plugin.
3. **Data Fetching Updates**: Updated all GROQ queries (in both `lib/sanity/queries.ts` and `sanity/queries.ts`) to request the official plugin's fields: `secure_url`, `public_id`, `width`, and `height`.
4. **TypeScript Types**: Renamed `CloudinaryImage` to `CloudinaryAsset` and updated its shape across all relevant `types/*.ts` definitions.
5. **Media Optimizer Setup**: Standardized the `optimizeCloudinaryUrl` helper in `lib/media.ts` to automatically format all strings and use the exact `url.replace("/upload/", "/upload/f_auto,q_auto/")` string replacement as per the user specification.
6. **Component Wiring**: Integrated `secure_url` references inside all necessary UI components, including `lib/projectImage.ts`, `components/MediaCarousel.tsx`, and `modules/HeroClient.tsx`.
7. **Mock Data Migration**: Replaced all instances of `url:` with `secure_url:` inside `data/mock/user.ts` and `data/mock/projects.ts` to ensure local demo data keeps working seamlessly with the new architectural patterns.

## Verification
- We verified the repository compiles perfectly under TypeScript via `npx tsc --noEmit`. 
- With these changes, Next.js will now render all imagery fully optimized directly from the Cloudinary CDN. 
