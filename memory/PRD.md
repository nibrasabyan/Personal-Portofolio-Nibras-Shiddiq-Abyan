# Personal Portfolio — Nibras Shiddiq Abyan

## Original Problem Statement
Long-term, modular, content-separated personal portfolio for a Web Developer student at Universitas Brawijaya. Used for jobs, organizations, freelance, scholarships, branding. Architecture: easy single-file content updates (`src/data/content.js`), modular sections (auto-hide when empty), timeless design, scalable.

## Stack
- React 18 + Vite 5
- Tailwind CSS v3 (custom dark + teal theme)
- Framer Motion (all section / hero animations)
- Lucide React icons
- Google Fonts: Syne (display) + DM Sans (body) + JetBrains Mono (eyebrows)
- Deployed via Emergent preview; supervisor runs `yarn start` (Vite) on port 3000

## User Personas
- Recruiters / hiring managers
- Organization & competition admins
- Freelance clients
- Scholarship reviewers

## Core Requirements (locked)
- Single source of truth: `src/data/content.js`
- Geometric SVG signature mark in navbar (no text logo)
- Sections in order: Hero → About → Skills → (Experience) → Certificates → Projects → Contact → Footer
- Experience section auto-hidden when `experiences[]` is empty
- Certificate PDF lives in `public/certificate-idea-ai.pdf`
- Live GitHub repos fetched from `api.github.com/users/nibrasabyan/repos`
- Custom cursor desktop only, respects prefers-reduced-motion
- Mobile-first responsive, hamburger menu, smooth scroll, scroll progress bar, brief loading screen

## Implemented (2026-01-07)
- Vite project scaffold + Tailwind dark/teal theme
- `data/content.js` (profile, skills, certificates, experiences, navSections, cv:null)
- Components: Navbar (geometric N mark, active section highlight, hamburger slide-in)
- Hero (line-mask name reveal via Framer Motion, eyebrow, photo with cinematic frame, CTAs, scroll indicator)
- About (split layout, sticky photo, detail grid)
- Skills (4 categories, stagger reveal)
- Experience (vertical timeline, returns null when empty)
- Certificates (card with PDF credential link)
- Projects (live GitHub fetch with skeletons, error & empty states, language colors, star/fork stats)
- Contact (large CTA, 4 social cards)
- Footer (signature mark, dynamic year, social icons)
- UI: CustomCursor (dot + ring follower), LoadingScreen (1.4s), ScrollProgressBar
- Hooks: useScrollSection (intersection observer), useGitHubRepos
- Custom favicon SVG, OG meta tags, Google Fonts preconnect
- All interactive elements carry unique `data-testid`

## Test Status
- Iteration 1: 100% frontend pass (19/19 checkpoints) on desktop + mobile
- No critical issues; only minor stylistic suggestions (already addressed)

## Backlog / Future
- P1: Add real CV.pdf to `public/` and set `profile.cv = "/cv.pdf"` to surface Download CV button
- P1: Push first project repo descriptions to GitHub so Projects cards render rich text
- P2: Add organisation/work entries to `experiences[]` to expose timeline
- P2: Optional: Switch GitHub fetch to a tiny serverless proxy if 60 req/hr unauth limit becomes painful
- P2: Add light theme toggle (timeless aesthetic in either mode)

## Next Tasks
- Wait for Nibras to add CV file and richer GitHub descriptions, then iterate
