# Project Standards — Anuranjan Infratech

Handbook for maintaining design consistency, animation coherence, and data management across the codebase. All developers must follow these standards when adding features or modifying existing ones.

## Tech Stack

- Framework: Next.js 16+ (App Router)
- Library: React 19
- Language: TypeScript
- Styling: Tailwind CSS 4, Lucide React, Material Symbols Outlined, `class-variance-authority`, `tailwind-merge`
- UI Components: Radix UI / Shadcn UI
- Animation: Framer Motion (preferred) or CSS transitions
- Build Tool: Next.js Compiler (SWC)

## Design System

Design language is premium, minimal, and purposeful. Every UI decision should feel intentional, spacious, and confident.

### Colors (Tailwind v4 `@theme`, defined in `app/globals.css`)

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#d33131` | CTAs, accents, highlights |
| `--color-secondary` | `#1e293b` | Dark text, dark backgrounds |
| `--color-accent-blue` | `#1976D2` | Links, info states |
| `--color-bg-light` | `#f8f6f6` | Page background |
| `--color-surface` | `oklch(...)` | Shadcn/Radix surfaces |
| `--color-border` | `oklch(...)` | Dividers and outlines |

Use `oklch`-based values for all Shadcn/Radix components. Never hard-code hex values inline — always reference tokens.

### Typography

Primary font: `Manrope` via `next/font/google`.

| Role | Classes |
|---|---|
| Section headings | `font-extrabold tracking-tight leading-tight` |
| Subheadings | `font-bold tracking-tight` |
| Body | `font-light` or `font-medium` |
| Eyebrow labels | `uppercase tracking-[0.3em] text-xs font-semibold` |
| Captions | `text-sm text-secondary/60` |

Eyebrow labels always use `--color-primary`. Never mix more than two font weights in a single card or section.

### Spacing & Layout

- Container: `max-w-7xl` with `px-6 sm:px-8 lg:px-12`
- Section padding: `py-24 md:py-32`
- Card padding: `p-6 md:p-8`
- Grid gap: `gap-6 md:gap-8`
- Border radius: `rounded-[0.625rem]` (`--radius`)

### Shadows

- Card default: `shadow-sm`
- Card hover: `shadow-md`
- Modals / floating panels: `shadow-xl`

Avoid `shadow-2xl` or `drop-shadow` on general UI elements.

### Icons

- Material Symbols Outlined for most UI icons
- Lucide React for utility icons (arrows, close, toggles)
- Sizes: `text-[1.25rem]` inline, `text-[2rem]` for feature icons

```tsx
<span className="material-symbols-outlined text-[1.25rem]">home_work</span>
<ChevronRight className="w-4 h-4" />
```

## Animation Standards

Animations must be subtle, purposeful, and performant.

### Principles

- Never animate for decoration alone — guide attention or provide feedback.
- Durations: 150–400ms for transitions, 600–800ms for page entrances.
- Easing: `ease-out` for entrances, `ease-in-out` for loops.
- Always respect `prefers-reduced-motion`.

### Standard Variants (`lib/animations.ts`)

Do not define animation objects inline in components. Import from here.

```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
```

### Usage Pattern

Wrap grids in `staggerContainer`, wrap cards in `fadeUp` or `scaleUp`. Always use `viewport={{ once: true }}`.

```tsx
"use client";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
  className="grid grid-cols-1 md:grid-cols-3 gap-8"
>
  {items.map((item) => (
    <motion.div key={item.id} variants={fadeUp}>
      <ServiceCard {...item} />
    </motion.div>
  ))}
</motion.div>
```

### Hover States (use Tailwind, not Framer Motion)

```tsx
className="transition-shadow duration-300 hover:shadow-md"
className="transition-colors duration-200 hover:bg-primary/90"
// Image zoom — parent: "overflow-hidden group", image:
className="transition-transform duration-500 group-hover:scale-105"
```

### Hero Entrance

Stagger headline → subtext → CTA with increasing delays:

```tsx
<motion.h1 variants={fadeUp} initial="hidden" animate="visible" />
<motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} />
<motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} />
```

### Reduced Motion

```tsx
import { useReducedMotion } from "framer-motion";
const shouldReduce = useReducedMotion();
const variants = shouldReduce ? {} : fadeUp;
```

Or in `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Data Management

All static content lives in `lib/data/data.ts`. Components must never contain hardcoded content strings.

### File Structure

```
lib/
  data/
    data.ts       -- primary data store
    types.ts      -- TypeScript interfaces
  animations.ts   -- Framer Motion variants
  utils.ts        -- helpers (cn, formatDate, etc.)
```

### `types.ts`

```ts
export interface NavItem { label: string; href: string; }
export interface Service { id: string; icon: string; title: string; description: string; href?: string; }
export interface Project { id: string; title: string; category: string; location: string; imageUrl: string; href?: string; }
export interface Stat { value: string; label: string; }
export interface TeamMember { id: string; name: string; role: string; imageUrl: string; bio?: string; }
export interface Testimonial { id: string; quote: string; author: string; company: string; avatarUrl?: string; }
export interface FooterLink { label: string; href: string; }
export interface FooterSection { heading: string; links: FooterLink[]; }
```

### `data.ts`

```ts
import type { NavItem, Service, Project, Stat, Testimonial, FooterSection } from "./types";

export const siteConfig = {
  name: "Anuranjan Infratech",
  tagline: "Building Tomorrow, Today.",
  description: "A premier infrastructure and construction company delivering excellence across India.",
  email: "info@anuranjaninfratech.com",
  phone: "+91 98765 43210",
  address: "New Delhi, India",
  socials: {
    linkedin: "https://linkedin.com/company/anuranjan-infratech",
    instagram: "https://instagram.com/anuranjaninfratech",
  },
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const services: Service[] = [
  { id: "civil-construction", icon: "foundation", title: "Civil Construction", description: "End-to-end civil construction for residential, commercial, and industrial projects.", href: "/services/civil-construction" },
];

export const stats: Stat[] = [
  { value: "120+", label: "Projects Completed" },
  { value: "15+", label: "Years of Experience" },
  { value: "50+", label: "Expert Engineers" },
  { value: "98%", label: "Client Satisfaction" },
];

export const featuredProjects: Project[] = [
  { id: "project-1", title: "Delhi Metro Phase IV", category: "Infrastructure", location: "New Delhi", imageUrl: "/images/projects/metro-phase-4.jpg", href: "/projects/delhi-metro-phase-4" },
];

export const testimonials: Testimonial[] = [
  { id: "t1", quote: "Anuranjan Infratech delivered our project on time with exceptional quality standards.", author: "Rajesh Kumar", company: "Kumar Developers" },
];

export const footerSections: FooterSection[] = [
  { heading: "Company", links: [{ label: "About Us", href: "/about" }, { label: "Our Team", href: "/about#team" }, { label: "Careers", href: "/careers" }] },
  { heading: "Services", links: [{ label: "Civil Construction", href: "/services/civil-construction" }, { label: "Project Management", href: "/services/project-management" }] },
];
```

### Data Rules

- No hardcoded content in components — import from `lib/data/data.ts`.
- Keep one data file unless it exceeds 400 lines or a route is fully self-contained.
- Store image paths as strings; place files in `public/images/[category]/`.
- `data.ts` must remain a pure data module — no JSX or component imports.

## Component Architecture

### Directory Structure

```
app/
  components/       -- global shared components (Navbar, Footer, Hero)
  [route]/
    page.tsx
    components/     -- route-specific components
lib/
  data/
  animations.ts
  utils.ts
public/
  images/
    projects/
    team/
    og/
```

### Patterns

- Functional components only.
- `"use client"` only when using hooks, event handlers, or browser APIs. Prefer Server Components for data display.
- TypeScript interfaces for all props — at top of file or in `types.ts`.
- Keep components under ~150 lines. Extract sub-components freely.

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Directories | lowercase | `app/about` |
| Components | PascalCase | `ServiceCard.tsx` |
| Hooks | camelCase + use prefix | `useScroll.ts` |
| Utils / Data | lowercase | `utils.ts`, `data.ts` |
| Animation variants | camelCase | `fadeUp`, `staggerContainer` |
| Variables | camelCase | `siteConfig` |
| Global constants | UPPER_SNAKE_CASE | `MAX_WIDTH` |
| TS interfaces | PascalCase, no I prefix | `Service` not `IService` |
| Custom CSS classes | kebab-case | `.sticky-nav` |
| CSS variables | prefixed kebab-case | `--color-primary` |

## Routing & State

- App Router only. Internal links via `<Link>`, programmatic via `useRouter()`.
- Static content → `lib/data/data.ts`
- Local UI state → `useState`, `useReducer`
- Shared client state → Zustand (if needed)
- Server state → React Server Components or `fetch` with caching

Every `page.tsx` must export a unique `metadata` object:

```ts
export const metadata: Metadata = {
  title: "Services | Anuranjan Infratech",
  description: "Explore our full range of civil and infrastructure services.",
  openGraph: { images: ["/images/og/services.jpg"] },
};
```
*Last Updated: February 2026*