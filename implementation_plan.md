# Migrate Image Storage: Sanity → Cloudinary

Replace Sanity's native `type: 'image'` fields with a custom `cloudinaryImage` object type so that all media uploads go through Cloudinary. Sanity will store only metadata (URL, public_id, alt text).

## User Review Required

> [!WARNING]
> **Breaking change for existing Sanity data.** Any images already uploaded via Sanity's native `type: 'image'` will stop rendering because the field type is changing. You will need to re-upload those images through the Cloudinary asset source in Sanity Studio after this migration.

> [!IMPORTANT]
> The `sanity-plugin-cloudinary` is already installed and registered in `sanity.config.js`. The plugin provides a Cloudinary **asset source** picker inside Sanity Studio. However, with `type: 'image'` the picked asset is still stored as a Sanity image ref. By switching to a custom object (`cloudinaryImage`), we store the raw Cloudinary URL directly.

## Proposed Changes

### Sanity Schema Layer

#### [NEW] [cloudinaryImage.ts](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/sanity/schemas/objects/cloudinaryImage.ts)

Reusable Sanity object type with three fields:
- `url` (type: `url`) — the Cloudinary URL
- `public_id` (type: `string`) — Cloudinary public ID for transformations
- `alt` (type: `string`) — accessibility text

---

#### [MODIFY] [project.ts](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/sanity/schemas/project.ts)

| Field | Before | After |
|---|---|---|
| `coverImage` | `type: 'image'` | `type: 'cloudinaryImage'` |
| `gallery[].image` | `type: 'image'` | `type: 'cloudinaryImage'` |

Remove `hotspot` options (not applicable to Cloudinary objects).

---

#### [MODIFY] [user.ts](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/sanity/schemas/user.ts)

| Field | Before | After |
|---|---|---|
| `profileImage` | `type: 'image'` | `type: 'cloudinaryImage'` |
| `heroPoster` | `type: 'image'` | `type: 'cloudinaryImage'` |

---

#### [MODIFY] [sanity.config.js](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/sanity.config.js)

Register the new `cloudinaryImage` type in `schema.types`.

---

### TypeScript Types

#### [MODIFY] [types/index.ts](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/types/index.ts)

Replace `SanityImage` with `CloudinaryImage`:
```ts
export interface CloudinaryImage {
  url?: string
  public_id?: string
  alt?: string
}
```

Keep `SanityImage` as a deprecated alias (`type SanityImage = CloudinaryImage`) for any transient references.

---

#### [MODIFY] [types/project.ts](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/types/project.ts)

- `coverImage?: CloudinaryImage`
- `GalleryItem.image?: CloudinaryImage`

---

#### [MODIFY] [types/user.ts](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/types/user.ts)

- `profileImage?: CloudinaryImage`
- `heroPoster?: CloudinaryImage` (simplify from nested asset object)

---

### GROQ Queries

#### [MODIFY] [lib/sanity/queries.ts](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/lib/sanity/queries.ts)

Since `cloudinaryImage` fields are plain objects (not Sanity references), queries become simpler:
```groq
coverImage { url, public_id, alt },
gallery[] {
  _key, type,
  image { url, public_id, alt },
  videoUrl, caption
},
```

Same for `profileImage` and `heroPoster` in the user query.

---

### Image Resolution Logic

#### [MODIFY] [lib/projectImage.ts](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/lib/projectImage.ts)

**Remove all `urlFor()` calls.** The new flow:
1. If `project.coverImage?.url` exists → `optimizeCloudinaryUrl(url, width)`
2. If `project.coverVideo` exists → YouTube thumbnail
3. Else → placeholder from `PLACEHOLDER_IMAGES`

---

#### [MODIFY] [lib/media.ts](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/lib/media.ts)

No changes needed — the existing `optimizeCloudinaryUrl` function is already correct.

---

### Component Updates

#### [MODIFY] [components/MediaCarousel.tsx](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/components/MediaCarousel.tsx)

- Remove `urlFor` import
- `resolveImageSrc()`: use `optimizeCloudinaryUrl(item.image?.url)` directly

---

#### [MODIFY] [app/(website)/information/page.tsx](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/app/(website)/information/page.tsx)

- Remove `urlFor` import
- Profile image: `optimizeCloudinaryUrl(user.profileImage?.url, 800)`

---

### Mock Data

#### [MODIFY] [data/mock/projects.ts](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/data/mock/projects.ts)

Change `coverImage` and `gallery[].image` from `{ _type: 'image', asset: { _ref, _type } }` to `{ url: '...unsplash-url...', alt: '...' }`.

---

#### [MODIFY] [data/mock/user.ts](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/data/mock/user.ts)

Change `profileImage` from Sanity image shape to `{ url: '...', alt: '...' }`.

---

### Cleanup

#### Files that become unused after migration:

| File | Action |
|---|---|
| [lib/sanity/image.ts](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/lib/sanity/image.ts) | **Delete** — `urlFor()` no longer needed |
| [sanity/image.ts](file:///d:/NOPRIZAL/BELAJAR/PROGRAMMING/JAVASCRIPT/COURSE/LARAVEL/laragon/www/ranggadjoned/ranggadjoned-porto/sanity/image.ts) | **Delete** — old `urlFor` / `urlForImage` |

---

## Verification Plan

### Automated Tests
```bash
npm run build
```
TypeScript type-check + Next.js static generation must pass with zero errors.

### Manual Verification
- Open Sanity Studio at `/studio`
- Create/edit a project → confirm the Cloudinary asset picker appears for `coverImage`
- After selecting a Cloudinary image, confirm the URL is stored as a plain `cloudinaryImage` object
- Confirm the portfolio renders images correctly from Cloudinary URLs on the frontend
