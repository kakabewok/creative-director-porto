# Creative Director Portfolio — Next.js + Sanity

[![Framework: Next.js](https://img.shields.io/badge/Framework-Next.js-black?style=flat-square&logo=next.dotjs)](https://nextjs.org/)
[![CMS: Sanity.io](https://img.shields.io/badge/CMS-Sanity.io-f03e2f?style=flat-square&logo=sanity)](https://www.sanity.io/)
[![CDN: Cloudinary](https://img.shields.io/badge/Media-Cloudinary-3448c5?style=flat-square&logo=cloudinary)](https://cloudinary.com/)
[![Styling: Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Animation: Framer Motion](https://img.shields.io/badge/Animation-Framer_Motion-black?style=flat-square&logo=framer)](https://www.framer.com/motion/)

An immersive, cinematic, and editorial portfolio website tailored for an elite Creative Director. Built with modern, state-of-the-art web technologies, this platform prioritizes premium visual storytelling, fluid typography, dynamic motion experiences, and a robust content infrastructure.

---

## 👁️ Preview & Design Philosophy

This portfolio departs from conventional minimal layouts to embrace a high-end, visual-first editorial aesthetic reminiscent of luxury design journals and cinematic titles.

*   **Immersive Storytelling:** High-impact fullscreen heroes, oversized typography, and responsive media formats create a magazine-like browsing experience.
*   **Visual-First Portrayal:** Smooth, GPU-accelerated page transitions and micro-interactions elevate high-definition photography and video campaigns.
*   **Decoupled Content Architecture:** Built upon a headless CMS structure that scales seamlessly, enabling rich metadata tagging and modular content assembly.
*   **Sleek Adaptive Themes:** A meticulously tailored dark/light aesthetic designed to respect the color integrity of featured film, photography, and brand assets.

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js | Modern server-side rendering, routing, and static generation |
| **Language** | TypeScript | Strong typing, enhanced developer tooling, and robust code safety |
| **Styling** | Tailwind CSS | Utility-first responsive styling and rapid cinematic adaptation |
| **Animation** | Framer Motion | Smooth page transitions, fluid timeline tracking, and elegant hovers |
| **CMS** | Sanity.io | Headless content management, dynamic GROQ queries, and real-time edits |
| **Media CDN** | Cloudinary | Ultra-optimized image/video storage, transformations, and global CDN delivery |
| **Carousel** | Embla Carousel | Lightweight, fluid, and hardware-accelerated touch swipe slider |
| **Deployment** | Vercel | Global CDN distribution, serverless functions, and sub-second loading |

---

## ✨ Features

- 🌌 **Fullscreen Cinematic Hero:** High-impact initial screen with elegant ambient scaling and typography reveal animations.
- ⚓ **Floating Sticky Navigation:** Minimalist, backdrop-filtered utility nav that adapts responsively and stays out of the user's way.
- ⏳ **Advanced Timeline Experience:** A dynamic, scroll-linked interactive timeline tracing the creative journey step-by-step.
- 🎨 **Spectrum & Grid Portfolio Modes:** Seamless toggle between a dense layout (Spectrum) and a premium, multi-column editorial grid.
- 🔄 **Fluid Page Transitions:** Seamless page entry/exit animations powered by Framer Motion's AnimatePresence.
- 📝 **CMS-Powered Dynamic Content:** Easily manage projects, galleries, categories, and bios without altering source code.
- ☁️ **Cloudinary Media Delivery:** Automatic optimization utilizing modern formats (AVIF/WebP) and adaptive image generation.
- 📱 **Fully Responsive Layouts:** Hand-crafted, responsive layouts that maintain strict visual proportions on desktop, tablet, and mobile.
- 🌓 **Dynamic Dark / Light Mode:** Native tailwind integration adjusting interfaces based on theme preference, minimizing contrast strain.
- 🎡 **Touch-Swipe Carousel:** Smooth Embla-driven carousel supporting direct touch swipes, dragging, and keyboard navigation.
- 📺 **Rich Video Integrations:** Built-in dynamic support for YouTube, Vimeo, and direct Cloudinary stream embeds.
- 🔍 **Real-Time Category & Search Filtering:** Highly-responsive project lookup with persisted filter states.
- 💾 **Query Parameter Persistence:** Filter and view selections are synchronized automatically to the browser URL.
- 📦 **Fallback Mock Data:** Integrated mock-data layer ensuring graceful degradation and offline preview functionality.

---

## 📂 Project Structure

```bash
/app                  # Next.js App Router (pages, layouts, and route handlers)
  ├── studio/         # Embedded Sanity Studio route
  ├── work/           # Works list, timeline, and spectrum layouts
  │     ├── spectrum/ # Spectrum/grid view page
  │     ├── timeline/ # Timeline portfolio page
  │     └── [slug]/   # Dynamic, slug-based cinematic project detail pages
  ├── search/         # Real-time search and filtering interface
  └── information/    # Dynamic biography and contact hub
/components           # Reusable UI component ecosystem (cards, layouts, nav)
/hooks                # Custom React hooks (state persistence, media queries)
/lib                  # Shared utility functions, Sanity client setup, and constants
/sanity               # Sanity CMS config, studio schemas, and GROQ queries
/types                # Centralized TypeScript interface declarations
/public               # Static assets (logos, icons, offline fallbacks)
```

---

## 🧠 CMS & Media Architecture

The workspace utilizes a headless decoupling pattern between content generation, asset optimization, and presentation.

```text
       [ Sanity Studio ]  <─── (Schema Definition & Content Authoring)
               │
               ├─► [ Cloudinary Asset Manager ]  ───►  Stored Securely in Cloudinary
               │   (Official Integration Plugin)             │ (f_auto, q_auto optimizations)
               │                                             │
               └─► Dynamic JSON Payload ─────────────────────┼─────────┐
                   (Stores secure_url & aspect metadata)     │         │
                                                             ▼         ▼
                                                    [ Next.js Frontend Page ]
                                               (GROQ Fetch ──► Render Optimized Image)
```

### Headless CMS: Sanity.io
Sanity acts as a decoupled document store. By configuring structural schemas, authors manage complex relational layouts such as project dates, categorized tags, client assets, and rich description fields (using Portable Text). All data fetches are written in **GROQ (Graph Relation Object Queries)** for precise, performant payloads.

### Media CDN: Cloudinary
High-fidelity cinematic images and reels demand maximum compression without compromising luxury quality.
*   The application implements the **`sanity-plugin-cloudinary`** input widget directly within the studio.
*   Rather than uploading bulky media to Sanity directly, images are uploaded and managed on **Cloudinary**, returning highly organized asset metadata to Sanity.
*   Images fetched by Next.js automatically leverage Cloudinary's dynamic URL transformations:
    - **`f_auto`**: Automatically serve the most modern format supported by the client browser (AVIF, WebP, etc.).
    - **`q_auto`**: Apply intelligent compression algorithms that maintain near-lossless clarity while reducing payload sizes.
- **Official References:**
  - [Sanity.io Documentation](https://www.sanity.io/docs)
  - [Cloudinary Documentation](https://cloudinary.com/documentation)
  - [Next.js Sanity Client Guide](https://github.com/sanity-io/next-sanity)

---

## ⚡ Performance & Optimization Strategies

To maintain structural speed during content-heavy loads, the portfolio employs several professional optimization strategies:
1.  **Next.js Dynamic Routing & SSG/ISR:** Project detail pages are pre-rendered at build time or lazily rebuilt in the background using Incremental Static Regeneration (ISR).
2.  **Next.js Image Component (`<Image />`):** Prevents cumulative layout shifts (CLS) by reserving aspect-ratio boxes, and leverages Cloudinary URLs for responsive sizes.
3.  **Lazy Loading & Suspense boundaries:** Heavy visual carousels and complex motion widgets are dynamically imported, accelerating Initial Page Load times.
4.  **Embedded Video Optimization:** Third-party embeds (YouTube/Vimeo) utilize custom poster overlays, delaying iframe execution until user interaction.

---

## 🌓 Dark Mode & Responsive Design

-   **Cinematic Dark Theme:** Built with a default elegant dark layout (`bg-[#0a0a0a]` / `text-[#f5f5f5]`) emphasizing vivid media colors, switching cleanly to a high-editorial light canvas (`bg-[#fafafa]` / `text-[#171717]`) via Tailwind's `dark:` classes.
-   **Adaptive Navigation & Gestures:** 
    - The complex **Timeline View** collapses into a streamlined vertical history layout on mobile screens.
    - Media carousels utilize touch-swipe gestures specifically fine-tuned for smooth acceleration curves on iOS and Android viewports.

---

## 💿 Installation & Local Development

Follow these steps to spin up the local development environment.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/creative-director-portfolio.git
cd creative-director-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root of the project and populate it with your credentials:
```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-26

# Cloudinary CDN Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the client-side portfolio.
Open [http://localhost:3000/studio](http://localhost:3000/studio) to manage and publish dynamic content via the embedded Sanity Studio panel.

### 5. Build for Production
To ensure all lint configurations, TypeScript types, and SSG generation passes smoothly:
```bash
npm run build
```

---

## 🎨 Creative Philosophy

> *"Design is not merely what it looks like. Design is how we direct the viewer's gaze, evoke the exact emotion, and pace their journey through the narrative."*

This system aims to treat the browser window as an elite art gallery. Every interaction, fade, and grid alignment is engineered to let the creative projects shine. Visual items are framed as cinematic stills, while the navigation operates invisibly to guarantee zero interference with the direct visual experience.

---

## 👥 Author

Built and designed by [kakabewok](https://github.com/kakabeok) — 2026.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
