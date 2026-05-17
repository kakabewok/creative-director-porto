# Cinematic Portfolio — Build Complete

> Running at **http://localhost:3000**

---

## Pages Built

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` + `modules/HeroClient.tsx` | Fullscreen autoplay video hero |
| `/work` | `app/work/page.tsx` + `modules/WorkClient.tsx` | Project listing with 3 view modes |
| `/work/[slug]` | `app/work/[slug]/page.tsx` + `modules/ProjectDetailClient.tsx` | Full project detail |
| `/information` | `app/information/page.tsx` + `modules/InformationNav.tsx` | Bio, contact, downloads |
| `/search` | `app/search/page.tsx` + `modules/SearchClient.tsx` | Instant search + category filter |
| `*` | `app/not-found.tsx` | Cinematic 404 |

---

## Components

| Component | Purpose |
|---|---|
| `Navbar` | Fixed, transparent over hero → solid on scroll |
| `PageTransition` | Framer Motion fade/slide between routes |
| `ProjectCard` | Reusable card for list & spectrum modes |
| `LayoutSwitcher` | Floating pill: List / Spectrum / Timeline |
| `TimelineView` | Year accordion with project thumbnails |
| `MediaCarousel` | Swipeable image/video carousel with dots |
| `DetailsDrawer` | Right-side slide-in project details panel |
| `PortableTextRenderer` | Zero-dep Sanity Portable Text renderer |

---

## Data Layer

```
lib/fetchData.ts        ← Sanity fetch + auto fallback to mock
lib/projectImage.ts     ← Sanity URL → Unsplash placeholder → ''
lib/mediaUtils.ts       ← YouTube/Vimeo embed URL converter
sanity/client.ts        ← Sanity client singleton
sanity/queries.ts       ← All GROQ queries
sanity/image.ts         ← createImageUrlBuilder with valid-ref guard
sanity/schemas/user.ts  ← CMS user profile schema
sanity/schemas/project.ts ← CMS project schema (gallery, Portable Text)
data/mock/user.ts       ← Full mock user (exact schema match)
data/mock/projects.ts   ← 10 mock projects + PLACEHOLDER_IMAGES map
```

---

## Connecting Sanity CMS

1. Create a Sanity project at https://sanity.io
2. Copy your Project ID
3. Update `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. Install Sanity Studio separately and register the schemas from `sanity/schemas/`
5. CORS: add `http://localhost:3000` in Sanity project settings → API → CORS origins

> **Without Sanity configured**, the site runs fully on mock data automatically.

---

## Replacing the Hero Video

In `modules/HeroClient.tsx`, replace the `<source>` tags with your Cloudinary URLs:

```tsx
<source src="https://res.cloudinary.com/YOUR_CLOUD/video/upload/YOUR_VIDEO.webm" type="video/webm" />
<source src="https://res.cloudinary.com/YOUR_CLOUD/video/upload/YOUR_VIDEO.mp4" type="video/mp4" />
```

**Requirements:** 720p recommended, max 1080p, 5–10 MB, muted autoplay loop playsinline.

---

## Layout Switcher Modes

| Mode | Behavior |
|---|---|
| **List** | Single centered column, 16:9 cover, title + year below |
| **Spectrum** | 2→6 column grid, 3:4 covers, title on hover |
| **Timeline** | Year accordion — click year → thumbnail grid expands |

---

## Known Placeholder Behavior

Mock data uses placeholder Sanity asset refs (`image-ref-1`, etc.) that intentionally fail the valid-ref check. `getProjectCoverSrc()` falls back to Unsplash URLs automatically. When real Sanity assets are uploaded, the Unsplash fallbacks are bypassed.

---

## Project Structure

```
app/
  layout.tsx            ← Root layout (Inter font, Navbar, PageTransition)
  globals.css           ← Global styles, custom scrollbar, focus states
  page.tsx              ← Home
  work/page.tsx         ← Work listing
  work/[slug]/page.tsx  ← Project detail
  information/page.tsx  ← Information
  search/page.tsx       ← Search
  not-found.tsx         ← 404
components/             ← Pure UI components
modules/                ← Page-level client components
hooks/                  ← (reserved for future custom hooks)
lib/                    ← Utilities & data fetching
sanity/                 ← Client, queries, image builder, schemas
types/                  ← TypeScript types (match Sanity schema exactly)
data/mock/              ← Fallback data
```
