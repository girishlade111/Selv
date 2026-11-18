# Selv

Personal portfolio and engineering showcase for Girish Balaso Lade.

A modern, responsive, multi-page portfolio built around the Selv design system: dark translucent glass cards, fixed background atmosphere, fluid micro-interactions, and accessible typography.

## Table of Contents

- [Overview](#overview)
- [Design Language](#design-language)
- [Page Architecture](#page-architecture)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Author](#author)
- [License](#license)

## Overview

Selv represents a curated portfolio and engineering journal for Girish Lade (UI/UX developer, full-stack engineer, and founder of LadeStack). The project focuses on clean visual hierarchy, low-latency performance, and structured technical showcases without generic SaaS templates or promotional bloat.

Key principles:
- Performance first: Fast page loads, minimal runtime overhead, optimized assets.
- Visual authenticity: Dark translucent cards, single fixed background image, smooth ambient blur.
- Accessible interaction: Complete keyboard navigation, WCAG 2.2 contrast compliance, semantic markup.
- Motion with intent: Micro-interactions that convey state and depth without distracting from content.

## Design Language

- Base Theme: Dark mode with translucent container cards (`rgba(255, 255, 255, 0.03)` to `rgba(255, 255, 255, 0.08)`).
- Borders: Subtle hairline borders (`1px solid rgba(255, 255, 255, 0.1)`).
- Glass Treatment: Backdrop blur (`backdrop-blur-md` to `backdrop-blur-xl`) over a fixed atmospheric background layer.
- Accent Highlights: Selective muted warm yellow and off-white for focal elements.
- Typography: High-contrast display typography paired with clean, readable sans-serif body text.
- Spacing & Rhythm: Consistent 8px spacing scale across all viewports.

## Page Architecture

1. Home (`/`)
   - Hero banner with introduction and current focus.
   - Featured project highlights with interactive preview cards.
   - Selected engineering writing snippets.
   - Floating navigation bar with active route detection.

2. Projects (`/projects`)
   - Filterable catalog of software tools, web applications, and UI/UX systems.
   - Project detail views with problem statement, architecture breakdown, and live demos.

3. About (`/about`)
   - Background narrative: mechanical engineering foundation transitioning to software engineering and product design.
   - Technical capabilities, tooling preferences, and system philosophy.
   - Verified educational background and engineering timeline.

4. Blog (`/blog`)
   - Engineering essays, design system breakdowns, and practical tutorials.
   - Clean reading mode with responsive typography and code syntax styling.

5. Contact (`/contact`)
   - Direct communication form with client-side validation and feedback states.
   - Interactive FAQ accordion covering common collaboration questions.
   - Direct links to GitHub, LinkedIn, and email channels.

## Tech Stack

- Framework: React / Next.js / Astro (Modern SSR/SSG architecture)
- Styling: Tailwind CSS
- Animation: Motion (Framer Motion)
- Icons: Lucide React (vector SVG, currentColor)
- Language: TypeScript (strict mode)
- Package Manager: npm / bun / pnpm

## Repository Structure

```text
Selv/
├── .gitignore          # Ignored dependencies, build artifacts, environment files
├── README.md           # Comprehensive project documentation
├── package.json        # Dependencies and build scripts
├── tsconfig.json       # Strict TypeScript configuration
├── public/             # Static assets, icons, background images
└── src/
    ├── components/     # Reusable UI primitives (Card, Button, Nav, Footer)
    ├── layouts/        # Base layout with persistent fixed background
    ├── pages/          # Application routes (Home, About, Projects, Blog, Contact)
    ├── styles/         # Global styles and design tokens
    └── types/          # Shared TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm (v9+), pnpm (v8+), or bun (v1+)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/girishlade111/Selv.git
cd Selv
npm install
```

### Development Server

Run the local development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

- `npm run dev`: Starts the local development server.
- `npm run build`: Generates the optimized production build.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs static code analysis and type checking.

## Deployment

The application is configured for zero-configuration deployment on Vercel, Netlify, or Cloudflare Pages.

### Vercel CLI

```bash
npx vercel
```

### Static Hosting

Run `npm run build` to generate the production bundle inside the `dist` or `.next` directory and deploy to any static file server.

## Roadmap

- [ ] Implement core responsive layouts for all 5 pages.
- [ ] Add Motion transitions between route changes.
- [ ] Integrate contact form email delivery endpoint.
- [ ] Implement search and category filtering on projects page.
- [ ] Add RSS feed and dynamic OpenGraph image generation.

## Author

Girish Balaso Lade
- Website: [ladestack.in](https://ladestack.in)
- GitHub: [@girishlade111](https://github.com/girishlade111)
- Email: admin@ladestack.in

## License

MIT License. See LICENSE for details.
