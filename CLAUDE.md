# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — type-check (`tsc`) then `vite build`; output goes to `dist/`
- `npm run preview` — serve the built `dist/` locally

There is no test runner and no separate lint step; type errors from `tsc` (run as part of `build`) are the only static check. `tsconfig.json` has `strict`, `noUnusedLocals`, and `noUnusedParameters` enabled, so unused imports/vars will fail the build.

## Architecture

Single-page React 18 app built with Vite, TypeScript, and Tailwind. Deployed as static content to GitHub Pages.

### Routing and the GH Pages base path

`vite.config.ts` sets `base: '/michael-portfolio/'` because the site is served from `https://<user>.github.io/michael-portfolio/`. This has two consequences worth knowing before changing routes:

1. `src/App.tsx` registers **both** `/` and `/michael-portfolio` for the `Home` component so direct loads against the GH Pages URL resolve. If you add new top-level routes, consider whether they need the same treatment.
2. Internal navigation uses `react-router-dom`'s `<Link>`/`<NavLink>` (not `<a href>`) so the SPA router handles transitions without a full reload.

Routing is `BrowserRouter`-based (see `src/main.tsx`), and `App.tsx` includes a `<ScrollToTop />` effect that resets scroll on every `pathname` change.

### Project data is the single source of truth

`src/data/projects.ts` exports the full `Project[]` list plus two helpers:

- `getProjectsByCategory(cat)` — filter by `'cs' | 'me'`
- `getProjectBySlug(cat, slug)` — lookup for the detail page

The navbar dropdowns (`src/components/Navbar.tsx`) and the `/projects/:category` and `/projects/:category/:slug` pages all read from this same data. **Adding a new project = adding an entry to `projects.ts`.** No other wiring is required for it to appear in the nav and have a detail page.

The `Category` union (`'cs' | 'me'`) is used in route params, navbar config, and the data filter — keep them in sync if you add a new category.

### Styling

Tailwind with a small custom theme in `tailwind.config.js`:
- `navy.{700,800,900}` — page/nav background palette
- `accent.{DEFAULT,dark,light}` — blue link/CTA palette
- `font-sans` is Inter (loaded from Google Fonts in `index.html`)

### Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `dist/` to GitHub Pages. There is no separate staging environment — `main` is production. The `base` in `vite.config.ts` must match the repo name for asset URLs to resolve correctly.
