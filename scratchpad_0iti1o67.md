# Scratchpad - Cinematic Portfolio Website Analysis

## Plan
1. Visit `https://esdevlin.com` and capture screenshot.
2. Visit `https://esdevlin.com/work` and capture screenshot.
3. Visit `https://esdevlin.com/information` and capture screenshot.
4. Document detailed observations about:
   - Layout structure (navbar, hero, sections)
   - Typography (fonts, sizes, weights)
   - Color palette (background, text, accent)
   - Animation patterns
   - Navigation structure
   - Overall aesthetic

# Scratchpad - Cinematic Portfolio Website Analysis

## Plan
1. Visit `https://esdevlin.com` and capture screenshot. (Completed)
2. Visit `https://esdevlin.com/work` and capture screenshot. (Completed)
3. Visit `https://esdevlin.com/information` and capture screenshot. (Completed)
4. Document detailed observations about:
   - Layout structure (navbar, hero, sections)
   - Typography (fonts, sizes, weights)
   - Color palette (background, text, accent)
   - Animation patterns
   - Navigation structure
   - Overall aesthetic

## Observations

### 1. Layout Structure
- **Global Navbar**:
  - Located at the top of every page.
  - Contains four items: `ES DEVLIN` (logo/home), `WORK`, `INFORMATION`, and `SEARCH`.
  - Balanced across the screen in a clean `flex justify-between items-center` container. Due to `justify-between` spacing, the four items align beautifully to the left, 1/3-width mark, 2/3-width mark, and right edge on large screens, creating a natural four-column feel.
  - Initially overlays the hero content or video with reduced opacity (e.g. text-black/30). It transitions to solid background or active page highlights elegantly.
- **Hero / Landing Page**:
  - Fullscreen looping video with a dramatic, minimalist spotlight visual.
  - Centered bold title `ES DEVLIN` overlaying the video.
  - On hover or interaction, navbar/content fades in, and clicking centered text transitions to the work page/mode.
- **Work Page (/work)**:
  - **List Mode** (Default): Centered list layout featuring large, high-resolution cover images with project titles centered directly underneath in bold uppercase text.
  - **Spectrum Mode**: Multi-column grid of projects. Hovering over a card shows its details.
  - **Timeline Mode**: Vertical/horizontal year points.
  - **Layout Switcher**: A minimalist, floating pill navigation at the bottom center of the page (`LIST`, `SPECTRUM`, `TIMELINE`).
- **Project Detail Page**:
  - Horizontal full-screen carousel of project media (images and video embeds).
  - Bottom-Left: Project Title in uppercase sans-serif.
  - Bottom-Right: Carousel index indicator (e.g., `1 / 10`) and a `DETAILS` button.
  - Top-Right: A `CLOSE` button (or simple navigation) to return to `/work`.
  - Clicking the `DETAILS` button triggers a slide-out drawer from the right side of the viewport, pushing the media carousel to the left side (taking up 50% or 66% width instead of fullscreen).
  - The side drawer contains the Title, Year, Description (formatted rich text), and detailed credits (e.g., sound composition, producers, associate designers).
- **Information Page (/information)**:
  - Split screen layout: Profile photo of Es Devlin on the left, rich about text / biography on the right.
  - A sticky sub-navigation bar at the bottom center with `BIOGRAPHY`, `CONTACT`, `STUDIO`, `DOWNLOADS` tabs.
- **Search Page (/search)**:
  - Centered large, clean search input with placeholder `Search for a title or term`.
  - Below search input: A tiny label `OR EXPLORE BY` followed by a wrapping grid of categories with post counts, e.g. `STAGE (10)`, `MUSIC (40)`, etc.
  - Active search results appear instantly underneath as a multi-column card grid, featuring thumbnail images and titles below them (just like the spectrum grid or list cards).

### 2. Typography
- **Fonts**:
  - Primary font-family: `neue-haas-grotesk-text`, falling back to `"Helvetica Neue", Helvetica, Arial, sans-serif`.
  - Extremely clean, geometric neo-grotesque sans-serif typography.
- **Weights & Sizes**:
  - Sizes are compact but highly legible (typically `16px` / `1rem` on desktop for navigation, headers, details, and search results).
  - Main headers use `text-heading` class (bold or medium, e.g. `font-weight: 500`).
  - Text transforms: Almost all labels, navigation links, layout modes, buttons, and category items are `uppercase`.

### 3. Color Palette
- **Primary Canvas**: Pure White (`#ffffff` or `rgb(255, 255, 255)`) background for a museum-like gallery atmosphere.
- **Accent Elements & Side Drawer**: Off-white grey background `#e6e4de` (`rgb(230, 228, 222)`) for details drawer and search elements.
- **Text & Details**: Solid Black (`#000000`) for active items and typography.
- **Muted Elements**: `text-black/30` or `text-black/50` for inactive navigation items, category counts, and labels to keep focus on key content.

### 4. Animation Patterns
- Framer Motion transitions feel fluid and cinematic:
  - Navbar: Smooth hover transition with color shifts (`text-black/30` to `text-black` on hover/active).
  - Details Drawer: Smooth slide from right, while simultaneously resizing/sliding the media carousel layout.
  - Project Cards: Smooth fade-ins and subtle transforms when loading or filtering.

### 5. Navigation Structure
- Global top bar: `ES DEVLIN` | `WORK` | `INFORMATION` | `SEARCH`.
- Work page sub-nav: Floating bottom pill `LIST` | `SPECTRUM` | `TIMELINE`.
- Information page sub-nav: Floating bottom pill `BIOGRAPHY` | `CONTACT` | `STUDIO` | `DOWNLOADS`.
- Search page: Immediate interactive category list clicking.

### 6. Overall Aesthetic
- Minimalist, premium, modern art-gallery/editorial vibe.
- Media-first storytelling: Large, gorgeous photography is the absolute hero.
- Absence of heavy shadows, cards with borders, or complex colored badges. Everything relies on structure, whitespace, elegant typography, and subtle grey backgrounds for secondary panels.

